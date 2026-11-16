import { useEffect, useRef } from "react";

/** Accessible modal: Esc closes, focus moves in, body scroll is locked while open. */
export default function Modal({ title, onClose, children, wide = false }) {
  const ref = useRef(null);

  useEffect(() => {
    const prev = document.activeElement;
    ref.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      prev?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className={wide ? "modal modal-wide" : "modal"} role="dialog" aria-modal="true" aria-label={title} tabIndex={-1} ref={ref}>
        <button className="modal-close" aria-label="Close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
}
