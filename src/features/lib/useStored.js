import { useCallback, useMemo, useSyncExternalStore } from "react";
import { subscribe, write } from "../../services/storage";

const NS = "mts:";

/**
 * React hook over the app's existing namespaced localStorage helper (services/storage.js).
 * `fallback` must be a stable value (a module constant) so the returned value stays stable.
 */
export function useStored(key, fallback) {
  const raw = useSyncExternalStore(
    (cb) => subscribe(key, cb),
    () => {
      try {
        return localStorage.getItem(NS + key);
      } catch {
        return null;
      }
    },
    () => null
  );
  const value = useMemo(() => {
    try {
      return raw == null ? fallback : JSON.parse(raw);
    } catch {
      return fallback;
    }
  }, [raw, fallback]);
  const set = useCallback((next) => write(key, typeof next === "function" ? next(value) : next), [key, value]);
  return [value, set];
}
