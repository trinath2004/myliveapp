// Merges the original data (data.js, restaurants.js) with the extra entries (moreData.js).
import { DATA } from "./data";
import { RESTAURANTS } from "./restaurants";
import { MORE_PLACES, MORE_RESTAURANTS } from "./moreData";

const ICONS = {
  Temple: "🛕", Tourism: "🏞️", Beach: "🏖️", Waterfall: "💧", Fort: "🏰", Wildlife: "🦌",
  Lake: "🌊", Museum: "🏛️", Heritage: "🏺", Dam: "🌉", Cave: "🕳️",
  Market: "🛒", Shopping: "🛍️", Food: "🍛", Sweets: "🍬", Handloom: "🧵",
  Handicrafts: "🎎", Bakery: "🍪", Bangles: "💍",
};

// Types that belong on the "Famous Places" tab; everything else is "Shops & Markets".
export const PLACE_TYPES = new Set([
  "Temple", "Tourism", "Beach", "Waterfall", "Fort", "Wildlife", "Lake", "Museum", "Heritage", "Dam", "Cave",
]);

const mergeUnique = (base = [], extra = []) => {
  const seen = new Set(base.map((x) => x.name.toLowerCase()));
  return [...base, ...extra.filter((x) => !seen.has(x.name.toLowerCase()))];
};

export function getPlaces(state, district) {
  const extra = (MORE_PLACES[state]?.[district] || []).map(([name, type, desc, area]) => ({
    name, type, icon: ICONS[type] || "📍", desc, area,
  }));
  const all = mergeUnique(DATA[state]?.[district] || [], extra);
  return {
    famous: all.filter((p) => PLACE_TYPES.has(p.type)),
    shops: all.filter((p) => !PLACE_TYPES.has(p.type)),
  };
}

export function getRestaurants(state, district) {
  const extra = (MORE_RESTAURANTS[state]?.[district] || []).map(([name, cuisine, rating, area, dish]) => ({
    name, cuisine, rating, area, dish,
  }));
  return mergeUnique(RESTAURANTS[state]?.[district] || [], extra);
}
