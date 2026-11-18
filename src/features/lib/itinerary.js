import { itemMapQuery, mapsRouteUrl } from "../../utils/maps";
import { nearestNeighbourOrder } from "./geo";
import { districtByName, getProfile } from "./districts";

// Rule-based itinerary builder. No AI: it simply picks the next unused place, restaurant and
// market or craft stop from the app's own data, district by district.

export const MAX_DISTRICTS = 8;
export const MAX_DAYS = 14;
const MAX_DAYS_PER_DISTRICT = 4;

export const PACES = {
  standard: ["morning", "lunch", "afternoon"],
  full: ["morning", "morning", "lunch", "afternoon", "evening"],
};

const PLACE_ORDER = {
  culture: ["Temple", "Heritage", "Fort", "Museum", "Cave"],
  nature: ["Beach", "Waterfall", "Lake", "Wildlife", "Tourism", "Dam", "Cave"],
};
const SHOP_ORDER = {
  food: ["Food", "Sweets", "Bakery", "Market"],
  crafts: ["Handicrafts", "Handloom", "Bangles", "Shopping"],
};

const stable = (list, order) => {
  if (!order) return [...list];
  const rank = (x) => {
    const i = order.indexOf(x.type);
    return i === -1 ? order.length : i;
  };
  return list.map((x, n) => [x, n]).sort((a, b) => rank(a[0]) - rank(b[0]) || a[1] - b[1]).map(([x]) => x);
};

const rate = (r) => (typeof r.rating === "number" ? r.rating : -1);

function makePools(profile, focus) {
  return {
    places: stable(profile.places, PLACE_ORDER[focus]),
    restaurants: [...profile.restaurants].sort((a, b) => rate(b) - rate(a)),
    shops: stable(profile.shops, SHOP_ORDER[focus]),
    heritage: [...profile.heritage],
    i: { places: 0, restaurants: 0, shops: 0, heritage: 0 },
  };
}

const next = (pool, kind) => (pool.i[kind] < pool[kind].length ? pool[kind][pool.i[kind]++] : null);

/** Spread `days` over the districts: richer districts get extra days (up to 4 each). */
export function allocateDays(richness, days) {
  const n = richness.length;
  const counts = Array(n).fill(1);
  for (let extra = days - n; extra > 0; extra--) {
    let best = -1;
    let bestScore = -1;
    counts.forEach((c, i) => {
      if (c >= MAX_DAYS_PER_DISTRICT) return;
      const score = richness[i] / c;
      if (score > bestScore) {
        bestScore = score;
        best = i;
      }
    });
    if (best === -1) break;
    counts[best]++;
  }
  return counts;
}

export function buildItinerary({ districts, days, pace = "standard", focus = "mix" }) {
  const names = [...new Set(districts)].filter((d) => districtByName(d)).slice(0, MAX_DISTRICTS);
  if (!names.length) return [];
  const total = Math.max(1, Math.min(MAX_DAYS, Number(days) || 1));
  const slots = PACES[pace] ?? PACES.standard;

  const ordered = nearestNeighbourOrder(names.map((n) => districtByName(n)), (d) => d.ll ?? [0, 0]);
  const profiles = ordered.map((d) => getProfile(d.state, d.district));
  const pools = profiles.map((p) => makePools(p, focus));

  // Which districts does each day cover?
  const dayDistricts = [];
  if (total >= ordered.length) {
    allocateDays(profiles.map((p) => p.total || 1), total).forEach((c, di) => {
      for (let k = 0; k < c; k++) dayDistricts.push([di]);
    });
  } else {
    const base = Math.floor(ordered.length / total);
    const extra = ordered.length % total;
    let cursor = 0;
    for (let d = 0; d < total; d++) {
      const size = base + (d < extra ? 1 : 0);
      dayDistricts.push(Array.from({ length: size }, (_, k) => cursor + k));
      cursor += size;
    }
  }

  let seq = 0;
  const mk = (slot, kind, di, fields) => ({ id: `s${++seq}`, slot, kind, state: profiles[di].state, district: profiles[di].district, ...fields });

  const place = (slot, di) => {
    const p = next(pools[di], "places");
    return p && mk(slot, "place", di, { title: p.name, sub: `${p.type}. ${p.desc}`, emoji: p.icon, query: p.area });
  };
  const restaurant = (slot, di) => {
    const r = next(pools[di], "restaurants");
    return r && mk(slot, "restaurant", di, { title: r.name, sub: `${r.cuisine}. Try: ${r.dish}`, emoji: "🍽️", query: `${r.name}, ${r.area}`, rating: r.rating });
  };
  const shop = (slot, di) => {
    const s = next(pools[di], "shops");
    return s && mk(slot, "shop", di, { title: s.name, sub: `${s.type}. ${s.desc}`, emoji: s.icon, query: s.area });
  };
  const heritage = (slot, di) => {
    const h = next(pools[di], "heritage");
    return h && mk(slot, "heritage", di, { title: h.name, sub: `Specialty of ${h.origin}. ${h.tagline}`, emoji: h.emoji, query: itemMapQuery(h), heritageId: h.id });
  };

  const fill = (slot, di, index) => {
    if (slot === "lunch") return restaurant(slot, di);
    if (slot === "afternoon") {
      const craftsFirst = focus === "crafts" || (focus !== "food" && index % 2 === 0);
      return (craftsFirst ? heritage(slot, di) || shop(slot, di) : shop(slot, di) || heritage(slot, di)) || place(slot, di);
    }
    if (slot === "evening") return place(slot, di) || shop(slot, di) || heritage(slot, di);
    return place(slot, di) || heritage(slot, di) || shop(slot, di);
  };

  return dayDistricts.map((dis, n) => {
    const stops = [];
    slots.forEach((slot, i) => {
      const di = dis[Math.min(dis.length - 1, Math.floor((i * dis.length) / slots.length))];
      const stop = fill(slot, di, n);
      if (stop) stops.push(stop);
    });
    return {
      n: n + 1,
      districts: dis.map((di) => ({ state: profiles[di].state, district: profiles[di].district })),
      stops,
    };
  });
}

/* ---------- editing helpers (all return a new plan) ---------- */

export function moveStop(plan, dayIdx, stopIdx, delta) {
  const to = stopIdx + delta;
  const day = plan[dayIdx];
  if (!day || to < 0 || to >= day.stops.length) return plan;
  const stops = [...day.stops];
  [stops[stopIdx], stops[to]] = [stops[to], stops[stopIdx]];
  return plan.map((d, i) => (i === dayIdx ? { ...d, stops } : d));
}

export function moveStopToDay(plan, dayIdx, stopIdx, toDay) {
  if (toDay === dayIdx || !plan[toDay] || !plan[dayIdx]?.stops[stopIdx]) return plan;
  const stop = plan[dayIdx].stops[stopIdx];
  return plan.map((d, i) => {
    if (i === dayIdx) return { ...d, stops: d.stops.filter((_, k) => k !== stopIdx) };
    if (i === toDay) return { ...d, stops: [...d.stops, stop] };
    return d;
  });
}

export function removeStop(plan, dayIdx, stopIdx) {
  return plan.map((d, i) => (i === dayIdx ? { ...d, stops: d.stops.filter((_, k) => k !== stopIdx) } : d));
}

/* ---------- output helpers ---------- */

export const dayRouteUrl = (day) => mapsRouteUrl(day.stops.map((s) => s.query));

export function planToText(plan, { title = "My trip (MTS Famous Places Finder)", link = "" } = {}) {
  const lines = [title];
  for (const d of plan) {
    lines.push("", `Day ${d.n}: ${[...new Set(d.districts.map((x) => x.district))].join(" + ")}`);
    d.stops.forEach((s, i) => lines.push(`${i + 1}. ${s.title} (${s.district})`));
  }
  if (link) lines.push("", link);
  return lines.join("\n");
}
