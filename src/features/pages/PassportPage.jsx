import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import { useLang } from "../i18n/useLang";
import { districtByName, guidePath } from "../lib/districts";
import { BADGES, PASSPORT, TABS, earnedBadges } from "../lib/passport";
import { useStored } from "../lib/useStored";
import { usePageTitle } from "../lib/usePageTitle";

const NONE = [];

export default function PassportPage() {
  const { t } = useLang();
  usePageTitle(t("passportTitle"));
  const toast = useToast();
  const [stamps, setStamps] = useStored("passport", NONE);
  const [tab, setTab] = useState("all");

  const have = new Set(stamps);
  const earned = new Set(earnedBadges(stamps));
  const pct = Math.round((stamps.filter((id) => PASSPORT.some((e) => e.id === id)).length / PASSPORT.length) * 100);
  const list = PASSPORT.filter((e) => tab === "all" || e.tab === tab);

  const flip = (e) => {
    const was = have.has(e.id);
    const next = was ? stamps.filter((x) => x !== e.id) : [...stamps, e.id];
    setStamps(next);
    if (!was) {
      const newBadges = earnedBadges(next).filter((b) => !earned.has(b));
      if (newBadges.length) toast.success(`🎖️ New badge: ${BADGES.find((b) => b.id === newBadges[0]).name}`);
    }
  };

  return (
    <div className="page fx-page">
      <p className="kicker">{t("groupFun")}</p>
      <h1>🛂 {t("passportTitle")}</h1>
      <p className="lead">{t("passportLead")}</p>

      <section className="fx-card" aria-label={t("progress")}>
        <p><strong>{stamps.length}</strong> / {PASSPORT.length} · {pct}%</p>
        <progress className="fx-progress" max={100} value={pct} aria-label={t("progress")} />
      </section>

      <section aria-label={t("badges")}>
        <h2 className="fx-h2">🎖️ {t("badges")}</h2>
        <ul className="fx-badges">
          {BADGES.map((b) => (
            <li key={b.id} className={earned.has(b.id) ? "fx-badge on" : "fx-badge"}>
              <span className="fx-badge-emoji" aria-hidden="true">{b.emoji}</span>
              <div><strong>{b.name}</strong><p className="muted small">{b.text}</p></div>
              <span className="sr-only">{earned.has(b.id) ? "Earned" : "Not yet earned"}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="chips" role="group" aria-label="Show">
        {TABS.map(([id, label]) => <button key={id} type="button" className={tab === id ? "chip active" : "chip"} aria-pressed={tab === id} onClick={() => setTab(id)}>{label}</button>)}
      </div>

      <ul className="fx-stamps">
        {list.map((e) => {
          const on = have.has(e.id);
          const d = districtByName(e.district);
          return (
            <li key={e.id} className={on ? "fx-stamp on" : "fx-stamp"}>
              <span className="fx-stamp-emoji" aria-hidden="true">{e.emoji}</span>
              <div className="fx-stamp-body">
                <strong>{e.name}</strong> {e.gi && <span className="tag">GI</span>}
                <p className="muted small">{e.note}</p>
                {d && <Link className="small" to={guidePath(d)}>{t("viewGuide")}</Link>}
              </div>
              <button type="button" className={on ? "btn btn-sm" : "btn-ghost btn-sm"} aria-pressed={on} onClick={() => flip(e)}>{on ? `✓ ${t("stamped")}` : t("stamp")}</button>
            </li>
          );
        })}
      </ul>

      {stamps.length > 0 && (
        <button type="button" className="btn-ghost btn-sm" onClick={() => { if (window.confirm("Clear all your stamps on this device?")) setStamps([]); }}>{t("resetPassport")}</button>
      )}
      <p className="muted small">Stamps are on the honour system and are saved on this device only.</p>
    </div>
  );
}
