import { useEffect, useState, useSyncExternalStore } from "react";
import { Link, useLocation } from "react-router-dom";
import GlobalSearch from "./components/GlobalSearch";
import { useHtmlLang, useLang } from "./i18n/useLang";
import { trackPageView } from "./lib/analytics";
import { FOOTER_LINKS, MENU, OPEN_SEARCH_EVENT, openSearch } from "./lib/menu";

/** "More" drop-down in the navbar with every new page, grouped. */
export function MoreMenu({ onNavigate }) {
  const { t } = useLang();
  const { pathname } = useLocation();
  // The menu is "open" only for the page it was opened on, so it closes by itself after any navigation.
  const [openPath, setOpenPath] = useState(null);
  const open = openPath === pathname;

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => !e.target.closest?.(".fx-more") && setOpenPath(null);
    const onKey = (e) => e.key === "Escape" && setOpenPath(null);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="fx-more">
      <button type="button" className={open ? "fx-more-btn open" : "fx-more-btn"} aria-expanded={open} aria-haspopup="true" onClick={() => setOpenPath(open ? null : pathname)}>
        {t("more")} <span aria-hidden="true">▾</span>
      </button>
      {open && (
        <div className="fx-more-panel" role="menu">
          {MENU.map((g) => (
            <div key={g.group} className="fx-more-group">
              <p className="fx-more-title">{t(g.group)}</p>
              {g.items.map((it) => (
                <Link key={it.to} to={it.to} role="menuitem" onClick={() => { setOpenPath(null); onNavigate?.(); }}>
                  <span aria-hidden="true">{it.icon}</span> {t(it.key)}
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/** Search button and language switch shown next to the theme toggle. */
export function NavTools() {
  const { lang, setLang, t } = useLang();
  return (
    <div className="fx-navtools">
      <button type="button" className="fx-search-btn" onClick={openSearch} aria-label={t("search")} title="Ctrl + K">
        <span aria-hidden="true">🔍</span>
        <span className="fx-search-label">{t("search")}</span>
        <kbd className="fx-kbd" aria-hidden="true">Ctrl K</kbd>
      </button>
      <button type="button" className="fx-lang" onClick={() => setLang(lang === "en" ? "te" : "en")} aria-label={lang === "en" ? "Switch to Telugu" : "Switch to English"} title={t("language")}>
        {lang === "en" ? "తెలుగు" : "English"}
      </button>
    </div>
  );
}

const subscribeOnline = (cb) => {
  window.addEventListener("online", cb);
  window.addEventListener("offline", cb);
  return () => {
    window.removeEventListener("online", cb);
    window.removeEventListener("offline", cb);
  };
};

function OnlineBanner() {
  const online = useSyncExternalStore(subscribeOnline, () => navigator.onLine, () => true);
  if (online) return null;
  return <div className="fx-offline" role="status">You are offline. Pages you have already opened still work; maps and weather need a connection.</div>;
}

/**
 * Everything that has to exist once for the whole site: the Ctrl+K search window, page-view counting,
 * scroll-to-top on a new page, the skip link, the offline notice and the small footer links.
 */
export function FeatureGlobals() {
  const { lang, t } = useLang();
  const { pathname } = useLocation();
  const [searching, setSearching] = useState(false);

  useHtmlLang(lang);

  // open search: Ctrl/Cmd+K, "/" (when not typing) or the navbar button
  useEffect(() => {
    const open = () => setSearching(true);
    const onKey = (e) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target?.tagName) || e.target?.isContentEditable;
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearching(true);
      } else if (e.key === "/" && !typing && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        setSearching(true);
      }
    };
    window.addEventListener(OPEN_SEARCH_EVENT, open);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(OPEN_SEARCH_EVENT, open);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  // count the page view and start every new page at the top
  useEffect(() => {
    trackPageView(pathname, lang);
    window.scrollTo?.(0, 0);
    // lang is deliberately not a dependency: switching language is not a new page view
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // skip link + landmark for keyboard and screen-reader users
  useEffect(() => {
    const main = document.querySelector(".app-main");
    main?.setAttribute("role", "main");
    main?.setAttribute("tabindex", "-1");
    const skip = document.createElement("button");
    skip.type = "button";
    skip.className = "fx-skip";
    skip.textContent = t("skip");
    skip.addEventListener("click", () => main?.focus());
    document.body.prepend(skip);
    return () => {
      skip.remove();
      main?.removeAttribute("role");
      main?.removeAttribute("tabindex");
    };
  }, [t]);

  return (
    <>
      <OnlineBanner />
      <footer className="fx-footer fx-noprint" aria-label={t("footerLinks")}>
        {FOOTER_LINKS.map((l) => <Link key={l.to} to={l.to}>{t(l.key)}</Link>)}
      </footer>
      {searching && <GlobalSearch onClose={() => setSearching(false)} />}
    </>
  );
}
