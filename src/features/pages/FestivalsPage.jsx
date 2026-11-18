import { useState } from "react";
import { Link } from "react-router-dom";
import { FESTIVALS, LONG_CYCLE, MONTH_NAMES, MONTH_SHORT } from "../data/festivals";
import { useLang } from "../i18n/useLang";
import { districtByName, guidePath } from "../lib/districts";
import { usePageTitle } from "../lib/usePageTitle";

const monthsText = (months) => months.map((m) => MONTH_NAMES[m - 1]).join(" / ");

export default function FestivalsPage() {
  const { t, dn } = useLang();
  usePageTitle(t("festTitle"));
  const [now] = useState(() => new Date().getMonth() + 1);
  const [month, setMonth] = useState(now); // 0 = whole year
  const list = FESTIVALS.filter((f) => month === 0 || f.months.includes(month));

  return (
    <div className="page fx-page">
      <p className="kicker">{t("groupPlan")}</p>
      <h1>🎉 {t("festTitle")}</h1>
      <p className="lead">{t("festLead")}</p>

      <div className="chips" role="group" aria-label="Month">
        <button type="button" className={month === 0 ? "chip active" : "chip"} aria-pressed={month === 0} onClick={() => setMonth(0)}>All year</button>
        {MONTH_SHORT.map((m, i) => (
          <button key={m} type="button" className={month === i + 1 ? "chip active" : "chip"} aria-pressed={month === i + 1} onClick={() => setMonth(i + 1)} aria-label={MONTH_NAMES[i]}>
            {m}{i + 1 === now ? " •" : ""}
          </button>
        ))}
      </div>
      {month === now && <p className="muted small">• {t("thisMonth")}</p>}

      {list.length === 0 ? (
        <div className="empty-state"><span aria-hidden="true">🗓️</span><p className="muted">No major festival listed for {MONTH_NAMES[month - 1]}. Try another month.</p></div>
      ) : (
        <div className="fx-fest-grid">
          {list.map((f) => (
            <article key={f.id} className="fx-card fx-fest">
              <h2 className="fx-h2"><span aria-hidden="true">{f.emoji}</span> {f.name}</h2>
              <p className="tag">{monthsText(f.months)}</p>
              <p>{f.blurb}</p>
              <p className="small"><strong>{t("eatThis")}:</strong> {f.eat.join(", ")}</p>
              <p className="small"><strong>{t("seeThis")}:</strong> {f.see.join(", ")}</p>
              <p className="muted small">{f.moves ? "📅 " : ""}{f.note}</p>
              <div className="chips">
                {f.districts.map((d) => {
                  const info = districtByName(d);
                  return info ? <Link key={d} className="chip" to={guidePath(info)}>{dn(info.state, d)}</Link> : null;
                })}
                <Link className="chip" to={`/trip?districts=${encodeURIComponent(f.districts.slice(0, 3).join(","))}&days=${Math.min(3, f.districts.length + 1)}`}>🗓️ {t("tripPlanner")}</Link>
              </div>
            </article>
          ))}
        </div>
      )}

      <section aria-label={t("longCycle")}>
        <h2 className="fx-h2">{t("longCycle")}</h2>
        <ul className="fx-list plain">
          {LONG_CYCLE.map((e) => <li key={e.name}><div><strong>{e.name}</strong><p className="muted small">{e.text}</p></div></li>)}
        </ul>
      </section>
      <p className="muted small">Festival information is from public knowledge. Dates change each year, so please confirm with the temple, tourism office or organisers.</p>
    </div>
  );
}
