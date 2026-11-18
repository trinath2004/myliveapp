import { FAMOUS_PLACES, RESTAURANTS, SHOPS_MARKETS } from "../../data/data";
import { HERITAGE_SEED } from "../../data/heritageData";
import { DISTRICT_META } from "../data/districtMeta";
import { haversineKm } from "./geo";
import { slugify } from "./slug";

/** Every district of both states with its coordinates, slug and Telugu name. */
export const ALL_DISTRICTS = Object.entries(RESTAURANTS).flatMap(([state, districts]) =>
  Object.keys(districts).map((district) => {
    const meta = DISTRICT_META[state]?.[district] ?? {};
    return { state, district, slug: slugify(district), ll: meta.ll ?? null, te: meta.te ?? district, knownFor: meta.knownFor ?? "" };
  })
);

const BY_SLUG = new Map(ALL_DISTRICTS.map((d) => [d.slug, d]));
const BY_NAME = new Map(ALL_DISTRICTS.map((d) => [d.district, d]));

export const districtBySlug = (slug) => BY_SLUG.get(slug) ?? null;
export const districtByName = (name) => BY_NAME.get(name) ?? null;

// Words that do not help tell two places apart. Used to hide near-duplicate entries in the data.
const NOISE = new Set(["temple", "swamy", "swami", "matha", "mutt", "stalls", "bazaar", "sri", "shri", "and", "the", "area", "village"]);
function key(name) {
  return String(name)
    .toLowerCase()
    .replace(/waterfalls?|falls/g, "waterfall")
    .replace(/[^a-z0-9 ]+/g, " ")
    .split(/\s+/)
    .filter((w) => w && !NOISE.has(w))
    .join(" ");
}

/** Removes near-duplicate entries (for example the same temple listed twice with slightly different names). */
export function dedupe(list) {
  const kept = [];
  const keys = [];
  for (const item of list) {
    const k = key(item.name);
    const dup = keys.some((o) => o === k || (/\b(stalls|bazaar)\b/i.test(item.name) && !k.includes(" ") && o.split(" ").includes(k)));
    if (!dup) {
      kept.push(item);
      keys.push(k);
    }
  }
  return kept;
}

const rate = (r) => (typeof r.rating === "number" ? r.rating : -1);

/** Group the many different cuisine labels into a handful that read well in a chart. */
export function cuisineGroup(label) {
  const c = String(label).toLowerCase();
  if (c.includes("biryani")) return "Biryani";
  if (c.includes("seafood")) return "Seafood";
  if (c.includes("tribal")) return "Tribal food";
  if (c.includes("tiffin")) return "Tiffins";
  if (c.includes("barbecue") || c.includes("bbq")) return "Barbecue";
  if (c.includes("andhra") || c.includes("meals") || c.includes("telangana") || c.includes("hyderabadi")) return "Andhra & Telangana";
  if (/(cafe|bakery|sweet|ice|dessert|juice|tea|coffee)/.test(c)) return "Cafes, bakeries & sweets";
  if (/(north|dhaba|punjabi|mughlai|tandoor|kebab)/.test(c)) return "North Indian & Mughlai";
  if (/(chinese|asian|thai|italian|continental|pizza)/.test(c)) return "Chinese & other";
  if (/(street|snack|fast|chaat)/.test(c)) return "Street food & snacks";
  if (c.includes("multi")) return "Multi-cuisine";
  return "Other";
}

export function heritageIn(state, district) {
  return HERITAGE_SEED.filter((h) => h.state === state && h.district === district);
}

/** Everything the app knows about one district, in one object. */
export function getProfile(state, district) {
  const info = BY_NAME.get(district);
  const restaurants = [...(RESTAURANTS[state]?.[district] ?? [])];
  const places = dedupe(FAMOUS_PLACES[state]?.[district] ?? []);
  const shops = dedupe(SHOPS_MARKETS[state]?.[district] ?? []);
  const heritage = heritageIn(state, district);
  const rated = [...restaurants].sort((a, b) => rate(b) - rate(a));

  const count = (arr, f) => arr.reduce((m, x) => ((m[f(x)] = (m[f(x)] || 0) + 1), m), {});
  const cuisines = Object.entries(count(restaurants, (r) => cuisineGroup(r.cuisine))).sort((a, b) => b[1] - a[1]);
  const placeTypes = Object.entries(count(places, (p) => p.type)).sort((a, b) => b[1] - a[1]);

  return {
    ...info,
    state,
    district,
    restaurants,
    places,
    shops,
    heritage,
    gi: heritage.filter((h) => h.gi),
    topRestaurants: rated.slice(0, 3),
    topPlaces: places.slice(0, 4),
    topShops: shops.slice(0, 3),
    cuisines,
    placeTypes,
    total: restaurants.length + places.length + shops.length,
  };
}

/** The n districts closest to the given district headquarters, with straight-line distance in km. */
export function nearbyDistricts(district, n = 3) {
  const me = BY_NAME.get(district);
  if (!me?.ll) return [];
  return ALL_DISTRICTS.filter((d) => d.district !== district && d.ll)
    .map((d) => ({ ...d, km: Math.round(haversineKm(me.ll, d.ll)) }))
    .sort((a, b) => a.km - b.km)
    .slice(0, n);
}

/** The district whose headquarters is closest to a point. HQ-based, so near a border it may be the neighbour. */
export function closestDistrict(ll) {
  let best = null;
  let bestKm = Infinity;
  for (const d of ALL_DISTRICTS) {
    if (!d.ll) continue;
    const km = haversineKm(ll, d.ll);
    if (km < bestKm) {
      bestKm = km;
      best = d;
    }
  }
  return best ? { ...best, km: Math.round(bestKm) } : null;
}

export const guidePath = (d) => `/district/${typeof d === "string" ? slugify(d) : d.slug}`;
