import { DISHES } from "../data/dishes";
import { districtByName, getProfile } from "./districts";

// "What should I eat?" - plain rule-based matching. No AI. Every rule is visible below.

const NONVEG = /chicken|mutton|fish|prawn|seafood|biryani|non-veg|non veg|kebab|egg|crab|meat|haleem|kodi|natu|bbq|barbecue|grill/;
const HOT = /andhra|guntur|gongura|pepper|65|fry|kodi|pulusu|vepudu|chilli|spicy|tribal|natu/;
const MILD = /sweet|bakery|cafe|ice|juice|dessert|idli|tiffin|curd|buffet/;
const SWEET = /sweet|bakery|kaja|laddu|dessert|ice|meetha|halwa/;
const MOOD_WORDS = {
  comfort: /meals|tiffin|home|idli/,
  adventure: /tribal|seafood|street|bamboo|natu|pulusu|gongura|bbq/,
  celebrate: /biryani|buffet|barbecue|bbq|sweet|multi/,
  quick: /tiffin|snack|cafe|street|fast|bakery|juice/,
};

export function classifyRestaurant(r) {
  const text = `${r.cuisine} ${r.dish}`.toLowerCase();
  const nonveg = NONVEG.test(text);
  return {
    veg: !nonveg,
    nonveg,
    spice: HOT.test(text) ? 3 : MILD.test(text) ? 1 : 2,
    sweet: SWEET.test(text),
    moods: Object.entries(MOOD_WORDS).filter(([, re]) => re.test(text)).map(([m]) => m),
  };
}

const wantedSpice = { mild: 1, medium: 2, hot: 3 };

function dishScore(d, a) {
  if (a.diet === "veg" && !d.veg) return -Infinity;
  if (a.diet === "nonveg" && d.veg && d.kind !== "sweet" && d.kind !== "drink") return -Infinity;
  let s = 3 - Math.abs(d.spice - wantedSpice[a.spice]);
  if (a.sweet === "yes") s += d.sweet ? 3 : 0;
  else if (a.sweet === "no") s += d.sweet ? -4 : 0;
  else if (d.sweet) s += 1;
  if (d.moods.includes(a.mood)) s += 2;
  return s;
}

export function recommend(a, district) {
  const info = districtByName(district);
  const state = info?.state;
  const local = [];
  const elsewhere = [];
  for (const d of DISHES) {
    const score = dishScore(d, a);
    if (score === -Infinity) continue;
    const here = d.where.includes(district);
    const statewide = d.states.includes(state);
    if (here) local.push([d, score + 1.5]);
    else if (statewide) local.push([d, score]);
    else elsewhere.push([d, score]);
  }
  const top = (list, n) => list.sort((x, y) => y[1] - x[1]).slice(0, n).map(([d]) => d);

  let restaurants = [];
  if (info) {
    const p = getProfile(info.state, district);
    restaurants = p.restaurants
      .map((r) => {
        const c = classifyRestaurant(r);
        if (a.diet === "veg" && !c.veg) return null;
        const why = [];
        let s = (typeof r.rating === "number" ? r.rating - 3 : 0) * 0.5;
        if (a.diet === "nonveg") { if (c.nonveg) { s += 2; why.push("non-veg"); } else s -= 1; }
        else if (a.diet === "veg") why.push("vegetarian-friendly");
        const gap = Math.abs(c.spice - wantedSpice[a.spice]);
        s += 2 - gap;
        if (gap === 0) why.push(a.spice === "hot" ? "hot and spicy" : a.spice === "mild" ? "mild" : "medium spice");
        if (a.sweet === "yes" && c.sweet) { s += 2; why.push("sweet treats"); }
        if (a.sweet === "no" && c.sweet) s -= 2;
        if (c.moods.includes(a.mood)) { s += 2; why.push(`good for ${{ comfort: "comfort food", adventure: "something adventurous", celebrate: "a celebration", quick: "a quick bite" }[a.mood]}`); }
        return [{ ...r, why }, s];
      })
      .filter(Boolean);
  }
  return {
    dishes: top(local, 4),
    elsewhere: top(elsewhere, 3),
    restaurants: restaurants.sort((x, y) => y[1] - x[1]).slice(0, 5).map(([r]) => r),
  };
}
