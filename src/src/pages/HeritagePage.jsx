import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CATEGORIES, HERITAGE_SEED } from "../data/heritageData";
import HeritageCard from "../components/HeritageCard";
import ItemModal from "../components/ItemModal";
import ArtisanSpotlight from "../components/ArtisanSpotlight";
import SiteFooter from "../components/SiteFooter";

const items = HERITAGE_SEED;

const SORTS = {
  featured: { label: "Featured", fn: () => 0 },
  name: { label: "Name A to Z", fn: (a, b) => a.name.localeCompare(b.name) },
  district: { label: "District A to Z", fn: (a, b) => a.district.localeCompare(b.district) || a.name.localeCompare(b.name) },
};

/** Regional Heritage Hub. Filters and the open item live in the URL so any view can be shared. */
export default function HeritagePage() {
  const [params, setParams] = useSearchParams();
  const [sort, setSort] = useState("featured");

  const state = params.get("state") ?? "";
  const district = params.get("district") ?? "";
  const cat = params.get("cat") ?? "";
  const q = params.get("q") ?? "";
  const giOnly = params.get("gi") === "1";
  const openId = params.get("item") ?? "";

  const update = (patch) => {
    const next = new URLSearchParams(params);
    Object.entries(patch).forEach(([k, v]) => (v ? next.set(k, v) : next.delete(k)));
    setParams(next, { replace: true });
  };
  const open = (it) => update({ item: it.id });
  const close = () => update({ item: "" });

  const states = useMemo(() => [...new Set(items.map((i) => i.state))].sort(), []);
  const districts = useMemo(
    () => [...new Set(items.filter((i) => !state || i.state === state).map((i) => i.district))].sort(),
    [state]
  );

  const needle = q.trim().toLowerCase();
  const visible = useMemo(
    () =>
      items
        .filter((i) => (!state || i.state === state) && (!district || i.district === district) && (!cat || i.category === cat) && (!giOnly || i.gi))
        .filter((i) => !needle || `${i.name} ${i.tagline} ${i.origin} ${i.district} ${i.state} ${i.tags.join(" ")}`.toLowerCase().includes(needle))
        .sort(SORTS[sort].fn),
    [state, district, cat, giOnly, needle, sort]
  );

  const catCounts = useMemo(() => {
    const base = items.filter((i) => (!state || i.state === state) && (!district || i.district === district) && (!giOnly || i.gi));
    return Object.fromEntries(CATEGORIES.map((c) => [c.id, base.filter((i) => i.category === c.id).length]));
  }, [state, district, giOnly]);

  const openItem = items.find((i) => i.id === openId);
  const heading = district || state || "Andhra Pradesh & Telangana";
  const hasFilters = state || district || cat || q || giOnly;
  const surprise = () => open(items[Math.floor(Math.random() * items.length)]);

  return (
    <div className="heritage">
      <header className="h-hero">
        <div className="h-hero-orb" aria-hidden="true" />
        <p className="kicker">Regional Heritage Hub</p>
        <h1>Famous foods, handlooms &amp; crafts of <span className="grad">{heading}</span></h1>
        <p className="lead">Pick a state or district to discover the sweets, sarees and handmade treasures it is famous for, the people who keep them alive, and exactly where to find them on the map.</p>

        <ul className="h-stats" aria-label="Hub at a glance">
          <li><strong>{items.length}</strong><span>specialties</span></li>
          <li><strong>{new Set(items.map((i) => i.district)).size}</strong><span>districts</span></li>
          <li><strong>{items.filter((i) => i.gi).length}</strong><span>GI-tagged</span></li>
        </ul>

        <div className="h-filters">
          <label className="grow">
            <span className="sr-only">Search</span>
            <input type="search" placeholder="🔍  Search “kalamkari”, “laddu”, “Pochampally”…" value={q} onChange={(e) => update({ q: e.target.value })} />
          </label>
          <label>
            <span className="sr-only">State</span>
            <select value={state} onChange={(e) => update({ state: e.target.value, district: "" })}>
              <option value="">All states</option>
              {states.map((s) => <option key={s}>{s}</option>)}
            </select>
          </label>
          <label>
            <span className="sr-only">District</span>
            <select value={district} onChange={(e) => update({ district: e.target.value })}>
              <option value="">All districts</option>
              {districts.map((d) => <option key={d}>{d}</option>)}
            </select>
          </label>
        </div>

        <div className="chips" role="group" aria-label="Categories">
          <button className={!cat ? "chip active" : "chip"} onClick={() => update({ cat: "" })}>✨ All <span>{Object.values(catCounts).reduce((a, b) => a + b, 0)}</span></button>
          {CATEGORIES.map((c) => (
            <button key={c.id} className={cat === c.id ? "chip active" : "chip"} onClick={() => update({ cat: cat === c.id ? "" : c.id })}>
              {c.emoji} {c.label} <span>{catCounts[c.id]}</span>
            </button>
          ))}
          <button className={giOnly ? "chip active" : "chip"} aria-pressed={giOnly} onClick={() => update({ gi: giOnly ? "" : "1" })}>🏅 GI-tagged only</button>
          <button className="chip" onClick={surprise}>🎲 Surprise me</button>
        </div>
      </header>

      <main className="h-main">
        <div className="h-toolbar">
          <p className="muted" aria-live="polite">{visible.length} specialt{visible.length === 1 ? "y" : "ies"} found</p>
          <div className="h-toolbar-right">
            {hasFilters && <button className="link" onClick={() => setParams({}, { replace: true })}>Clear filters</button>}
            <label>
              <span className="sr-only">Sort</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                {Object.entries(SORTS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </label>
          </div>
        </div>

        {visible.length === 0 ? (
          <div className="empty-state">
            <span aria-hidden="true">🧭</span>
            <h3>Nothing matched that search</h3>
            <p className="muted">Try another district or clear your filters. More specialties are added regularly.</p>
            <button className="btn btn-sm" onClick={() => setParams({}, { replace: true })}>Show everything</button>
          </div>
        ) : (
          <div className="h-grid">
            {visible.map((i) => <HeritageCard key={i.id} item={i} onOpen={open} />)}
          </div>
        )}

        <ArtisanSpotlight items={items} onOpen={open} />
      </main>

      <SiteFooter />
      {openItem && <ItemModal key={openItem.id} item={openItem} onClose={close} />}
    </div>
  );
}
