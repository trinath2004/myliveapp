import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { HERITAGE_SEED } from "../data/heritageData";
import { read, write } from "../services/storage";

// "My Cultural Trail": heritage items a visitor saves to plan a journey. No account is needed;
// the list is kept in this browser only.
const TrailContext = createContext(null);
const KEY = "trail";

export function TrailProvider({ children }) {
  const [ids, setIds] = useState(() => read(KEY, []).filter((id) => HERITAGE_SEED.some((i) => i.id === id)));

  const toggle = useCallback((id) => {
    setIds((cur) => {
      const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
      write(KEY, next);
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setIds([]);
    write(KEY, []);
  }, []);

  const value = useMemo(
    () => ({
      ids,
      items: ids.map((id) => HERITAGE_SEED.find((i) => i.id === id)).filter(Boolean),
      isSaved: (id) => ids.includes(id),
      toggle,
      clear,
    }),
    [ids, toggle, clear]
  );
  return <TrailContext.Provider value={value}>{children}</TrailContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTrail = () => useContext(TrailContext);
