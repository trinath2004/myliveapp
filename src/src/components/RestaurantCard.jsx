import { useState } from "react";

function Stars({ rating }) {
  const full = Math.round(rating);
  return (
    <span className="stars" aria-label={`${rating} out of 5`}>
      {"★".repeat(full)}
      <span className="stars-off">{"★".repeat(5 - full)}</span>
    </span>
  );
}

export default function RestaurantCard({ restaurant, district }) {
  const [showMap, setShowMap] = useState(false);
  const place = `${restaurant.name}, ${restaurant.area}, ${district}`;
  const q = encodeURIComponent(place);
  const hasRating = typeof restaurant.rating === "number";

  return (
    <article className="card">
      <div className="thumb">🍽️</div>
      <div className="body">
        <div className="rating-row">
          <span className="tag">{restaurant.cuisine}</span>
          {hasRating ? (
            <span className="rating">
              <Stars rating={restaurant.rating} /> {restaurant.rating.toFixed(1)}
            </span>
          ) : (
            <span className="rating local">Local favourite</span>
          )}
        </div>
        <h3>{restaurant.name}</h3>
        <p className="desc">Famous for: {restaurant.dish}</p>
        <p className="addr">📍 {restaurant.area}</p>
        <div className="actions">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.google.com/maps/search/?api=1&query=${q}`}
          >
            Open in Maps
          </a>
          <button onClick={() => setShowMap(!showMap)}>
            {showMap ? "Hide map" : "Show map"}
          </button>
        </div>
      </div>
      {showMap && (
        <iframe
          title={restaurant.name}
          loading="lazy"
          src={`https://www.google.com/maps?q=${q}&output=embed`}
        />
      )}
    </article>
  );
}
