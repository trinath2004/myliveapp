import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="page"><div className="empty-state">
      <span aria-hidden="true">🧭</span><h3>We could not find that page</h3>
      <Link className="btn btn-sm" to="/heritage">Visit the Heritage Hub</Link>
    </div></div>
  );
}
