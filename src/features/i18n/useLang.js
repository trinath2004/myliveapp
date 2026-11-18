import { useCallback, useEffect } from "react";
import { en, te } from "./translations";
import { useStored } from "../lib/useStored";
import { DISTRICT_META, STATE_TE } from "../data/districtMeta";

const DICTS = { en, te };

/** Language switch (English / Telugu). The choice is remembered on this device. */
export function useLang() {
  const [stored, setStored] = useStored("lang", "en");
  const lang = stored === "te" ? "te" : "en";
  const t = useCallback((key) => DICTS[lang][key] ?? en[key] ?? key, [lang]);
  const setLang = useCallback((l) => setStored(l === "te" ? "te" : "en"), [setStored]);
  /** District name in the current language. */
  const dn = useCallback(
    (state, district) => (lang === "te" ? DISTRICT_META[state]?.[district]?.te ?? district : district),
    [lang]
  );
  const sn = useCallback((state) => (lang === "te" ? STATE_TE[state] ?? state : state), [lang]);
  return { lang, t, setLang, dn, sn };
}

/** Keeps <html lang> in step with the chosen language (helps screen readers and fonts). */
export function useHtmlLang(lang) {
  useEffect(() => {
    document.documentElement.lang = lang === "te" ? "te" : "en";
  }, [lang]);
}
