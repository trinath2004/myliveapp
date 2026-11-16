import { useState } from "react";
import { mapsEmbedUrl, mapsSearchUrl } from "../utils/maps";

/**
 * The same "Open in Maps" + "Show map" pattern used on the restaurant, place and market cards.
 * With `openByDefault` the map is already showing (used at the bottom of the details window).
 */
export default function MapPanel({ query, title, openByDefault = false }) {
  const [show, setShow] = useState(openByDefault);
  return (
    <div className="map-panel">
      <div className="actions">
        <a target="_blank" rel="noopener noreferrer" href={mapsSearchUrl(query)}>Open in Maps</a>
        <button type="button" onClick={() => setShow(!show)} aria-expanded={show}>{show ? "Hide map" : "Show map"}</button>
      </div>
      {show && <iframe title={`Map: ${title}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={mapsEmbedUrl(query)} />}
    </div>
  );
}
