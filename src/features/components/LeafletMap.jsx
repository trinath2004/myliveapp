import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// A thin wrapper around Leaflet + OpenStreetMap tiles (free, no API key).
// Pins are drawn with divIcon (no image files), so there is nothing extra to bundle.

const BOUNDS = [[12.6, 76.6], [19.95, 84.9]]; // roughly Andhra Pradesh + Telangana
const STATE_COLOUR = { "Andhra Pradesh": "#6366f1", Telangana: "#ec4899" };
const CAT_COLOUR = { food: "#f59e0b", handloom: "#8b5cf6", craft: "#10b981" };

/** Builds a popup from plain DOM nodes (never from HTML strings), so text can never inject markup. */
function popup({ title, lines = [], links = [] }) {
  const root = document.createElement("div");
  root.className = "fx-popup";
  const h = document.createElement("strong");
  h.textContent = title;
  root.appendChild(h);
  lines.filter(Boolean).forEach((l) => {
    const p = document.createElement("p");
    p.textContent = l;
    root.appendChild(p);
  });
  if (links.length) {
    const row = document.createElement("div");
    row.className = "fx-popup-links";
    links.forEach((l) => {
      const a = document.createElement("a");
      a.textContent = l.text;
      a.href = l.href;
      if (l.external) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }
      row.appendChild(a);
    });
    root.appendChild(row);
  }
  return root;
}

const districtIcon = (state) =>
  L.divIcon({ className: "fx-pin", html: `<span class="fx-pin-dot" style="background:${STATE_COLOUR[state] || "#6366f1"}"></span>`, iconSize: [16, 16], iconAnchor: [8, 8], popupAnchor: [0, -8] });

const heritageIcon = (item) =>
  L.divIcon({
    className: "fx-pin",
    html: `<span class="fx-pin-badge${item.gi ? " gi" : ""}" style="border-color:${CAT_COLOUR[item.category] || "#6366f1"}">${item.emoji}</span>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -14],
  });

const numberIcon = (n) => L.divIcon({ className: "fx-pin", html: `<span class="fx-pin-num">${n}</span>`, iconSize: [26, 26], iconAnchor: [13, 13], popupAnchor: [0, -12] });

/**
 * districts : [{ name, state, slug, ll, te, knownFor }]
 * heritage  : [{ id, name, emoji, ll, category, gi, district, state, origin, mapsUrl }]
 * route     : [{ ll, label, sub, mapsUrl }]  (numbered stops joined by a line)
 * user      : [lat, lng] shown as a blue dot
 * fitKey    : change this value to re-fit the view to what is shown
 * flyTo     : { ll: [lat,lng], zoom } to move the view
 */
const NONE = [];

export default function LeafletMap({ districts = NONE, heritage = NONE, route = NONE, user = null, fitKey = "", flyTo = null, label = "Map", className = "" }) {
  const elRef = useRef(null);
  const mapRef = useRef(null);
  const layerRef = useRef(null);
  const fitRef = useRef(null);

  // create the map once
  useEffect(() => {
    const map = L.map(elRef.current, { zoomControl: false, scrollWheelZoom: true, minZoom: 5, maxZoom: 17 });
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
    }).addTo(map);
    L.control.zoom({ position: "bottomright" }).addTo(map); // keeps the filter panel clear of the zoom buttons
    map.fitBounds(BOUNDS);
    layerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => map.invalidateSize()) : null;
    ro?.observe(elRef.current);
    return () => {
      ro?.disconnect();
      map.remove();
      mapRef.current = null;
      layerRef.current = null;
    };
  }, []);

  // redraw pins whenever the data changes
  useEffect(() => {
    const map = mapRef.current;
    const group = layerRef.current;
    if (!map || !group) return;
    group.clearLayers();
    const points = [];

    districts.forEach((d) => {
      if (!d.ll) return;
      points.push(d.ll);
      L.marker(d.ll, { icon: districtIcon(d.state), title: d.name, alt: d.name })
        .bindPopup(() =>
          popup({
            title: d.name,
            lines: [d.state, d.knownFor],
            links: [
              { text: "District guide", href: `#/district/${d.slug}` },
              { text: "Plan a trip", href: `#/trip?districts=${encodeURIComponent(d.name)}&days=2` },
            ],
          })
        )
        .addTo(group);
    });

    heritage.forEach((h) => {
      points.push(h.ll);
      L.marker(h.ll, { icon: heritageIcon(h), title: h.name, alt: h.name })
        .bindPopup(() =>
          popup({
            title: `${h.emoji} ${h.name}`,
            lines: [`${h.origin}, ${h.district}`, h.gi ? "GI-tagged" : ""],
            links: [
              { text: "Read the story", href: `#/heritage?item=${encodeURIComponent(h.id)}` },
              { text: "Open in Maps", href: h.mapsUrl, external: true },
            ],
          })
        )
        .addTo(group);
    });

    if (route.length) {
      const line = route.map((r) => r.ll);
      L.polyline(line, { color: "#db2777", weight: 4, opacity: 0.8, dashArray: "8 8" }).addTo(group);
      route.forEach((r, i) => {
        points.push(r.ll);
        L.marker(r.ll, { icon: numberIcon(i + 1), title: r.label, alt: r.label })
          .bindPopup(() => popup({ title: `${i + 1}. ${r.label}`, lines: [r.sub], links: r.mapsUrl ? [{ text: "Open in Maps", href: r.mapsUrl, external: true }] : [] }))
          .addTo(group);
      });
    }

    if (user) {
      L.circleMarker(user, { radius: 8, color: "#fff", weight: 3, fillColor: "#2563eb", fillOpacity: 1 }).bindTooltip("You are here").addTo(group);
    }

    // re-fit the view only when the caller changes fitKey, so typing in a filter box does not jump the map
    if (fitRef.current !== fitKey) {
      fitRef.current = fitKey;
      if (points.length > 1) map.fitBounds(L.latLngBounds(points).pad(0.12), { maxZoom: 11 });
      else if (points.length === 1) map.setView(points[0], 10);
    }
  }, [districts, heritage, route, user, fitKey]);

  useEffect(() => {
    if (flyTo && mapRef.current) mapRef.current.flyTo(flyTo.ll, flyTo.zoom ?? 11, { duration: 0.8 });
  }, [flyTo]);

  return <div ref={elRef} className={`fx-map ${className}`} role="region" aria-label={label} />;
}
