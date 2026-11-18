import { Link } from "react-router-dom";

/**
 * Plain horizontal bar chart made of HTML, so it is crisp, accessible (every number is real text)
 * and needs no chart library.
 */
export default function BarChart({ rows, label, max, hue = "var(--accent-solid)" }) {
  const top = max ?? Math.max(1, ...rows.map((r) => r.value));
  return (
    <ul className="fx-bars" aria-label={label}>
      {rows.map((r) => (
        <li key={r.key ?? r.label}>
          <span className="fx-bar-label">{r.to ? <Link to={r.to}>{r.label}</Link> : r.label}</span>
          <span className="fx-bar-track" aria-hidden="true">
            <span className="fx-bar-fill" style={{ width: `${Math.max(3, (r.value / top) * 100)}%`, background: r.color || hue }} />
          </span>
          <span className="fx-bar-val">{r.value}</span>
        </li>
      ))}
    </ul>
  );
}
