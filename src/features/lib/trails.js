import { FAMOUS_PLACES, SHOPS_MARKETS } from "../../data/data";
import { TRAILS } from "../data/trails";
import { districtByName } from "./districts";

/** Looks up each stop of a trail in the app's own data so it carries its area, icon and description. */
export function resolveTrail(trail) {
  const stops = trail.stops.map((s) => {
    const d = districtByName(s.district);
    const list = (s.type === "shop" ? SHOPS_MARKETS : FAMOUS_PLACES)[d?.state]?.[s.district] ?? [];
    const hit = list.find((x) => x.name === s.name);
    return { ...s, state: d?.state, found: Boolean(hit), area: hit?.area ?? `${s.name}, ${s.district}`, icon: hit?.icon ?? "📍", desc: hit?.desc ?? "", kind: hit?.type ?? "" };
  });
  return { ...trail, stops };
}

export const RESOLVED_TRAILS = TRAILS.map(resolveTrail);

/** Groups consecutive stops in the same district into one map point (pins are at district level). */
export function trailRoutePoints(trail) {
  const points = [];
  for (const s of trail.stops) {
    const d = districtByName(s.district);
    if (!d?.ll) continue;
    const last = points[points.length - 1];
    if (last && last.district === s.district) {
      last.names.push(s.name);
    } else {
      points.push({ district: s.district, ll: d.ll, names: [s.name], firstArea: s.area });
    }
  }
  return points;
}
