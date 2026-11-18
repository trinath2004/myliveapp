import { HERITAGE_SEED } from "../../data/heritageData";
import { itemMapQuery, mapsSearchUrl } from "../../utils/maps";
import { HERITAGE_COORDS } from "../data/heritageCoords";
import { districtByName } from "./districts";

/** Heritage items as map pins (approximate origin coordinates; falls back to the district HQ). */
export function heritagePins(filter = () => true) {
  return HERITAGE_SEED.filter(filter).map((h) => ({
    id: h.id,
    name: h.name,
    emoji: h.emoji,
    category: h.category,
    gi: h.gi,
    district: h.district,
    state: h.state,
    origin: h.origin,
    ll: HERITAGE_COORDS[h.id] ?? districtByName(h.district)?.ll ?? [16.3, 79.7],
    mapsUrl: mapsSearchUrl(itemMapQuery(h)),
  }));
}
