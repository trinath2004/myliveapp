import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import MapPanel from "./MapPanel";
import { CATEGORIES } from "../data/heritageData";
import { DATA } from "../data/data";
import { useTrail } from "../context/TrailContext";
import { useLocationSelection } from "../context/LocationContext";
import { useToast } from "../context/ToastContext";
import { copyText, itemMapQuery, itemShareUrl, whatsappUrl } from "../utils/maps";

export default function ItemModal({ item, onClose }) {
  const { isSaved, toggle } = useTrail();
  const { setState, setDistrict } = useLocationSelection();
  const toast = useToast();
  const navigate = useNavigate();
  const cat = CATEGORIES.find((c) => c.id === item.category);
  const saved = isSaved(item.id);
  const inExplore = Boolean(DATA[item.state]?.[item.district]);
  const shareText = `${item.name} from ${item.district}, ${item.state}: ${item.tagline} See it on MTS Famous Places Finder:`;

  const goExplore = () => {
    setState(item.state);
    setDistrict(item.district);
    onClose();
    navigate("/explore");
  };

  const copyLink = async () => {
    const ok = await copyText(itemShareUrl(item));
    if (ok) toast.success("Link copied. Paste it anywhere to share.");
    else toast.error("Could not copy the link on this device.");
  };

  return (
    <Modal title={item.name} onClose={onClose} wide>
      <div className="m-hero" style={{ background: `linear-gradient(135deg, ${item.hue[0]}, ${item.hue[1]})` }}>
        <span className="h-emoji big" aria-hidden="true">{item.emoji}</span>
        <div>
          <span className="tag light">{cat?.emoji} {cat?.label}</span>
          <h2>{item.name}</h2>
          <p>{item.tagline}</p>
        </div>
      </div>

      <div className="m-body">
        <div className="m-facts">
          <div><small>Origin</small><strong>{item.origin}</strong></div>
          <div><small>District</small><strong>{item.district}, {item.state}</strong></div>
          <div><small>GI tag</small><strong>{item.gi ? "Yes, protected name" : "Not GI-tagged"}</strong></div>
          {item.season && <div><small>Best season</small><strong>{item.season}</strong></div>}
        </div>

        <h4>📜 History &amp; background</h4>
        <p>{item.history}</p>
        {item.gi && <p className="gi-note">🏅 Carries a Geographical Indication (GI) tag, which protects the name for products from this region.</p>}

        <h4>🙏 The people behind it</h4>
        <div className="artisan-box">
          <strong>{item.artisan.group}</strong>
          <p>{item.artisan.story}</p>
        </div>

        <div className="m-actions">
          <button className="btn" onClick={() => toggle(item.id)}>{saved ? "♥ On your Cultural Trail" : "♡ Add to Cultural Trail"}</button>
          <a className="btn-ghost" target="_blank" rel="noopener noreferrer" href={whatsappUrl(`${shareText} ${itemShareUrl(item)}`)}>💬 Share on WhatsApp</a>
          <button className="btn-ghost" onClick={copyLink}>🔗 Copy link</button>
        </div>

        {inExplore && (
          <button className="explore-link" onClick={goExplore}>
            🍽️ Where to eat, what to see and where to shop in {item.district} →
          </button>
        )}

        <h4>🗺️ Where to find it</h4>
        <p className="muted small">Showing {itemMapQuery(item)}</p>
        <MapPanel query={itemMapQuery(item)} title={item.name} openByDefault />
      </div>
    </Modal>
  );
}
