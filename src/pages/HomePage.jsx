import { Link, useNavigate } from "react-router-dom";
import { DATA } from "../data/data";
import { useLocationSelection } from "../context/LocationContext";
import Logo from "../components/Logo";
import Feedback from "../components/Feedback";
import FeaturedHeritage from "../components/FeaturedHeritage";

export default function HomePage() {
  const { state, district, setState, setDistrict } = useLocationSelection();
  const navigate = useNavigate();
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
          <select value={state} onChange={(e) => setState(e.target.value)}>
            {Object.keys(DATA).map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          <label>District</label>
          <select value={district} onChange={(e) => setDistrict(e.target.value)}>
            {Object.keys(DATA[state]).map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>

          <button className="btn" onClick={() => navigate("/explore")}>Enter</button>
          <Link className="hub-link" to={`/heritage?state=${encodeURIComponent(state)}&district=${encodeURIComponent(district)}`}>
            🧵 Discover famous foods, handlooms &amp; crafts of {district} →
          </Link>
        </div>

        <FeaturedHeritage />

        <Feedback />

        <footer className="home-footer">
          © {new Date().getFullYear()} MTS · Famous Places Finder · BY Trinath Bysani
        </footer>
      </div>
    </section>
  );
}
