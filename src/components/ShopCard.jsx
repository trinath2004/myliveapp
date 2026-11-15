import { useState } from "react";

export default function ShopCard({ shop }) {
  const [showMap, setShowMap] = useState(false);
  const q = encodeURIComponent(shop.area);

  return (
    <article className="card">
      <div className="thumb">{shop.icon}</div>
      <div className="body">
        <span className="tag">{shop.type}</span>
        <h3>{shop.name}</h3>
        <p className="desc">{shop.desc}</p>
        <p className="addr">📍 {shop.area}</p>
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
          title={shop.name}
          loading="lazy"
          src={`https://www.google.com/maps?q=${q}&output=embed`}
        />
      )}
    </article>
  );
}