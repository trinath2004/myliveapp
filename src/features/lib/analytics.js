// Simple, privacy-friendly visitor analytics.
// - No cookies and no personal details. Each device gets a random id (kept in localStorage) so that
//   "unique visitors" can be counted. The id is never linked to a name, e-mail or location.
// - Respects the browser's "Do Not Track" setting: nothing is sent to the database if it is on.
// - Counts are always kept on this device too, so the stats page works without a database.
import { read, uid, write } from "../../services/storage";
import { ONLINE, rpc } from "./supabase";

const VISITOR_KEY = "visitor";
const LOCAL_KEY = "visits";
const KEEP_DAYS = 90;

export function visitorId() {
  let id = read(VISITOR_KEY, null);
  if (!id) {
    id = uid("v") + uid("x");
    write(VISITOR_KEY, id);
  }
  return id;
}

const today = () => new Date().toISOString().slice(0, 10);
const doNotTrack = () => typeof navigator !== "undefined" && (navigator.doNotTrack === "1" || window.doNotTrack === "1");

let lastPath = "";

/** Call once per page view. `path` is the route path without the query string. */
export function trackPageView(path, lang = "en") {
  if (!path || path === lastPath) return;
  lastPath = path;

  const log = read(LOCAL_KEY, {});
  const day = today();
  log[day] = log[day] || {};
  log[day][path] = (log[day][path] || 0) + 1;
  const keep = Object.keys(log).sort().slice(-KEEP_DAYS);
  write(LOCAL_KEY, Object.fromEntries(keep.map((k) => [k, log[k]])));

  if (ONLINE && !doNotTrack()) {
    rpc("track_visit", { p_path: path.slice(0, 120), p_visitor: visitorId(), p_lang: lang }).catch(() => {});
  }
}

/** Page views kept on this device, newest day first. */
export function localStats() {
  const log = read(LOCAL_KEY, {});
  const days = Object.keys(log).sort().reverse().map((day) => ({ day, views: Object.values(log[day]).reduce((a, b) => a + b, 0) }));
  const pages = {};
  for (const d of Object.values(log)) for (const [p, n] of Object.entries(d)) pages[p] = (pages[p] || 0) + n;
  return {
    days,
    pages: Object.entries(pages).map(([path, views]) => ({ path, views })).sort((a, b) => b.views - a.views).slice(0, 15),
    totalViews: days.reduce((a, b) => a + b.views, 0),
  };
}

/** Totals for all visitors (needs the database). Returns null when it is not set up. */
export async function remoteStats(days = 30) {
  if (!ONLINE) return null;
  return rpc("visit_stats", { p_days: days });
}

export { ONLINE as ANALYTICS_ONLINE };
