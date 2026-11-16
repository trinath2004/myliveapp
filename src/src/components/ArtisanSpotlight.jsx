import { useEffect, useMemo, useState } from "react";

/**
 * "Support Local Artisans" storytelling section. Rotates through the catalogue's artisan communities
 * (auto-advances, pauses on hover/focus, and respects reduced-motion preferences).
 */
export default function ArtisanSpotlight({ items, onOpen }) {
  const stories = useMemo(() => items.filter((i) => i.artisan?.group && i.artisan?.story), [items]);
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  useEffect(() => {
    if (paused || reduce || stories.length < 2) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % stories.length), 7000);
    return () => clearInterval(t);
  }, [paused, reduce, stories.length]);

  const districts = new Set(items.map((i) => i.district)).size;
  const communities = new Set(items.map((i) => i.artisan?.group).filter(Boolean)).size;
  const gi = items.filter((i) => i.gi).length;
  if (stories.length === 0) return null;
  const s = stories[idx % stories.length];

  return (
    <section className="spotlight" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)} aria-label="Support local artisans">
      <div className="spot-intro">
        <p className="kicker">🙏 Support Local Artisans</p>
        <h2>Every tradition carries a pair of hands, a village and a story.</h2>
        <p>These specialties exist because families kept centuries-old skills alive. Learn who makes them, visit their home towns, and tell others about them. That is how traditions are kept alive.</p>
        <ul className="impact">
          <li><strong>{communities}</strong><span>artisan communities</span></li>
          <li><strong>{districts}</strong><span>districts featured</span></li>
          <li><strong>{gi}</strong><span>GI-tagged traditions</span></li>
        </ul>
      </div>

      <article key={s.id} className="spot-card fade-in" style={{ background: `linear-gradient(135deg, ${s.hue[0]}, ${s.hue[1]})` }}>
        <span className="h-emoji big" aria-hidden="true">{s.emoji}</span>
        <p className="kicker light">Meet the makers · {s.district}</p>
        <h3>{s.artisan.group}</h3>
        <blockquote>{s.artisan.story}</blockquote>
        <p className="spot-product">Their craft: <strong>{s.name}</strong> · {s.origin}</p>
        <div className="spot-actions">
          <button className="btn btn-light" onClick={() => onOpen(s)}>Read their story</button>
          <div className="dots" role="group" aria-label="Choose a story">
            <button className="icon-btn light" aria-label="Previous story" onClick={() => setIdx((idx - 1 + stories.length) % stories.length)}>‹</button>
            <span className="dot-count">{(idx % stories.length) + 1} / {stories.length}</span>
            <button className="icon-btn light" aria-label="Next story" onClick={() => setIdx((idx + 1) % stories.length)}>›</button>
          </div>
        </div>
      </article>
    </section>
  );
}
