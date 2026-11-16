import { CATEGORIES } from "../data/heritageData";
import { useTrail } from "../context/TrailContext";
import { useToast } from "../context/ToastContext";
import { itemMapQuery } from "../utils/maps";
import MapPanel from "./MapPanel";

export default function HeritageCard({ item, onOpen }) {
  const { isSaved, toggle } = useTrail();
  const toast = useToast();
  const cat = CATEGORIES.find((c) => c.id === item.category);
  const saved = isSaved(item.id);

  const onHeart = () => {
    toggle(item.id);
    toast.success(saved ? `Removed ${item.name} from your trail.` : `Added ${item.name} to your Cultural Trail.`);
  };

  return (
    <article className="h-card">
      <button className="h-card-hero" style={{ background: `linear-gradient(135deg, ${item.hue[0]}, ${item.hue[1]})` }} onClick={() => onOpen(item)} aria-label={`View details of ${item.name}`}>
        <span className="h-emoji" aria-hidden="true">{item.emoji}</span>
        {item.gi && <span className="gi-pill">GI-tagged</span>}
        {item.season && <span className="season-pill">🗓️ {item.season}</span>}
      </button>
      <button className={saved ? "heart on" : "heart"} onClick={onHeart} aria-pressed={saved} aria-label={saved ? "Remove from Cultural Trail" : "Add to Cultural Trail"}>
        {saved ? "♥" : "♡"}
      </button>
      <div className="h-card-body">
        <span className="tag">{cat?.emoji} {cat?.short}</span>
        <h3>{item.name}</h3>
        <p className="desc">{item.tagline}</p>
        <p className="addr">📍 {item.origin}, {item.district}</p>
        <button className="btn-ghost btn-sm h-details" onClick={() => onOpen(item)}>Read the story</button>
      </div>
      <MapPanel query={itemMapQuery(item)} title={item.name} />
    </article>
  );
}
