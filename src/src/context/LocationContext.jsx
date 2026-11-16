import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { DATA } from "../data/data";

// The selected state + district is shared by the Explore page and the Heritage Hub.
const LocationContext = createContext(null);

export function LocationProvider({ children }) {
  const firstState = Object.keys(DATA)[0];
  const [state, setStateRaw] = useState(firstState);
  const [district, setDistrict] = useState(Object.keys(DATA[firstState])[0]);

  const setState = useCallback((s) => {
    setStateRaw(s);
    setDistrict(Object.keys(DATA[s])[0]); // reset district when state changes
  }, []);

  const value = useMemo(() => ({ state, district, setState, setDistrict }), [state, district, setState]);
  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLocationSelection = () => useContext(LocationContext);
