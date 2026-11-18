import { useEffect } from "react";

/** Sets the browser tab title for a page and puts the old one back when the page closes. */
export function usePageTitle(title) {
  useEffect(() => {
    const previous = document.title;
    if (title) document.title = `${title} · MTS Heritage Hub`;
    return () => {
      document.title = previous;
    };
  }, [title]);
}
