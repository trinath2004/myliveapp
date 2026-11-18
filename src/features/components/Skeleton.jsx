/** Shimmering placeholders shown while a page's code loads, so the screen never jumps or goes blank. */
export function PageSkeleton() {
  return (
    <div className="page" aria-busy="true" aria-label="Loading page" role="status">
      <div className="fx-skel fx-skel-kicker" />
      <div className="fx-skel fx-skel-title" />
      <div className="fx-skel fx-skel-line" />
      <div className="fx-skel fx-skel-line short" />
      <div className="fx-skel-grid">
        {Array.from({ length: 6 }, (_, i) => <div key={i} className="fx-skel fx-skel-card" />)}
      </div>
    </div>
  );
}

export function MapSkeleton({ height = 420 }) {
  return <div className="fx-skel" style={{ height }} role="status" aria-label="Loading map" />;
}
