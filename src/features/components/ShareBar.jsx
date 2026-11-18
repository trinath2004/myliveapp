import { useToast } from "../../context/ToastContext";
import { copyText, whatsappUrl } from "../../utils/maps";
import { useLang } from "../i18n/useLang";

/** WhatsApp, copy-link and (where the device supports it) the system share sheet. */
export default function ShareBar({ text, url, className = "" }) {
  const toast = useToast();
  const { t } = useLang();
  const message = url ? `${text}\n${url}` : text;
  const canShare = typeof navigator !== "undefined" && typeof navigator.share === "function";

  const copy = async () => {
    const ok = await copyText(url || text);
    if (ok) toast.success(t("copied"));
    else toast.error("Could not copy on this device.");
  };

  return (
    <div className={`fx-sharebar fx-noprint ${className}`}>
      <a className="btn-ghost btn-sm" href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer">💬 {t("shareWhatsApp")}</a>
      <button type="button" className="btn-ghost btn-sm" onClick={copy}>🔗 {t("copyLink")}</button>
      {canShare && (
        <button type="button" className="btn-ghost btn-sm" onClick={() => navigator.share({ title: text.split("\n")[0], text, url }).catch(() => {})}>📤 {t("share")}</button>
      )}
    </div>
  );
}
