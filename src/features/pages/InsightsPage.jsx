import { lazy, Suspense, useMemo, useState } from "react";
import { HERITAGE_SEED, CATEGORIES } from "../../data/heritageData";
import BarChart from "../components/BarChart";
import { MapSkeleton } from "../components/Skeleton";
import { useLang } from "../i18n/useLang";
import { ALL_DISTRICTS, cuisineGroup, getProfile, guidePath } from "../lib/districts";
import { heritagePins } from "../lib/heritagePins";
import { usePageTitle } from "../lib/usePageTitle";

const LeafletMap = lazy(() => import("../components/LeafletMap"));

const METRICS = [["total", "All listings"], ["restaurants", "Restaurants"], ["places", "Places"], ["shops", "Shops & markets"]];
const COLOURS = ["#6366f1", "#ec4899", "#f59e0b", "#10b981", "#0ea5e9", "#8b5cf6", "#ef4444", "#14b8a6", "#f97316", "#64748b"];

function Donut({ slices, label }) {
  const total = slices.reduce((a, s) => a + s.value, 0) || 1;
  const starts = slices.map((_, i) => slices.slice(0, i).reduce((sum, x) => sum + (x.value / total) * 100, 0));
  const r = 15.9155; // circumference 100
  return (
    <div className="fx-donut">
      <svg viewBox="0 0 42 42" role="img" aria-label={label}>
        <circle cx="21" cy="21" r={r} fill="none" stroke="var(--border)" strokeWidth="6" />
        {slices.map((s, i) => {
          const pct = (s.value / total) * 100;
          return <circle key={s.label} cx="21" cy="21" r={r} fill="none" stroke={COLOURS[i % COLOURS.length]} strokeWidth="6" strokeDasharray={`${pct} ${100 - pct}`} strokeDashoffset={25 - starts[i]} />;
        })}
      </svg>
      <ul>
        {slices.map((s, i) => <li key={s.label}><span className="fx-dot" style={{ background: COLOURS[i % COLOURS.length] }} />{s.label}: <strong>{s.value}</strong></li>)}
      </ul>
    </div>
  );
}

export default function InsightsPage() {
  const { t } = useLang();
  usePageTitle(t("insightsTitle"));
  const [metric, setMetric] = useState("total");
  const [state, setState] = useState("all");

  const profiles = useMemo(() => ALL_DISTRICTS.map((d) => getProfile(d.state, d.district)), []);
  const totals = useMemo(() => ({
    districts: profiles.length,
    restaurants: profiles.reduce((a, p) => a + p.restaurants.length, 0),
    places: profiles.reduce((a, p) => a + p.places.length, 0),
    shops: profiles.reduce((a, p) => a + p.shops.length, 0),
    heritage: HERITAGE_SEED.length,
    gi: HERITAGE_SEED.filter((h) => h.gi).length,
  }), [profiles]);

  const perDistrict = useMemo(
    () =>
      profiles
        .filter((p) => state === "all" || p.state === state)
        .map((p) => ({ key: p.slug, label: p.district, value: metric === "total" ? p.total : p[metric].length, to: guidePath(p) }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 12),
    [profiles, metric, state]
  );

  const cuisines = useMemo(() => {
    const m = {};
    profiles.forEach((p) => p.restaurants.forEach((r) => { const g = cuisineGroup(r.cuisine); m[g] = (m[g] || 0) + 1; }));
    return Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([label, value]) => ({ label, value }));
  }, [profiles]);

  const placeTypes = useMemo(() => {
    const m = {};
    profiles.forEach((p) => p.places.forEach((x) => { m[x.type] = (m[x.type] || 0) + 1; }));
    return Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([label, value]) => ({ label, value }));
  }, [profiles]);

  const byCategory = CATEGORIES.map((c) => ({ label: c.short, value: HERITAGE_SEED.filter((h) => h.category === c.id).length }));
  const byState = ["Andhra Pradesh", "Telangana"].map((s) => ({ label: s, value: HERITAGE_SEED.filter((h) => h.state === s).length }));
  const giPins = useMemo(() => heritagePins((h) => h.gi), []);

  return (
    <div className="page fx-page">
      <p className="kicker">{t("groupDiscover")}</p>
      <h1>📊 {t("insightsTitle")}</h1>
      <p className="lead">{t("insightsLead")}</p>

      <div className="fx-stats" aria-label="Totals">
        {[["Districts", totals.districts], ["Restaurants", totals.restaurants], ["Places", totals.places], ["Shops & markets", totals.shops], ["Heritage items", totals.heritage], ["GI-tagged", totals.gi]].map(([l, n]) => (
          <div key={l} className="fx-stat"><strong>{n}</strong><span>{l}</span></div>
        ))}
      </div>

      <section className="fx-card" aria-label="Listings per district">
        <h2 className="fx-h2">Listings per district (top 12)</h2>
        <div className="chips">
          {METRICS.map(([id, label]) => <button key={id} type="button" className={metric === id ? "chip active" : "chip"} aria-pressed={metric === id} onClick={() => setMetric(id)}>{label}</button>)}
        </div>
        <div className="chips">
          {[["all", t("allStates")], ["Andhra Pradesh", "Andhra Pradesh"], ["Telangana", "Telangana"]].map(([id, label]) => <button key={id} type="button" className={state === id ? "chip active" : "chip"} aria-pressed={state === id} onClick={() => setState(id)}>{label}</button>)}
        </div>
        <BarChart rows={perDistrict} label="Listings per district" />
      </section>

      <div className="fx-cols two">
        <section className="fx-card" aria-label="Cuisines">
          <h2 className="fx-h2">Most common cuisines</h2>
          <BarChart rows={cuisines} label="Restaurants by cuisine group" hue="#f59e0b" />
        </section>
        <section className="fx-card" aria-label="Place types">
          <h2 className="fx-h2">Kinds of famous places</h2>
          <BarChart rows={placeTypes} label="Famous places by type" hue="#10b981" />
        </section>
      </div>

      <div className="fx-cols two">
        <section className="fx-card" aria-label="Heritage by category">
          <h2 className="fx-h2">Heritage items by category</h2>
          <Donut slices={byCategory} label="Heritage items by category" />
        </section>
        <section className="fx-card" aria-label="Heritage by state">
          <h2 className="fx-h2">Heritage items by state</h2>
          <Donut slices={byState} label="Heritage items by state" />
        </section>
      </div>

      <section className="fx-card" aria-label="GI-tagged map">
        <h2 className="fx-h2">🏅 GI-tagged map</h2>
        <p className="muted small">Pins sit near each item's place of origin and are approximate.</p>
        <Suspense fallback={<MapSkeleton />}>
          <LeafletMap heritage={giPins} fitKey="gi" label="Map of GI-tagged items" className="fx-map-inline" />
        </Suspense>
      </section>
      <p className="muted small">Counts come from this app's own data and change when the data changes.</p>
    </div>
  );
}
