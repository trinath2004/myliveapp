import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import { mapsSearchUrl } from "../../utils/maps";
import ShareBar from "../components/ShareBar";
import { useLang } from "../i18n/useLang";
import { ALL_DISTRICTS, districtBySlug, getProfile, guidePath, nearbyDistricts } from "../lib/districts";
import { qrSvg } from "../lib/qr";
import { usePageTitle } from "../lib/usePageTitle";

/* ---------------------------------------------------------------- index of all 61 districts */

export function DistrictsIndexPage() {
  const { t, dn, sn } = useLang();
  usePageTitle(t("guidesTitle"));
  const [q, setQ] = useState("");
  const needle = q.trim().toLowerCase();
  const list = ALL_DISTRICTS.filter((d) => !needle || `${d.district} ${d.te} ${d.knownFor}`.toLowerCase().includes(needle));

  return (
    <div className="page fx-page">
      <p className="kicker">{t("groupPlan")}</p>
      <h1>📘 {t("guidesTitle")}</h1>
      <p className="lead">{t("guidesLead")}</p>
      <input className="fx-input" type="search" placeholder={t("filterDistricts")} value={q} onChange={(e) => setQ(e.target.value)} aria-label={t("filterDistricts")} />
      {["Andhra Pradesh", "Telangana"].map((state) => {
        const rows = list.filter((d) => d.state === state);
        if (!rows.length) return null;
        return (
          <section key={state} aria-label={state}>
            <h2 className="fx-h2">{sn(state)} <span className="muted small">({rows.length})</span></h2>
            <div className="fx-grid">
              {rows.map((d) => (
                <Link key={d.slug} to={guidePath(d)} className="fx-tile">
                  <strong>{dn(d.state, d.district)}</strong>
                  <span className="muted small">{d.knownFor}</span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
      {list.length === 0 && <div className="empty-state"><span aria-hidden="true">🔎</span><p className="muted">{t("searchEmpty")}</p></div>}
    </div>
  );
}

/* ---------------------------------------------------------------- one district */

function ItemList({ items, render, highlight }) {
  return (
    <ul className="fx-list">
      {items.map((it) => (
        <li key={it.name} data-name={it.name} className={highlight === it.name ? "fx-hl" : ""}>{render(it)}</li>
      ))}
    </ul>
  );
}

export function DistrictGuidePage() {
  const { slug } = useParams();
  const info = districtBySlug(slug);
  if (!info) return <Navigate to="/districts" replace />;
  return <Guide key={info.slug} info={info} />;
}

function Guide({ info }) {
  const { t, dn, sn } = useLang();
  const [params] = useSearchParams();
  const hl = params.get("hl") || "";
  const p = useMemo(() => getProfile(info.state, info.district), [info]);
  const near = useMemo(() => nearbyDistricts(info.district, 3), [info]);
  const title = dn(info.state, info.district);
  usePageTitle(`${info.district} guide`);

  // jump to the item the visitor found through search
  useEffect(() => {
    if (!hl) return;
    const el = [...document.querySelectorAll("[data-name]")].find((n) => n.getAttribute("data-name") === hl);
    el?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [hl]);

  const url = `${window.location.href.split("#")[0]}#${guidePath(info)}`;
  const summary = `${info.district} (${info.state}): ${info.knownFor}`;
  const picks = [...p.topPlaces.slice(0, 3).map((x) => x.name), ...p.topRestaurants.slice(0, 2).map((x) => x.name)];

  return (
    <div className="page fx-page">
      <p className="kicker"><Link to="/districts">{t("guidesTitle")}</Link> · {sn(info.state)}</p>
      <h1>{title}</h1>
      {info.te && info.te !== title && <p className="muted" lang="te">{info.te}</p>}
      <p className="lead"><strong>{t("knownFor")}:</strong> {info.knownFor}</p>

      <div className="fx-toolbar fx-noprint">
        <div className="trail-actions">
          <Link className="btn btn-sm" to={`/trip?districts=${encodeURIComponent(info.district)}&days=2`}>🗓️ {t("planHere")}</Link>
          <Link className="btn-ghost btn-sm" to={`/map?district=${encodeURIComponent(info.district)}`}>🗺️ {t("onMap")}</Link>
          <Link className="btn-ghost btn-sm" to={`${guidePath(info)}/print`}>🖨️ {t("printGuide")}</Link>
        </div>
        <ShareBar text={`${summary}\nTop picks: ${picks.join(", ")}`} url={url} />
      </div>

      <div className="fx-stats" aria-label="At a glance">
        {[[t("restaurants"), p.restaurants.length], [t("places"), p.places.length], [t("shops"), p.shops.length], [t("heritage"), p.heritage.length]].map(([label, n]) => (
          <div key={label} className="fx-stat"><strong>{n}</strong><span>{label}</span></div>
        ))}
      </div>

      <div className="fx-cols">
        <section aria-label={t("places")}>
          <h2 className="fx-h2">🏞️ {t("places")}</h2>
          <ItemList items={p.places} highlight={hl} render={(x) => (
            <><span aria-hidden="true">{x.icon}</span> <div><strong>{x.name}</strong> <span className="tag">{x.type}</span><p className="muted small">{x.desc}</p><a className="small" href={mapsSearchUrl(x.area)} target="_blank" rel="noopener noreferrer">📍 {t("openInMaps")}</a></div></>
          )} />
        </section>

        <section aria-label={t("restaurants")}>
          <h2 className="fx-h2">🍽️ {t("restaurants")}</h2>
          <ItemList items={p.restaurants} highlight={hl} render={(x) => (
            <><span aria-hidden="true">🍽️</span> <div><strong>{x.name}</strong> {typeof x.rating === "number" && <span className="tag">★ {x.rating}</span>}<p className="muted small">{x.cuisine}. Try: {x.dish}</p><a className="small" href={mapsSearchUrl(`${x.name}, ${x.area}`)} target="_blank" rel="noopener noreferrer">📍 {t("openInMaps")}</a></div></>
          )} />
        </section>

        <section aria-label={t("shops")}>
          <h2 className="fx-h2">🛍️ {t("shops")}</h2>
          <ItemList items={p.shops} highlight={hl} render={(x) => (
            <><span aria-hidden="true">{x.icon}</span> <div><strong>{x.name}</strong> <span className="tag">{x.type}</span><p className="muted small">{x.desc}</p><a className="small" href={mapsSearchUrl(x.area)} target="_blank" rel="noopener noreferrer">📍 {t("openInMaps")}</a></div></>
          )} />
        </section>
      </div>

      {p.heritage.length > 0 && (
        <section aria-label={t("heritage")}>
          <h2 className="fx-h2">🏺 {t("heritage")}</h2>
          <div className="fx-grid">
            {p.heritage.map((h) => (
              <Link key={h.id} to={`/heritage?item=${encodeURIComponent(h.id)}`} className="fx-tile">
                <strong><span aria-hidden="true">{h.emoji}</span> {h.name} {h.gi && <span className="tag">GI</span>}</strong>
                <span className="muted small">{h.tagline}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {near.length > 0 && (
        <section aria-label={t("nearby")}>
          <h2 className="fx-h2">🧭 {t("nearby")}</h2>
          <div className="chips">
            {near.map((d) => <Link key={d.slug} className="chip" to={guidePath(d)}>{dn(d.state, d.district)} · ~{d.km} km</Link>)}
          </div>
          <p className="muted small">Straight-line distance between district headquarters, not road distance.</p>
        </section>
      )}

      <p className="muted small">District facts come from public knowledge and this app's data. Please confirm details locally.</p>
    </div>
  );
}

/* ---------------------------------------------------------------- A4 brochure */

export function DistrictPrintPage() {
  const { slug } = useParams();
  const info = districtBySlug(slug);
  if (!info) return <Navigate to="/districts" replace />;
  return <Brochure key={info.slug} info={info} />;
}

function Brochure({ info }) {
  const { t } = useLang();
  const p = useMemo(() => getProfile(info.state, info.district), [info]);
  const near = useMemo(() => nearbyDistricts(info.district, 3), [info]);
  usePageTitle(`${info.district} brochure`);
  const url = `${window.location.href.split("#")[0]}#${guidePath(info)}`;
  const qr = useMemo(() => qrSvg(url, 4), [url]);

  return (
    <div className="page fx-page fx-print-page">
      <div className="fx-noprint fx-toolbar">
        <div>
          <p className="kicker"><Link to={guidePath(info)}>← {info.district}</Link></p>
          <p className="muted small">Press Print, then choose “Save as PDF” as the printer to get an A4 PDF.</p>
        </div>
        <button type="button" className="btn" onClick={() => window.print()}>🖨️ {t("print")}</button>
      </div>

      <article className="fx-sheet" aria-label={`${info.district} A4 guide`}>
        <header className="fx-sheet-head">
          <div>
            <p className="fx-sheet-state">{info.state}</p>
            <h1>{info.district}</h1>
            {info.te && <p lang="te" className="fx-sheet-te">{info.te}</p>}
          </div>
          <div className="fx-sheet-qr">
            <div dangerouslySetInnerHTML={{ __html: qr }} aria-label="QR code linking to the online guide" role="img" />
            <small>Scan for the online guide</small>
          </div>
        </header>

        <p className="fx-sheet-lead"><strong>{t("knownFor")}:</strong> {info.knownFor}</p>

        <div className="fx-sheet-cols">
          <section>
            <h2>Must visit</h2>
            <ul>{p.places.slice(0, 6).map((x) => <li key={x.name}><strong>{x.name}</strong> <em>{x.type}</em><br />{x.desc}</li>)}</ul>
          </section>
          <section>
            <h2>Where to eat</h2>
            <ul>{[...p.restaurants].sort((a, b) => (b.rating ?? -1) - (a.rating ?? -1)).slice(0, 5).map((x) => <li key={x.name}><strong>{x.name}</strong> <em>{x.cuisine}</em><br />Try: {x.dish}</li>)}</ul>
          </section>
          <section>
            <h2>Shop &amp; markets</h2>
            <ul>{p.shops.slice(0, 4).map((x) => <li key={x.name}><strong>{x.name}</strong><br />{x.desc}</li>)}</ul>
          </section>
          {p.heritage.length > 0 && (
            <section>
              <h2>Local specialties</h2>
              <ul>{p.heritage.map((h) => <li key={h.id}><strong>{h.emoji} {h.name}</strong>{h.gi ? " (GI-tagged)" : ""}<br />{h.tagline}</li>)}</ul>
            </section>
          )}
        </div>

        {near.length > 0 && <p className="fx-sheet-near"><strong>{t("nearby")}:</strong> {near.map((d) => `${d.district} (~${d.km} km)`).join(", ")}</p>}
        <footer className="fx-sheet-foot">
          <span>MTS Heritage Hub · {url}</span>
          <span>Information is from public knowledge and may change. Please confirm locally.</span>
        </footer>
      </article>
    </div>
  );
}
