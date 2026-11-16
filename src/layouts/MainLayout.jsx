import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useTrail } from "../context/TrailContext";
import ThemeToggle from "../components/ThemeToggle";

export default function MainLayout() {
  const { items } = useTrail();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="app-shell">
      <nav className="navbar" aria-label="Main">
        <Link to="/" className="nav-brand" onClick={close}>
          <span className="nav-logo" aria-hidden="true">M</span>
          <span>MTS</span>
        </Link>

        <button className="icon-btn nav-burger" aria-expanded={open} aria-label="Toggle menu" onClick={() => setOpen(!open)}>☰</button>

        <div className={open ? "nav-links open" : "nav-links"}>
          <NavLink to="/explore" onClick={close}>Explore</NavLink>
          <NavLink to="/heritage" onClick={close}>Heritage Hub</NavLink>
          <NavLink to="/trail" onClick={close}>Cultural Trail{items.length > 0 && <span className="count-pill">{items.length}</span>}</NavLink>
        </div>

        <div className="nav-actions"><ThemeToggle /></div>
      </nav>

      <div className="app-main"><Outlet /></div>
    </div>
  );
}
