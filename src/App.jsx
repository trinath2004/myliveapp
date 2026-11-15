import { useState } from "react";
import Home from "./components/Home";
import Results from "./components/Results";
import { DATA } from "./data";

export default function App() {
  const firstState = Object.keys(DATA)[0];
  const [state, setState] = useState(firstState);
  const [district, setDistrict] = useState(Object.keys(DATA[firstState])[0]);
  const [page, setPage] = useState("home");

  const changeState = (s) => {
    setState(s);
    setDistrict(Object.keys(DATA[s])[0]); // reset district when state changes
  };

  return page === "home" ? (
    <Home
      state={state}
      district={district}
      onState={changeState}
      onDistrict={setDistrict}
      onEnter={() => setPage("results")}
    />
  ) : (
    <Results
      state={state}
      district={district}
      onState={changeState}
      onDistrict={setDistrict}
      onBack={() => setPage("home")}
    />
  );
}