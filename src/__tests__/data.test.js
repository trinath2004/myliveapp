import { describe, it, expect } from "vitest";
import { CATEGORIES, HERITAGE_SEED } from "../data/heritageData";
import { DATA } from "../data/data";
import { itemMapQuery, mapsRouteUrl, mapsSearchUrl, mapsEmbedUrl, whatsappUrl } from "../utils/maps";

describe("heritage catalogue", () => {
  it("has unique ids and every required field", () => {
    const ids = new Set();
    for (const i of HERITAGE_SEED) {
      expect(ids.has(i.id), `duplicate id ${i.id}`).toBe(false);
      ids.add(i.id);
      for (const k of ["name", "state", "district", "origin", "emoji", "tagline", "history"]) expect(i[k], `${i.id}.${k}`).toBeTruthy();
      expect(CATEGORIES.some((c) => c.id === i.category), i.id).toBe(true);
      expect(i.hue).toHaveLength(2);
      expect(i.artisan.group && i.artisan.story, i.id).toBeTruthy();
      expect(Array.isArray(i.tags)).toBe(true);
    }
  });

  it("is information only: no prices, stock or availability anywhere", () => {
    for (const i of HERITAGE_SEED) {
      for (const k of ["price", "unit", "stock", "availability"]) expect(k in i, `${i.id} has ${k}`).toBe(false);
    }
  });

  it("only uses districts that exist in the Explore data, so the cross-link always works", () => {
    for (const i of HERITAGE_SEED) expect(DATA[i.state]?.[i.district], `${i.id}: ${i.state} / ${i.district}`).toBeDefined();
  });
});

describe("maps helpers", () => {
  const pearls = HERITAGE_SEED.find((i) => i.id === "h-pearls");
  it("builds the search text from origin, district and state", () => {
    expect(itemMapQuery({ origin: "Pochampally", district: "Yadadri Bhuvanagiri", state: "Telangana" })).toBe("Pochampally, Yadadri Bhuvanagiri, Telangana");
    expect(itemMapQuery(pearls)).toMatch(/^Charminar, Hyderabad, Telangana$/); // "A / B" origins use the first part
    expect(itemMapQuery({ mapQuery: "Custom place", origin: "x" })).toBe("Custom place");
  });
  it("makes valid Google Maps links", () => {
    expect(mapsSearchUrl("A b, C")).toBe("https://www.google.com/maps/search/?api=1&query=A%20b%2C%20C");
    expect(mapsEmbedUrl("A")).toContain("output=embed");
    expect(whatsappUrl("hi there")).toBe("https://wa.me/?text=hi%20there");
  });
  it("builds a multi-stop route", () => {
    expect(mapsRouteUrl([])).toBeNull();
    expect(mapsRouteUrl(["A"])).toContain("search");
    const url = mapsRouteUrl(["A", "B", "C", "D"]);
    expect(url).toContain("origin=A");
    expect(url).toContain("destination=D");
    expect(decodeURIComponent(url)).toContain("waypoints=B|C");
    const many = mapsRouteUrl(Array.from({ length: 20 }, (_, n) => `S${n}`));
    expect(decodeURIComponent(many).match(/\|/g)).toHaveLength(8); // 9 waypoints max
  });
});
