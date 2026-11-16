import { Link } from "react-router-dom";
import { HERITAGE_SEED, CATEGORIES } from "../data/heritageData";
import { itemMapQuery, mapsSearchUrl } from "../utils/maps";

/** "Heritage of the day": a different specialty every day, shown on the home screen. */
function heritageOfTheDay(date = new Date()) {
  const day = Math.floor(date.getTime() / 86400000);
  return HERITAGE_SEED[day % HERITAGE_SEED.length];
}

export default function FeaturedHeritage() {
  const item = heritageOfTheDay();
  const cat = CATEGORIES.find((c) => c.id === item.category);
  return (
    <section className="featured" aria-label="Heritage of the day">
      <div className="featured-art" style={{ background: `linear-gradient(135deg, ${item.hue[0]}, ${item.hue[1]})` }} aria-hidden="true">
        <span>{item.emoji}</span>
      </div>
      <div className="featured-body">
        <p className="kicker">✨ Heritage of the day · {cat?.short}</p>
        <h2>{item.name}</h2>
        <p className="featured-tag">{item.tagline}</p>
        <p className="featured-where">📍 {item.origin}, {item.district}</p>
        <div className="featured-actions">
          <Link className="btn btn-sm" to={`/heritage?item=${encodeURIComponent(item.id)}`}>Read the story</Link>
          <a className="btn-ghost btn-sm" target="_blank" rel="noopener noreferrer" href={mapsSearchUrl(itemMapQuery(item))}>📍 Open in Maps</a>
        </div>
      </div>
    </section>
  );
}
