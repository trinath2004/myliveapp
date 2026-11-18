import { Link, useSearchParams } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import { useTrail } from "../../context/TrailContext";
import { HERITAGE_SEED } from "../../data/heritageData";
import { mapsRouteUrl, mapsSearchUrl } from "../../utils/maps";
import { useLang } from "../i18n/useLang";
import { guidePath, districtByName } from "../lib/districts";
import { RESOLVED_TRAILS } from "../lib/trails";
import { usePageTitle } from "../lib/usePageTitle";

function TrailCard({ trail, open }) {
  const { t, dn } = useLang();
  const { ids, toggle } = useTrail();
  const toast = useToast();
  const items = trail.items.map((id) => HERITAGE_SEED.find((h) => h.id === id)).filter(Boolean);
  const missing = items.filter((h) => !ids.includes(h.id));
  const districts = [...new Set(trail.stops.map((s) => s.district))];

  const addAll = () => {
    missing.forEach((h) => toggle(h.id));
    toast.success(t("addedToTrail"));
  };

  return (
    <article id={`trail-${trail.id}`} className={open ? "fx-card fx-trail open" : "fx-card fx-trail"} style={{ "--t1": trail.hue[0], "--t2": trail.hue[1] }}>
      <header className="fx-trail-head">
        <span className="fx-trail-emoji" aria-hidden="true">{trail.emoji}</span>
        <div>
          <h2 className="fx-h2">{trail.name}</h2>
          <p className="muted small">{trail.days} · {trail.stops.length} stops · {districts.length} {t("districts").toLowerCase()}</p>
        </div>
      </header>
      <p>{trail.blurb}</p>
      <ol className="fx-stops compact">
        {trail.stops.map((s, i) => (
          <li key={`${s.district}-${s.name}`} className="fx-stop">
            <span className="fx-stop-emoji" aria-hidden="true">{s.icon}</span>
            <div className="fx-stop-body">
              <strong>{i + 1}. {s.name}</strong>
              <p className="muted small">{dn(s.state, s.district)}{s.desc ? `. ${s.desc}` : ""}</p>
            </div>
            <a className="small fx-noprint" href={mapsSearchUrl(s.area)} target="_blank" rel="noopener noreferrer" aria-label={`${t("openInMaps")}: ${s.name}`}>📍</a>
          </li>
        ))}
      </ol>
      {items.length > 0 && (
        <p className="small"><strong>Specialties on this route:</strong> {items.map((h) => `${h.emoji} ${h.name}`).join(", ")}</p>
      )}
      <div className="trail-actions fx-noprint">
        {items.length > 0 && (
          <button type="button" className="btn btn-sm" onClick={addAll} disabled={missing.length === 0}>
            {missing.length === 0 ? `✓ ${t("addedToTrail")}` : `➕ ${t("addToTrail")}`}
          </button>
        )}
        <Link className="btn-ghost btn-sm" to={`/trip?districts=${encodeURIComponent(districts.slice(0, 8).join(","))}&days=${Math.min(14, Math.max(districts.length, parseInt(trail.days, 10) || 3))}`}>🗓️ {t("inTripPlanner")}</Link>
        <Link className="btn-ghost btn-sm" to={`/map?trail=${trail.id}`}>🗺️ {t("onMap")}</Link>
        <a className="btn-ghost btn-sm" href={mapsRouteUrl(trail.stops.map((s) => s.area))} target="_blank" rel="noopener noreferrer">🚗 {t("routeInMaps")}</a>
      </div>
      <div className="chips fx-noprint">
        {districts.map((d) => { const info = districtByName(d); return info ? <Link key={d} className="chip" to={guidePath(info)}>{dn(info.state, d)}</Link> : null; })}
      </div>
    </article>
  );
}

export default function TrailsPage() {
  const { t } = useLang();
  usePageTitle(t("trailsTitle"));
  const [params] = useSearchParams();
  const open = params.get("t") || "";
  return (
    <div className="page fx-page">
      <p className="kicker">{t("groupPlan")}</p>
      <h1>🚩 {t("trailsTitle")}</h1>
      <p className="lead">{t("trailsLead")}</p>
      <div className="fx-trail-grid">
        {RESOLVED_TRAILS.map((tr) => <TrailCard key={tr.id} trail={tr} open={open === tr.id} />)}
      </div>
      <p className="muted small">Trails are suggestions built from this app's data. Please check road distances and opening times before you travel.</p>
    </div>
  );
}
