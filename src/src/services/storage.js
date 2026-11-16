// Tiny namespaced localStorage wrapper with change notifications.
// Every service goes through this file, so swapping in a real backend later
// only means re-implementing the services, not the UI.

const NS = "mts:";
const listeners = new Map(); // key -> Set<fn>

export function read(key, fallback) {
  try {
    const raw = localStorage.getItem(NS + key);
    return raw == null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function write(key, value) {
  try {
    localStorage.setItem(NS + key, JSON.stringify(value));
  } catch {
    /* storage full or unavailable - app keeps working in memory-only fashion */
  }
  listeners.get(key)?.forEach((fn) => fn());
}

export function remove(key) {
  try {
    localStorage.removeItem(NS + key);
  } catch {
    /* ignore */
  }
  listeners.get(key)?.forEach((fn) => fn());
}

/** Subscribe to changes of a key (same tab + other tabs). Returns an unsubscribe fn. */
export function subscribe(key, fn) {
  if (!listeners.has(key)) listeners.set(key, new Set());
  listeners.get(key).add(fn);
  const onStorage = (e) => e.key === NS + key && fn();
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.get(key)?.delete(fn);
    window.removeEventListener("storage", onStorage);
  };
}

export const uid = (prefix = "id") =>
  `${prefix}_${(globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2) + Date.now().toString(36)).slice(0, 12)}`;

export async function sha256(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}
