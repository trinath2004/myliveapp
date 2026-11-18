import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../../App";
import { HERITAGE_SEED } from "../../data/heritageData";
import { DISHES } from "../data/dishes";
import { FESTIVALS } from "../data/festivals";
import { HERITAGE_COORDS } from "../data/heritageCoords";
import { TRAILS } from "../data/trails";
import { STATE_TE } from "../data/districtMeta";
import { ALL_DISTRICTS, closestDistrict, dedupe, districtBySlug, districtByName, getProfile, nearbyDistricts } from "../lib/districts";
import { buildItinerary, moveStop, moveStopToDay, removeStop, allocateDays } from "../lib/itinerary";
import { BADGES, PASSPORT, earnedBadges } from "../lib/passport";
import { recommend } from "../lib/quiz";
import { search } from "../lib/searchIndex";
import { RESOLVED_TRAILS } from "../lib/trails";

const go = (hash) => {
  window.location.hash = hash;
  return render(<App />);
};

beforeEach(() => localStorage.clear());

describe("data integrity", () => {
  it("every district has coordinates inside the two states, a Telugu name and a unique slug", () => {
    expect(ALL_DISTRICTS).toHaveLength(61);
    const slugs = new Set();
    for (const d of ALL_DISTRICTS) {
      expect(d.ll, d.district).toBeTruthy();
      expect(d.ll[0]).toBeGreaterThan(12);
      expect(d.ll[0]).toBeLessThan(20);
      expect(d.ll[1]).toBeGreaterThan(76);
      expect(d.ll[1]).toBeLessThan(85);
      expect(d.te, d.district).not.toBe(d.district);
      expect(d.knownFor.length, d.district).toBeGreaterThan(10);
      slugs.add(d.slug);
    }
    expect(slugs.size).toBe(61);
    expect(Object.keys(STATE_TE)).toHaveLength(2);
  });

  it("every heritage item has map coordinates", () => {
    for (const h of HERITAGE_SEED) expect(HERITAGE_COORDS[h.id], h.id).toBeTruthy();
    for (const id of Object.keys(HERITAGE_COORDS)) expect(HERITAGE_SEED.some((h) => h.id === id), id).toBe(true);
  });

  it("festival, dish and trail references all point at real things", () => {
    for (const f of FESTIVALS) {
      expect(f.months.every((m) => m >= 1 && m <= 12)).toBe(true);
      f.districts.forEach((d) => expect(districtByName(d), `${f.id}: ${d}`).toBeTruthy());
    }
    for (const d of DISHES) {
      d.where.forEach((w) => expect(districtByName(w), `${d.id}: ${w}`).toBeTruthy());
      if (d.heritageId) expect(HERITAGE_SEED.some((h) => h.id === d.heritageId), d.id).toBe(true);
    }
    for (const t of RESOLVED_TRAILS) {
      t.stops.forEach((s) => expect(s.found, `${t.id}: ${s.name} (${s.district})`).toBe(true));
    }
    for (const t of TRAILS) t.items.forEach((id) => expect(HERITAGE_SEED.some((h) => h.id === id), `${t.id}: ${id}`).toBe(true));
  });
});

describe("districts", () => {
  it("builds a profile and finds neighbours and the closest district", () => {
    const p = getProfile("Telangana", "Hyderabad");
    expect(p.restaurants.length).toBeGreaterThan(0);
    expect(p.heritage.length).toBeGreaterThan(0);
    expect(nearbyDistricts("Hyderabad", 3)).toHaveLength(3);
    expect(closestDistrict([13.65, 79.42]).district).toBe("Tirupati");
    expect(districtBySlug("dr-b-r-ambedkar-konaseema").district).toBe("Dr. B.R. Ambedkar Konaseema");
  });

  it("hides near-duplicate listings", () => {
    const out = dedupe([{ name: "Annavaram Satyanarayana Temple" }, { name: "Annavaram Satyanarayana Swamy Temple" }, { name: "Simhachalam Temple" }]);
    expect(out.map((x) => x.name)).toEqual(["Annavaram Satyanarayana Temple", "Simhachalam Temple"]);
  });
});

describe("itinerary", () => {
  it("builds the asked number of days with morning, lunch and afternoon stops and no repeats", () => {
    const plan = buildItinerary({ districts: ["Tirupati", "Chittoor", "Annamayya"], days: 4, pace: "standard" });
    expect(plan).toHaveLength(4);
    const titles = plan.flatMap((d) => d.stops.map((s) => `${s.district}|${s.title}`));
    expect(new Set(titles).size).toBe(titles.length);
    expect(plan[0].stops.map((s) => s.slot)).toEqual(["morning", "lunch", "afternoon"]);
    plan.forEach((d) => d.stops.forEach((s) => expect(s.query).toBeTruthy()));
  });

  it("groups districts into days when there are more districts than days", () => {
    const plan = buildItinerary({ districts: ["Tirupati", "Chittoor", "Annamayya", "Kurnool"], days: 2 });
    expect(plan).toHaveLength(2);
    expect(new Set(plan.flatMap((d) => d.districts.map((x) => x.district))).size).toBe(4);
  });

  it("gives richer districts the extra days and never more than 4 each", () => {
    const counts = allocateDays([10, 100], 6);
    expect(counts.reduce((a, b) => a + b, 0)).toBe(6);
    expect(Math.max(...counts)).toBeLessThanOrEqual(4);
  });

  it("full-day pace has five stops and editing helpers return new plans", () => {
    const plan = buildItinerary({ districts: ["Hyderabad"], days: 2, pace: "full" });
    expect(plan[0].stops).toHaveLength(5);
    const moved = moveStop(plan, 0, 0, 1);
    expect(moved[0].stops[1].id).toBe(plan[0].stops[0].id);
    expect(plan[0].stops[0].id).not.toBe(moved[0].stops[0].id);
    const to = moveStopToDay(plan, 0, 0, 1);
    expect(to[1].stops).toHaveLength(plan[1].stops.length + 1);
    expect(removeStop(plan, 0, 0)[0].stops).toHaveLength(4);
  });

  it("ignores unknown districts", () => {
    expect(buildItinerary({ districts: ["Atlantis"], days: 2 })).toEqual([]);
  });
});

describe("search", () => {
  it("finds items across categories", () => {
    expect(search("biryani").length).toBeGreaterThan(3);
    expect(search("pochampally").some((r) => r.type === "heritage")).toBe(true);
    expect(search("tirupati")[0].type).toBe("district");
    expect(search("zzzzqqq")).toEqual([]);
  });

  it("understands Telugu words and district names", () => {
    expect(search("బిర్యానీ").length).toBeGreaterThan(3);
    expect(search("తిరుపతి").some((r) => r.label === "Tirupati")).toBe(true);
  });
});

describe("quiz, passport", () => {
  it("quiz respects a vegetarian answer", () => {
    const r = recommend({ diet: "veg", spice: "medium", sweet: "no", mood: "comfort" }, "Hyderabad");
    expect(r.dishes.length).toBeGreaterThan(0);
    expect(r.dishes.every((d) => d.veg)).toBe(true);
    expect(r.dishes.every((d) => !d.sweet)).toBe(true);
    expect(r.restaurants.length).toBeGreaterThan(0);
  });

  it("quiz prefers hot non-veg food for a hot answer", () => {
    const r = recommend({ diet: "nonveg", spice: "hot", sweet: "no", mood: "adventure" }, "Guntur");
    expect(r.dishes[0].spice).toBe(3);
    expect(r.dishes[0].veg).toBe(false);
  });

  it("passport has unique ids and awards badges", () => {
    expect(new Set(PASSPORT.map((e) => e.id)).size).toBe(PASSPORT.length);
    expect(PASSPORT.length).toBeGreaterThan(50);
    expect(earnedBadges([])).toEqual([]);
    const biryani = DISHES.filter((d) => d.group === "biryani").map((d) => d.id);
    expect(earnedBadges(biryani)).toContain("biryani");
    const handlooms = PASSPORT.filter((e) => e.tab === "handloom").slice(0, 5).map((e) => e.id);
    expect(earnedBadges(handlooms)).toContain("handloom");
    expect(earnedBadges(PASSPORT.map((e) => e.id))).toHaveLength(BADGES.length);
  });
});

describe("new pages render", () => {
  it("shows the More menu and opens search with Ctrl+K", async () => {
    go("#/");
    await screen.findAllByText(/MTS/);
    fireEvent.click(screen.getByRole("button", { name: /More/ }));
    expect(screen.getByRole("menuitem", { name: /Trip Planner/ })).toBeTruthy();
    fireEvent.keyDown(window, { key: "k", ctrlKey: true });
    expect(await screen.findByRole("combobox", { name: "Search" })).toBeTruthy();
  });

  it("builds a trip from the URL", async () => {
    go("#/trip?districts=Tirupati,Chittoor&days=2");
    expect(await screen.findByRole("heading", { name: /Day 1/ })).toBeTruthy();
    expect(screen.getByRole("heading", { name: /Day 2/ })).toBeTruthy();
  });

  it("opens a district guide and its print sheet", async () => {
    const a = go("#/district/tirupati");
    expect(await screen.findByRole("heading", { level: 1, name: "Tirupati" })).toBeTruthy();
    a.unmount();
    go("#/district/tirupati/print");
    expect(await screen.findByLabelText(/A4 guide/)).toBeTruthy();
  });

  it("redirects an unknown district to the index", async () => {
    go("#/district/nowhere");
    expect(await screen.findByRole("heading", { name: /District Guides/ })).toBeTruthy();
  });

  it.each([
    ["#/districts", /District Guides/],
    ["#/festivals", /Festival & Season Calendar/],
    ["#/trails", /Curated Trails/],
    ["#/insights", /Insights Dashboard/],
    ["#/quiz", /What should I eat/],
    ["#/passport", /Food Passport/],
    ["#/compare", /Compare Districts/],
    ["#/near-me", /Near Me/],
    ["#/suggest", /Suggest a place/],
    ["#/about", /About MTS/],
    ["#/credits", /Credits/],
    ["#/privacy", /Privacy/],
    ["#/contact", /Contact/],
    ["#/stats", /Visitor numbers/],
  ])("renders %s", async (hash, heading) => {
    go(hash);
    expect(await screen.findByRole("heading", { level: 1, name: heading })).toBeTruthy();
  });

  it("stamps a passport entry and keeps it", async () => {
    go("#/passport");
    const buttons = await screen.findAllByRole("button", { name: /Stamp it/ });
    fireEvent.click(buttons[0]);
    expect(await screen.findByText(/✓ Stamped/)).toBeTruthy();
    expect(JSON.parse(localStorage.getItem("mts:passport"))).toHaveLength(1);
  });

  it("switches to Telugu and back", async () => {
    go("#/");
    await screen.findAllByText(/MTS/);
    fireEvent.click(screen.getByRole("button", { name: /Switch to Telugu/ }));
    expect(await screen.findByRole("button", { name: /మరిన్ని/ })).toBeTruthy();
    expect(document.documentElement.lang).toBe("te");
    fireEvent.click(screen.getByRole("button", { name: /Switch to English/ }));
    expect(document.documentElement.lang).toBe("en");
  });

  it("the original main pages still have no forbidden wording after the additions", async () => {
    for (const hash of ["#/", "#/explore", "#/heritage", "#/trail"]) {
      const { unmount } = go(hash);
      await screen.findAllByText(/MTS/);
      for (const bad of [/sign in/i, /log ?in/i, /\bcart\b/i, /\borders?\b/i, /\badmin\b/i, /₹/, /in stock/i]) {
        expect(document.body.textContent, `${hash} ${bad}`).not.toMatch(bad);
      }
      unmount();
    }
  });
});
