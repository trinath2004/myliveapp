import { HERITAGE_SEED } from "../../data/heritageData";
import { DISHES } from "../data/dishes";

// Food Passport entries = the signature dishes + every Heritage Hub item that is not already a dish.

const giOf = (id) => Boolean(HERITAGE_SEED.find((h) => h.id === id)?.gi);

const dishEntries = DISHES.map((d) => ({
  id: d.id, name: d.name, emoji: d.emoji, tab: "food", district: d.where[0] ?? "", group: d.group ?? "", gi: d.heritageId ? giOf(d.heritageId) : false,
  note: d.where.length ? `Try in ${d.where.slice(0, 2).join(" or ")}` : `Found across ${d.states.join(" and ") || "both states"}`,
}));
const covered = new Set(DISHES.map((d) => d.heritageId).filter(Boolean));
const heritageEntries = HERITAGE_SEED.filter((h) => !covered.has(h.id)).map((h) => ({
  id: h.id, name: h.name, emoji: h.emoji, tab: h.category, district: h.district, group: "", gi: Boolean(h.gi), note: `${h.origin}, ${h.district}`,
}));

export const PASSPORT = [...dishEntries, ...heritageEntries];
export const TABS = [["all", "All"], ["food", "Dishes & sweets"], ["handloom", "Handlooms"], ["craft", "Crafts"]];

const count = (stamps, pred) => PASSPORT.filter((e) => stamps.has(e.id) && pred(e)).length;

export const BADGES = [
  { id: "biryani", name: "Biryani Boss", emoji: "🍛", text: "Stamp Hyderabadi dum biryani, fry-piece biryani and haleem.", test: (s) => DISHES.filter((d) => d.group === "biryani").every((d) => s.has(d.id)) },
  { id: "handloom", name: "Handloom Hero", emoji: "🧵", text: "Stamp 5 handlooms.", test: (s) => count(s, (e) => e.tab === "handloom") >= 5 },
  { id: "craft", name: "Craft Collector", emoji: "🎎", text: "Stamp 5 crafts.", test: (s) => count(s, (e) => e.tab === "craft") >= 5 },
  { id: "sweet", name: "Sweet Tooth", emoji: "🍬", text: "Stamp 5 sweets.", test: (s) => count(s, (e) => e.group === "sweets") >= 5 },
  { id: "spice", name: "Spice Warrior", emoji: "🌶️", text: "Stamp 4 hot and spicy dishes.", test: (s) => count(s, (e) => e.group === "spicy") >= 4 },
  { id: "coastal", name: "Coastal Gourmand", emoji: "🐟", text: "Stamp both coastal seafood dishes.", test: (s) => count(s, (e) => e.group === "coastal") >= 2 },
  { id: "gi", name: "GI Gatherer", emoji: "🏅", text: "Stamp 5 GI-tagged items.", test: (s) => count(s, (e) => e.gi) >= 5 },
  { id: "ten", name: "Trailblazer", emoji: "🚩", text: "Collect 10 stamps.", test: (s) => count(s, () => true) >= 10 },
  { id: "twenty-five", name: "Heritage Champion", emoji: "🏆", text: "Collect 25 stamps.", test: (s) => count(s, () => true) >= 25 },
  { id: "all", name: "Full Passport", emoji: "🌟", text: "Collect every stamp.", test: (s) => count(s, () => true) === PASSPORT.length },
];

export const earnedBadges = (ids) => {
  const s = new Set(ids);
  return BADGES.filter((b) => b.test(s)).map((b) => b.id);
};
