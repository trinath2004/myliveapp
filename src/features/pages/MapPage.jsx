import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import { mapsSearchUrl } from "../../utils/maps";
import LeafletMap from "../components/LeafletMap";
import { useLang } from "../i18n/useLang";
import { ALL_DISTRICTS, districtByName } from "../lib/districts";
import { heritagePins } from "../lib/heritagePins";
import { RESOLVED_TRAILS, trailRoutePoints } from "../lib/trails";
import { usePageTitle } from "../lib/usePageTitle";

const LAYERS = [
  ["districts", "fDistricts"],
  ["food", "fFoods"],
  ["handloom", "fHandlooms"],
  ["craft", "fCrafts"],
];

export default function MapPage() {
  const { t, dn } = useLang();
  usePageTitle(t("mapTitle"));
  const toast = useToast();
  const [params, setParams] = useSearchParams();

  const trailId = params.get("trail") || "";
  const trail = RESOLVED_TRAILS.find((x) => x.id === trailId) ?? null;
  const startDistrict = districtByName(params.get("district") || "");

  const [layers, setLayers] = useState({ districts: true, food: true, handloom: true, craft: true });
  const [gi, setGi] = useState(false);
  const [state, setState] = useState("all");
  const [flyTo, setFlyTo] = useState(startDistrict?.ll ? { ll: startDistrict.ll, zoom: 10 } : null);
  const [user, setUser] = useState(null);

  const districts = useMemo(
    () =>
      layers.districts && !trail
        ? ALL_DISTRICTS.filter((d) => d.ll && (state === "all" || d.state === state)).map((d) => ({ name: d.district, state: d.state, slug: d.slug, ll: d.ll, knownFor: d.knownFor }))
        : [],
    [layers.districts, state, trail]
  );
  const heritage = useMemo(
    () => (trail ? [] : heritagePins((h) => layers[h.category] && (!gi || h.gi) && (state === "all" || h.state === state))),
    [layers, gi, state, trail]
  );
  const route = useMemo(
    () =>
      trail
        ? trailRoutePoints(trail).map((p) => ({ ll: p.ll, label: p.district, sub: p.names.join(", "), mapsUrl: mapsSearchUrl(p.firstArea) }))
        : [],
    [trail]
  );

  const locate = () => {
    if (!navigator.geolocation) {
      toast.error("This browser cannot share your location.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const ll = [pos.coords.latitude, pos.coords.longitude];
        setUser(ll);
        setFlyTo({ ll, zoom: 11 });
      },
      () => toast.error("Location is blocked or unavailable."),
      { timeout: 10000, maximumAge: 300000 }
    );
  };

  const fitKey = `${state}|${gi}|${Object.values(layers).join("")}|${trailId}`;
  const toggleLayer = (id) => setLayers((l) => ({ ...l, [id]: !l[id] }));

  return (
    <div className="fx-map-wrap">
      <LeafletMap districts={districts} heritage={heritage} route={route} user={user} fitKey={fitKey} flyTo={flyTo} label={t("mapTitle")} className="fx-map-full" />
      <section className="fx-map-panel" aria-label="Map filters">
        <h1 className="fx-map-title">🗺️ {t("mapTitle")}</h1>
        {trail ? (
          <div className="fx-map-trail">
            <p><strong>{trail.emoji} {trail.name}</strong></p>
            <p className="muted small">Pins are placed at district level.</p>
            <button type="button" className="btn-ghost btn-sm" onClick={() => setParams({}, { replace: true })}>Show all pins</button>
          </div>
        ) : (
          <>
            <div className="chips" role="group" aria-label="Layers">
              {LAYERS.map(([id, key]) => (
                <button key={id} type="button" className={layers[id] ? "chip active" : "chip"} aria-pressed={layers[id]} onClick={() => toggleLayer(id)}>{t(key)}</button>
              ))}
              <button type="button" className={gi ? "chip active" : "chip"} aria-pressed={gi} onClick={() => setGi((v) => !v)}>🏅 {t("fGI")}</button>
            </div>
            <div className="chips" role="group" aria-label={t("state")}>
              {[["all", t("allStates")], ["Andhra Pradesh", "Andhra Pradesh"], ["Telangana", "Telangana"]].map(([id, label]) => (
                <button key={id} type="button" className={state === id ? "chip active" : "chip"} aria-pressed={state === id} onClick={() => setState(id)}>{label}</button>
              ))}
            </div>
            <label className="fx-field">
              <span>{t("district")}</span>
              <select value="" onChange={(e) => { const d = districtByName(e.target.value); if (d?.ll) setFlyTo({ ll: d.ll, zoom: 10 }); }}>
                <option value="">—</option>
                {ALL_DISTRICTS.map((d) => <option key={d.slug} value={d.district}>{dn(d.state, d.district)}</option>)}
              </select>
            </label>
          </>
        )}
        <button type="button" className="btn-ghost btn-sm" onClick={locate}>📍 {t("locateMe")}</button>
        <p className="muted small">{t("approx")}</p>
      </section>
    </div>
  );
}
