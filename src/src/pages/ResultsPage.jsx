import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { DATA } from "../data/data";
import { getPlaces, getRestaurants } from "../data/catalog";
import { useLocationSelection } from "../context/LocationContext";
import ShopCard from "../components/ShopCard";
import RestaurantCard from "../components/RestaurantCard";

const TABS = [
  { id: "restaurants", label: "🍽️ Restaurants" },
  { id: "places", label: "🏞️ Famous Places" },
  { id: "shops", label: "🛍️ Shops & Markets" },
];

export default function ResultsPage() {
  const { state, district, setState, setDistrict } = useLocationSelection();
  const [tab, setTab] = useState("restaurants");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("rating");

  const restaurants = useMemo(() => getRestaurants(state, district), [state, district]);
  const { famous, shops } = useMemo(() => getPlaces(state, district), [state, district]);

  const q = query.trim().toLowerCase();
  const match = (text) => !q || text.toLowerCase().includes(q);

  const visibleRestaurants = restaurants
    .filter((x) => match(`${x.name} ${x.cuisine} ${x.dish}`))
    .sort((a, b) =>
      sort === "name"
        ? a.name.localeCompare(b.name)
        : (b.rating ?? -1) - (a.rating ?? -1)
    );
  const visibleFamous = famous.filter((x) => match(`${x.name} ${x.type} ${x.desc}`));
  const visibleShops = shops.filter((x) => match(`${x.name} ${x.type} ${x.desc}`));

  const rated = restaurants.filter((x) => typeof x.rating === "number");
  const avg = rated.length ? (rated.reduce((s, x) => s + x.rating, 0) / rated.length).toFixed(1) : "-";
  const counts = { restaurants: restaurants.length, places: famous.length, shops: shops.length };
  const current =
    tab === "restaurants" ? visibleRestaurants : tab === "places" ? visibleFamous : visibleShops;

  const mapsQuery = encodeURIComponent(
    `${tab === "restaurants" ? "restaurants" : tab === "places" ? "tourist places" : "markets"} in ${district}, ${state}`
  );

  return (
    <div className="results">
      <header>
        <div className="brand">
          <h2>Famous Places Finder</h2>
          <small className="byline">BY Trinath Bysani</small>
        </div>
        <select value={state} onChange={(e) => setState(e.target.value)}>
          {Object.keys(DATA).map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <select value={district} onChange={(e) => setDistrict(e.target.value)}>
          {Object.keys(DATA[state]).map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
      </header>

      <section className="hero">
        <p className="hero-kicker">{state}</p>
        <h1>{district}</h1>
        <p className="hero-sub">Famous restaurants, places and markets in this district</p>
        <Link className="hub-link inline" to={`/heritage?state=${encodeURIComponent(state)}&district=${encodeURIComponent(district)}`}>🧵 See {district}'s famous foods, handlooms &amp; crafts →</Link>
        <div className="stats">
          <div><strong>{counts.restaurants}</strong><span>Restaurants</span></div>
          <div><strong>{counts.places}</strong><span>Famous places</span></div>
          <div><strong>{counts.shops}</strong><span>Shops &amp; markets</span></div>
          <div><strong>{avg}{avg !== "-" && " ★"}</strong><span>Avg. rating</span></div>
        </div>
      </section>

      <main>
        <div className="tabs">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={tab === t.id ? "tab active" : "tab"}
              onClick={() => setTab(t.id)}
            >
              {t.label} <span className="tab-count">{counts[t.id]}</span>
            </button>
          ))}
        </div>

        <div className="toolbar">
          <input
            className="search"
            type="search"
            placeholder="Search by name, cuisine, dish or type..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {tab === "restaurants" && (
            <select className="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="rating">Top rated first</option>
              <option value="name">A to Z</option>
            </select>
          )}
        </div>

        {current.length === 0 && (
          <p className="empty">
            {q ? "No results match your search." : "Nothing listed here yet for this district."}
          </p>
        )}

        <div className="grid">
          {tab === "restaurants" &&
            visibleRestaurants.map((r) => (
              <RestaurantCard key={r.name + r.area} restaurant={r} district={district} />
            ))}
          {tab !== "restaurants" &&
            current.map((s) => <ShopCard key={s.name} shop={s} />)}
        </div>

        <a
          className="more-maps"
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
        >
          🔎 See more in {district} on Google Maps
        </a>

        {tab === "restaurants" && (
          <p className="note">
            Ratings are approximate (out of 5). "Local favourite" means a well-known local food spot
            without a rating. Tap "Open in Maps" for live ratings and reviews.
          </p>
        )}
      </main>

      <footer className="site-footer">© {new Date().getFullYear()} MTS · BY Trinath Bysani</footer>
    </div>
  );
}
