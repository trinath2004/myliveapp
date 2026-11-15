import { DATA } from "../data";
import Logo from "./Logo";
import Feedback from "./Feedback";

export default function Home({ state, district, onState, onDistrict, onEnter }) {
  return (
    <section className="home">
      {/* animated background layers */}
      <div className="bg-orb bg-orb1" aria-hidden="true" />
      <div className="bg-orb bg-orb2" aria-hidden="true" />
      <div className="bg-orb bg-orb3" aria-hidden="true" />
      <div className="bg-grid" aria-hidden="true" />
      <div className="bg-float" aria-hidden="true">
        <span>🍛</span><span>🛍️</span><span>📍</span><span>🍽️</span><span>🛕</span><span>☕</span>
      </div>

      <div className="home-inner">
        <Logo />

        <div className="panel">
          <h1>Famous Places Finder</h1>
          <small className="byline">BY Trinath Bysani</small>
          <p>Pick a state and district to explore famous restaurants, ratings and locations.</p>

          <label>State</label>
          <select value={state} onChange={(e) => onState(e.target.value)}>
            {Object.keys(DATA).map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          <label>District</label>
          <select value={district} onChange={(e) => onDistrict(e.target.value)}>
            {Object.keys(DATA[state]).map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>

          <button className="btn" onClick={onEnter}>Enter</button>
        </div>

        <Feedback />

        <footer className="home-footer">
          © {new Date().getFullYear()} MTS · Famous Places Finder · BY Trinath Bysani
        </footer>
      </div>
    </section>
  );
}
