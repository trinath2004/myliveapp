import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import { useLang } from "../i18n/useLang";
import { TYPE_LABEL, search } from "../lib/searchIndex";

const SUGGESTIONS = ["biryani", "Tirupati", "handloom", "Charminar", "beach", "కాఫీ"];

/** Ctrl+K search over restaurants, places, shops, heritage items, districts, festivals and trails. */
export default function GlobalSearch({ onClose }) {
  const { t, lang } = useLang();
  const toast = useToast();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [listening, setListening] = useState(false);
  const [voiceLang, setVoiceLang] = useState(lang === "te" ? "te-IN" : "en-IN");
  const inputRef = useRef(null);
  const recRef = useRef(null);

  const results = useMemo(() => search(query), [query]);

  useEffect(() => {
    inputRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
      recRef.current?.abort?.();
    };
  }, []);

  const go = (r) => {
    onClose();
    navigate(r.to);
  };

  const update = (text) => {
    setQuery(text);
    setActive(0);
  };

  const onKey = (e) => {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, Math.max(0, results.length - 1)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && results[active]) go(results[active]);
  };

  const voice = () => {
    if (listening) {
      recRef.current?.stop();
      return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      toast.error(t("voiceUnsupported"));
      return;
    }
    const rec = new SR();
    rec.lang = voiceLang;
    rec.interimResults = true;
    rec.maxAlternatives = 1;
    rec.onresult = (e) => update(Array.from(e.results).map((r) => r[0].transcript).join(" "));
    rec.onend = () => setListening(false);
    rec.onerror = (e) => {
      setListening(false);
      if (e.error === "not-allowed" || e.error === "service-not-allowed") toast.error("Microphone is blocked. Allow it in the browser to use voice search.");
    };
    recRef.current = rec;
    try {
      rec.start();
      setListening(true);
    } catch {
      setListening(false);
    }
  };

  return (
    <div className="fx-search-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="fx-search" role="dialog" aria-modal="true" aria-label={t("search")} onKeyDown={onKey}>
        <div className="fx-search-bar">
          <span aria-hidden="true">🔍</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => update(e.target.value)}
            placeholder={t("searchPlaceholder")}
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls="fx-search-list"
            aria-activedescendant={results[active] ? `fx-res-${active}` : undefined}
            aria-label={t("search")}
            autoComplete="off"
            spellCheck="false"
          />
          <button type="button" className={listening ? "icon-btn fx-mic on" : "icon-btn fx-mic"} onClick={voice} aria-label={listening ? t("voiceListening") : t("voiceStart")} aria-pressed={listening} title={t("voiceStart")}>🎤</button>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close search">×</button>
        </div>

        <div className="fx-voice-lang" role="group" aria-label="Voice language">
          <span className="muted small">🎤</span>
          {[["te-IN", "తెలుగు"], ["en-IN", "English"]].map(([id, label]) => (
            <button key={id} type="button" className={voiceLang === id ? "chip active" : "chip"} onClick={() => setVoiceLang(id)}>{label}</button>
          ))}
          {listening && <span className="small" role="status">{t("voiceListening")}</span>}
        </div>

        {!query.trim() ? (
          <div className="fx-search-empty">
            <p className="muted small">{t("searchHint")}</p>
            <div className="chips">
              {SUGGESTIONS.map((s) => <button key={s} type="button" className="chip" onClick={() => update(s)}>{s}</button>)}
            </div>
          </div>
        ) : results.length === 0 ? (
          <p className="fx-search-empty muted">{t("searchEmpty")}</p>
        ) : (
          <ul className="fx-results" id="fx-search-list" role="listbox">
            {results.map((r, i) => (
              <li key={`${r.type}-${r.label}-${r.district}-${i}`} id={`fx-res-${i}`} role="option" aria-selected={i === active}>
                <button type="button" className={i === active ? "fx-res active" : "fx-res"} onMouseEnter={() => setActive(i)} onClick={() => go(r)}>
                  <span className="fx-res-emoji" aria-hidden="true">{r.emoji}</span>
                  <span className="fx-res-text">
                    <strong>{r.label}</strong>
                    <small>{r.district ? `${r.district} · ` : ""}{r.sub.slice(0, 90)}</small>
                  </span>
                  <span className="tag">{TYPE_LABEL[r.type]}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
