import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTrail } from "../context/TrailContext";
import { useToast } from "../context/ToastContext";
import HeritageCard from "../components/HeritageCard";
import ItemModal from "../components/ItemModal";
import SiteFooter from "../components/SiteFooter";
import { copyText, itemMapQuery, mapsRouteUrl, whatsappUrl } from "../utils/maps";

/** "My Cultural Trail": saved specialties grouped by district, like stops on a journey. */
export default function TrailPage() {
  const { items, clear } = useTrail();
  const toast = useToast();
  const [open, setOpen] = useState(null);

  const stops = useMemo(() => {
    const map = new Map();
    for (const i of items) {
      const key = `${i.state}||${i.district}`;
      if (!map.has(key)) map.set(key, { state: i.state, district: i.district, items: [] });
      map.get(key).items.push(i);
    }
    return [...map.values()];
  }, [items]);

  const routeUrl = mapsRouteUrl(items.map(itemMapQuery));
  const summary = () =>
    "My Cultural Trail (MTS Famous Places Finder)\n" +
    stops.map((s, n) => `${n + 1}. ${s.district}: ${s.items.map((i) => i.name).join(", ")}`).join("\n");

  const copy = async () => {
    const ok = await copyText(summary());
    if (ok) toast.success("Trail copied. Paste it into any chat or note.");
    else toast.error("Could not copy on this device.");
  };

  const openItem = items.find((i) => i.id === open);

  return (
    <div className="page">
      <h1>🧭 My Cultural Trail</h1>
      <p className="muted">Save the specialties you want to taste, see or learn about. Each district becomes a stop on your journey, and you can open the whole route in Google Maps.</p>

      {stops.length === 0 ? (
        <div className="empty-state">
          <span aria-hidden="true">🗺️</span>
          <h3>Your trail is empty</h3>
          <p className="muted">Tap the ♡ on any specialty to add it here. Nothing to sign up for: your trail stays on this device.</p>
          <Link className="btn btn-sm" to="/heritage">Explore the Heritage Hub</Link>
        </div>
      ) : (
        <>
          <div className="trail-bar">
            <p className="trail-summary">{items.length} saved across {stops.length} district{stops.length > 1 ? "s" : ""}</p>
            <div className="trail-actions">
              <a className="btn btn-sm" href={routeUrl} target="_blank" rel="noopener noreferrer">🚗 Plan route in Google Maps</a>
              <a className="btn-ghost btn-sm" href={whatsappUrl(summary())} target="_blank" rel="noopener noreferrer">💬 Share on WhatsApp</a>
              <button className="btn-ghost btn-sm" onClick={copy}>📋 Copy list</button>
              <button className="link-danger" onClick={clear}>Clear trail</button>
            </div>
          </div>
          {items.length > 11 && <p className="muted small">Google Maps shows up to 11 stops, so the route uses the first 11 saved places.</p>}
          <ol className="trail">
            {stops.map((s, n) => (
              <li key={`${s.state}-${s.district}`}>
                <div className="trail-marker" aria-hidden="true">{n + 1}</div>
                <h2>{s.district} <small className="muted">{s.state}</small></h2>
                <div className="h-grid">
                  {s.items.map((i) => <HeritageCard key={i.id} item={i} onOpen={(it) => setOpen(it.id)} />)}
                </div>
              </li>
            ))}
          </ol>
        </>
      )}
      <SiteFooter />
      {openItem && <ItemModal item={openItem} onClose={() => setOpen(null)} />}
    </div>
  );
}
