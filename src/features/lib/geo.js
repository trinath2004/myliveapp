// Small geography helpers. Distances are straight-line (as the crow flies), not road distances.

const R = 6371;
const rad = (d) => (d * Math.PI) / 180;

export function haversineKm([lat1, lng1], [lat2, lng2]) {
  const dLat = rad(lat2 - lat1);
  const dLng = rad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

/** Order points greedily: start with the first, then always go to the nearest unvisited one. */
export function nearestNeighbourOrder(items, getLL) {
  if (items.length <= 2) return [...items];
  const left = [...items];
  const out = [left.shift()];
  while (left.length) {
    const last = getLL(out[out.length - 1]);
    let best = 0;
    let bestD = Infinity;
    left.forEach((it, i) => {
      const d = haversineKm(last, getLL(it));
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    out.push(left.splice(best, 1)[0]);
  }
  return out;
}
