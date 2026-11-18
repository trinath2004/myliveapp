import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { read, write } from "../../services/storage";
import { mapsSearchUrl } from "../../utils/maps";
import ShareBar from "../components/ShareBar";
import { useLang } from "../i18n/useLang";
import { ALL_DISTRICTS, guidePath } from "../lib/districts";
import { MAX_DAYS, MAX_DISTRICTS, PACES, buildItinerary, dayRouteUrl, moveStop, moveStopToDay, planToText, removeStop } from "../lib/itinerary";
import { usePageTitle } from "../lib/usePageTitle";

const SAVED_KEY = "trip-plan";
const FOCUS = [
  ["mix", "focusMix"],
  ["culture", "focusCulture"],
  ["nature", "focusNature"],
  ["food", "focusFood"],
  ["crafts", "focusCrafts"],
];

const validDistricts = (list) => list.filter((d) => ALL_DISTRICTS.some((x) => x.district === d)).slice(0, MAX_DISTRICTS);

function formFromParams(params) {
  const districts = validDistricts((params.get("districts") || "").split(",").map((s) => s.trim()).filter(Boolean));
  if (!districts.length) return null;
  const days = Math.max(1, Math.min(MAX_DAYS, Number(params.get("days")) || Math.max(2, districts.length)));
  const pace = PACES[params.get("pace")] ? params.get("pace") : "standard";
  const focus = FOCUS.some(([id]) => id === params.get("focus")) ? params.get("focus") : "mix";
  return { districts, days, pace, focus };
}

function DistrictPicker({ selected, onToggle }) {
  const { t, dn, sn } = useLang();
  const [q, setQ] = useState("");
  const needle = q.trim().toLowerCase();
  const shown = ALL_DISTRICTS.filter((d) => !needle || `${d.district} ${d.te} ${d.state}`.toLowerCase().includes(needle));
  const full = selected.length >= MAX_DISTRICTS;

  return (
    <div className="fx-picker">
      <input className="fx-input" type="search" placeholder={t("filterDistricts")} value={q} onChange={(e) => setQ(e.target.value)} aria-label={t("filterDistricts")} />
      {selected.length > 0 && (
        <div className="chips" aria-label="Selected districts">
          {selected.map((name) => {
            const d = ALL_DISTRICTS.find((x) => x.district === name);
            return <button key={name} type="button" className="chip active" onClick={() => onToggle(name)} aria-label={`Remove ${name}`}>{dn(d.state, name)} ×</button>;
          })}
        </div>
      )}
      <p className="muted small">{selected.length}/{MAX_DISTRICTS}</p>
      <div className="fx-picker-list">
        {["Andhra Pradesh", "Telangana"].map((state) => {
          const list = shown.filter((d) => d.state === state);
          if (!list.length) return null;
          return (
            <fieldset key={state}>
              <legend>{sn(state)}</legend>
              <div className="chips">
                {list.map((d) => {
                  const on = selected.includes(d.district);
                  return (
                    <button key={d.slug} type="button" className={on ? "chip active" : "chip"} aria-pressed={on} disabled={!on && full} onClick={() => onToggle(d.district)}>
                      {dn(d.state, d.district)}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          );
        })}
      </div>
    </div>
  );
}

export default function TripPlannerPage() {
  const { t, dn } = useLang();
  usePageTitle(t("tripTitle"));
  const [params, setParams] = useSearchParams();

  const [form, setForm] = useState(() => formFromParams(params) ?? read(SAVED_KEY, null)?.form ?? { districts: [], days: 3, pace: "standard", focus: "mix" });
  const [plan, setPlan] = useState(() => {
    const fromUrl = formFromParams(params);
    if (fromUrl) return buildItinerary(fromUrl);
    return read(SAVED_KEY, null)?.plan ?? [];
  });

  const commit = (nextForm, nextPlan) => {
    setForm(nextForm);
    setPlan(nextPlan);
    write(SAVED_KEY, { form: nextForm, plan: nextPlan });
  };
  const edit = (nextPlan) => {
    setPlan(nextPlan);
    write(SAVED_KEY, { form, plan: nextPlan });
  };

  const toggle = (name) => setForm((f) => ({ ...f, districts: f.districts.includes(name) ? f.districts.filter((d) => d !== name) : validDistricts([...f.districts, name]) }));

  const build = () => {
    if (!form.districts.length) return;
    const next = { ...form, days: Math.max(1, Math.min(MAX_DAYS, Number(form.days) || 1)) };
    commit(next, buildItinerary(next));
    setParams({ districts: next.districts.join(","), days: String(next.days), pace: next.pace, focus: next.focus }, { replace: true });
  };

  const shareUrl = useMemo(() => {
    const base = window.location.href.split("#")[0];
    const q = new URLSearchParams({ districts: form.districts.join(","), days: String(form.days), pace: form.pace, focus: form.focus });
    return `${base}#/trip?${q}`;
  }, [form]);
  const text = useMemo(() => planToText(plan), [plan]);

  return (
    <div className="page fx-page">
      <p className="kicker">{t("groupPlan")}</p>
      <h1>🗓️ {t("tripTitle")}</h1>
      <p className="lead fx-noprint">{t("tripLead")}</p>

      <section className="fx-card fx-noprint" aria-label="Trip settings">
        <h2 className="fx-h2">{t("pickDistricts")}</h2>
        <DistrictPicker selected={form.districts} onToggle={toggle} />
        <div className="fx-form-row">
          <label className="fx-field">
            <span>{t("days")}</span>
            <select value={form.days} onChange={(e) => setForm({ ...form, days: Number(e.target.value) })}>
              {Array.from({ length: MAX_DAYS }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </label>
          <label className="fx-field">
            <span>{t("pace")}</span>
            <select value={form.pace} onChange={(e) => setForm({ ...form, pace: e.target.value })}>
              <option value="standard">{t("paceStandard")}</option>
              <option value="full">{t("paceFull")}</option>
            </select>
          </label>
          <label className="fx-field">
            <span>{t("focus")}</span>
            <select value={form.focus} onChange={(e) => setForm({ ...form, focus: e.target.value })}>
              {FOCUS.map(([id, key]) => <option key={id} value={id}>{t(key)}</option>)}
            </select>
          </label>
        </div>
        <button type="button" className="btn" onClick={build} disabled={!form.districts.length}>{t("buildTrip")}</button>
      </section>

      {plan.length === 0 ? (
        <div className="empty-state"><span aria-hidden="true">🧳</span><p className="muted">{t("tripEmpty")}</p></div>
      ) : (
        <section aria-label="Your itinerary">
          <div className="fx-toolbar fx-noprint">
            <p className="trail-summary">{plan.length} {t("days").toLowerCase()} · {new Set(plan.flatMap((d) => d.districts.map((x) => x.district))).size} {t("districts").toLowerCase()}</p>
            <div className="trail-actions">
              <button type="button" className="btn btn-sm" onClick={() => window.print()}>🖨️ {t("print")}</button>
              <ShareBar text={text} url={shareUrl} />
            </div>
          </div>
          <p className="muted small fx-noprint">{t("approx")}</p>

          <ol className="fx-days">
            {plan.map((day, di) => {
              const route = dayRouteUrl(day);
              return (
                <li key={day.n} className="fx-day fx-card">
                  <div className="fx-day-head">
                    <h2 className="fx-h2">{t("day")} {day.n}</h2>
                    <p className="muted">
                      {day.districts.map((d, i) => (
                        <span key={d.district}>{i > 0 && " + "}<Link to={guidePath(d.district)}>{dn(d.state, d.district)}</Link></span>
                      ))}
                    </p>
                    {route && day.stops.length > 0 && <a className="btn-ghost btn-sm fx-noprint" href={route} target="_blank" rel="noopener noreferrer">🚗 {t("routeDay")}</a>}
                  </div>
                  {day.stops.length === 0 && <p className="muted">No stops left on this day.</p>}
                  <ol className="fx-stops">
                    {day.stops.map((s, si) => (
                      <li key={s.id} className="fx-stop">
                        <span className="fx-stop-emoji" aria-hidden="true">{s.emoji}</span>
                        <div className="fx-stop-body">
                          <p className="fx-stop-slot">{t(s.slot)} · {dn(s.state, s.district)}</p>
                          <strong>{s.title}</strong>
                          <p className="muted small">{s.sub}</p>
                          <a className="small fx-noprint" href={mapsSearchUrl(s.query)} target="_blank" rel="noopener noreferrer">📍 {t("openInMaps")}</a>
                        </div>
                        <div className="fx-stop-tools fx-noprint">
                          <button type="button" className="icon-btn" onClick={() => edit(moveStop(plan, di, si, -1))} disabled={si === 0} aria-label={`${t("moveUp")}: ${s.title}`}>↑</button>
                          <button type="button" className="icon-btn" onClick={() => edit(moveStop(plan, di, si, 1))} disabled={si === day.stops.length - 1} aria-label={`${t("moveDown")}: ${s.title}`}>↓</button>
                          {plan.length > 1 && (
                            <select aria-label={`${t("day")}: ${s.title}`} value={di} onChange={(e) => edit(moveStopToDay(plan, di, si, Number(e.target.value)))}>
                              {plan.map((d, k) => <option key={d.n} value={k}>{t("day")} {d.n}</option>)}
                            </select>
                          )}
                          <button type="button" className="icon-btn" onClick={() => edit(removeStop(plan, di, si))} aria-label={`${t("remove")}: ${s.title}`}>×</button>
                        </div>
                      </li>
                    ))}
                  </ol>
                </li>
              );
            })}
          </ol>
          <p className="muted small">Built from this app's data. Please confirm opening times and distances locally before you travel.</p>
        </section>
      )}
    </div>
  );
}
