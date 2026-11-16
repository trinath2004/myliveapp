// Google Maps / sharing helpers. All links are plain URLs: no API key and no account needed.

/** Search text for a heritage item's place of origin, e.g. "Pochampally, Yadadri Bhuvanagiri, Telangana". */
export function itemMapQuery(item) {
  if (item.mapQuery) return item.mapQuery;
  const origin = String(item.origin || "").split(" / ")[0].trim();
  return [origin, item.district, item.state].filter(Boolean).join(", ");
}

export const mapsSearchUrl = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
export const mapsEmbedUrl = (q) => `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;

/** Multi-stop route (Google Maps allows an origin, a destination and up to 9 waypoints). */
export function mapsRouteUrl(queries) {
  const stops = queries.slice(0, 11);
  if (stops.length === 0) return null;
  if (stops.length === 1) return mapsSearchUrl(stops[0]);
  const enc = encodeURIComponent;
  const [origin, ...rest] = stops;
  const destination = rest.pop();
  let url = `https://www.google.com/maps/dir/?api=1&origin=${enc(origin)}&destination=${enc(destination)}`;
  if (rest.length) url += `&waypoints=${enc(rest.join("|"))}`;
  return url;
}

export const whatsappUrl = (text) => `https://wa.me/?text=${encodeURIComponent(text)}`;

/** Link that reopens a specific item in the Heritage Hub (the app uses hash routing). */
export function itemShareUrl(item, base = window.location.href.split("#")[0]) {
  return `${base}#/heritage?item=${encodeURIComponent(item.id)}`;
}

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
