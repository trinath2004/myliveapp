import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocationSelection } from "../../context/LocationContext";
import DistrictSelect from "../components/DistrictSelect";
import { useLang } from "../i18n/useLang";
import { ALL_DISTRICTS, districtByName } from "../lib/districts";
import { CATEGORIES, KINDS, submitSuggestion } from "../lib/suggestApi";
import { ONLINE } from "../lib/supabase";
import { usePageTitle } from "../lib/usePageTitle";

const EMPTY = { kind: "new_place", district: "", category: CATEGORIES[0], name: "", details: "", contact: "", website: "" };

/** Shared form for "Suggest a place / Report a correction" and the contact page. */
export function SuggestForm({ contactMode = false }) {
  const { t } = useLang();
  const loc = useLocationSelection();
  const [f, setF] = useState({ ...EMPTY, kind: contactMode ? "message" : "new_place", district: contactMode ? "" : loc?.district ?? "" });
  const [status, setStatus] = useState({ phase: "idle", mode: "", error: "" });
  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (f.website) return; // hidden trap field: real visitors never fill it
    setStatus({ phase: "sending", mode: "", error: "" });
    try {
      const d = districtByName(f.district);
      const res = await submitSuggestion({ ...f, state: d?.state ?? "" });
      setStatus({ phase: "done", mode: res.mode, error: "" });
      setF({ ...EMPTY, kind: contactMode ? "message" : "new_place", district: f.district });
    } catch (err) {
      setStatus({ phase: "error", mode: "", error: err.message || "Could not send. Please try again." });
    }
  };

  if (status.phase === "done") {
    return (
      <div className="fx-card" role="status">
        <p><strong>✅ {t("sent")}</strong></p>
        {status.mode === "local" && <p className="muted small">The online inbox is not connected yet, so your note was saved on this device only.</p>}
        <button type="button" className="btn-ghost btn-sm" onClick={() => setStatus({ phase: "idle", mode: "", error: "" })}>Send another</button>
      </div>
    );
  }

  return (
    <form className="fx-card fx-form" onSubmit={submit}>
      {!contactMode && (
        <label className="fx-field">
          <span>What would you like to do?</span>
          <select value={f.kind} onChange={set("kind")}>{KINDS.map((k) => <option key={k.id} value={k.id}>{k.label}</option>)}</select>
        </label>
      )}
      {!contactMode && (
        <div className="fx-form-row">
          <DistrictSelect id="sg-district" label={t("district")} value={f.district} onChange={(v) => setF((x) => ({ ...x, district: v }))} placeholder="—" />
          <label className="fx-field">
            <span>Category</span>
            <select value={f.category} onChange={set("category")}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select>
          </label>
        </div>
      )}
      <label className="fx-field">
        <span>{contactMode ? "Subject" : "Name of the place or item"}</span>
        <input className="fx-input" value={f.name} onChange={set("name")} maxLength={120} />
      </label>
      <label className="fx-field">
        <span>{contactMode ? "Your message" : "Details (what is new, or what is wrong and what is right?)"}</span>
        <textarea className="fx-input" rows={5} value={f.details} onChange={set("details")} maxLength={1000} required />
      </label>
      <label className="fx-field">
        <span>E-mail or phone (optional, only if you want a reply)</span>
        <input className="fx-input" value={f.contact} onChange={set("contact")} maxLength={120} autoComplete="off" />
      </label>
      {/* hidden trap field for spam bots */}
      <label className="fx-trap" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={f.website} onChange={set("website")} /></label>
      {status.phase === "error" && <p role="alert" className="fx-error">{status.error}</p>}
      <div className="trail-actions">
        <button type="submit" className="btn" disabled={status.phase === "sending"}>{status.phase === "sending" ? t("loading") : t("send")}</button>
      </div>
      <p className="muted small">{ONLINE ? "Your note goes to the site team for review. Nothing changes until it is checked." : "Demo mode: the online inbox is not connected, so notes stay on this device."}</p>
    </form>
  );
}

export default function SuggestPage() {
  const { t } = useLang();
  usePageTitle(t("suggestTitle"));
  return (
    <div className="page fx-page narrow">
      <p className="kicker">{t("groupFun")}</p>
      <h1>✍️ {t("suggestTitle")}</h1>
      <p className="lead">{t("suggestLead")}</p>
      <SuggestForm />
      <p className="muted small">Browse the <Link to="/districts">district guides</Link> first to see what is already listed ({ALL_DISTRICTS.length} districts).</p>
    </div>
  );
}
