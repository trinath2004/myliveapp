import { FAMOUS_PLACES, RESTAURANTS, SHOPS_MARKETS } from "../../data/data";
import { HERITAGE_SEED } from "../../data/heritageData";
import { TE_ALIASES } from "../i18n/translations";
import { FESTIVALS } from "../data/festivals";
import { TRAILS } from "../data/trails";
import { ALL_DISTRICTS, guidePath } from "./districts";

// One searchable list across restaurants, places, shops, heritage items, districts, festivals and trails.

const TYPE_WEIGHT = { district: 5, heritage: 3, trail: 3, festival: 2.5, place: 2, shop: 1.8, restaurant: 1.5 };
export const TYPE_LABEL = { district: "District", heritage: "Heritage", trail: "Trail", festival: "Festival", place: "Place", shop: "Shop / market", restaurant: "Restaurant" };

let cache = null;

export function getIndex() {
  if (cache) return cache;
  const out = [];
  const add = (e) => out.push({ ...e, hay: `${e.label} ${e.sub} ${e.district || ""} ${e.state || ""} ${e.extra || ""}`.toLowerCase() });

  for (const d of ALL_DISTRICTS) {
    add({ type: "district", label: d.district, sub: `${d.state}. ${d.knownFor}`, emoji: "📍", state: d.state, district: d.district, to: guidePath(d), extra: `${d.te} guide` });
  }
  for (const h of HERITAGE_SEED) {
    add({ type: "heritage", label: h.name, sub: `${h.origin}, ${h.district}. ${h.tagline}`, emoji: h.emoji, state: h.state, district: h.district, to: `/heritage?item=${encodeURIComponent(h.id)}`, extra: h.tags.join(" ") });
  }
  for (const [state, ds] of Object.entries(RESTAURANTS)) {
    for (const [district, list] of Object.entries(ds)) {
      const to = (name) => `${guidePath(district)}?hl=${encodeURIComponent(name)}`;
      list.forEach((r) => add({ type: "restaurant", label: r.name, sub: `${r.cuisine}. ${r.dish}`, emoji: "🍽️", state, district, to: to(r.name), extra: r.area }));
      (FAMOUS_PLACES[state]?.[district] ?? []).forEach((p) => add({ type: "place", label: p.name, sub: `${p.type}. ${p.desc}`, emoji: p.icon, state, district, to: to(p.name) }));
      (SHOPS_MARKETS[state]?.[district] ?? []).forEach((p) => add({ type: "shop", label: p.name, sub: `${p.type}. ${p.desc}`, emoji: p.icon, state, district, to: to(p.name) }));
    }
  }
  for (const f of FESTIVALS) add({ type: "festival", label: f.name, sub: f.blurb, emoji: f.emoji, to: "/festivals", extra: f.eat.join(" ") });
  for (const t of TRAILS) add({ type: "trail", label: t.name, sub: t.blurb, emoji: t.emoji, to: `/trails?t=${t.id}` });

  cache = out;
  return out;
}

/** Lower-cases the query and adds the English words for any Telugu words in it. */
export function expandQuery(q) {
  let text = String(q || "").toLowerCase().trim();
  const extra = [];
  for (const [te, en] of Object.entries(TE_ALIASES)) if (text.includes(te)) extra.push(en);
  for (const d of ALL_DISTRICTS) if (d.te && text.includes(d.te)) extra.push(d.district.toLowerCase());
  if (extra.length) text = `${text} ${extra.join(" ")}`;
  return text;
}

export function search(q, limit = 30) {
  const text = expandQuery(q);
  const tokens = text.split(/\s+/).filter((t) => t.length > 0);
  if (!tokens.length) return [];
  // A pure-Telugu query becomes "telugu english": the Telugu words never match, so only keep tokens that can.
  const index = getIndex();
  const usable = tokens.filter((t) => /[a-z0-9]/.test(t) || index.some((e) => e.hay.includes(t)));
  if (!usable.length) return [];

  const scored = [];
  for (const e of index) {
    let score = 0;
    let ok = true;
    for (const t of usable) {
      if (!e.hay.includes(t)) {
        ok = false;
        break;
      }
      const label = e.label.toLowerCase();
      score += label.startsWith(t) ? 4 : label.includes(t) ? 3 : 1;
    }
    if (ok) scored.push([e, score + TYPE_WEIGHT[e.type]]);
  }
  return scored.sort((a, b) => b[1] - a[1]).slice(0, limit).map(([e]) => e);
}
