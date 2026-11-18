import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useLocationSelection } from "../../context/LocationContext";
import DistrictSelect from "../components/DistrictSelect";
import { useLang } from "../i18n/useLang";
import { districtByName, getProfile, guidePath } from "../lib/districts";
import { haversineKm } from "../lib/geo";
import { usePageTitle } from "../lib/usePageTitle";

export default function ComparePage() {
  const { t, dn } = useLang();
  usePageTitle(t("compareTitle"));
  const loc = useLocationSelection();
  const [params, setParams] = useSearchParams();
  const a = districtByName(params.get("a") || "")?.district ?? loc?.district ?? "Hyderabad";
  const b = districtByName(params.get("b") || "")?.district ?? (a === "Tirupati" ? "Visakhapatnam" : "Tirupati");
  const set = (k, v) => setParams({ a, b, [k]: v }, { replace: true });

  const [pa, pb] = useMemo(() => [getProfile(districtByName(a).state, a), getProfile(districtByName(b).state, b)], [a, b]);
  const km = pa.ll && pb.ll ? Math.round(haversineKm(pa.ll, pb.ll)) : null;

  const top = (p) => p.topRestaurants.map((r) => r.name).join(", ") || "—";
  const rows = [
    [t("state"), (p) => p.state],
    [t("knownFor"), (p) => p.knownFor],
    [t("restaurants"), (p) => p.restaurants.length],
    [t("places"), (p) => p.places.length],
    [t("shops"), (p) => p.shops.length],
    [t("heritage"), (p) => p.heritage.length],
    ["GI-tagged items", (p) => p.gi.length],
    ["Main cuisines", (p) => p.cuisines.slice(0, 3).map(([c, n]) => `${c} (${n})`).join(", ") || "—"],
    ["Kinds of places", (p) => p.placeTypes.slice(0, 3).map(([c, n]) => `${c} (${n})`).join(", ") || "—"],
    ["Top-rated restaurants", top],
    ["Famous places", (p) => p.topPlaces.map((x) => x.name).join(", ") || "—"],
    [t("heritage"), (p) => p.heritage.map((h) => `${h.emoji} ${h.name}`).join(", ") || "—"],
  ];

  return (
    <div className="page fx-page">
      <p className="kicker">{t("groupDiscover")}</p>
      <h1>⚖️ {t("compareTitle")}</h1>
      <p className="lead">{t("compareLead")}</p>

      <div className="fx-form-row">
        <DistrictSelect id="cmp-a" label="A" value={a} onChange={(v) => set("a", v)} />
        <DistrictSelect id="cmp-b" label="B" value={b} onChange={(v) => set("b", v)} />
      </div>
      {km !== null && a !== b && <p className="muted">{t("distanceBetween")}: ~{km} km <span className="small">(not road distance)</span></p>}

      <div className="fx-table-wrap">
        <table className="fx-table">
          <caption className="sr-only">{a} compared with {b}</caption>
          <thead>
            <tr>
              <th scope="col"><span className="sr-only">Feature</span></th>
              <th scope="col"><Link to={guidePath(pa)}>{dn(pa.state, a)}</Link></th>
              <th scope="col"><Link to={guidePath(pb)}>{dn(pb.state, b)}</Link></th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, f], i) => (
              <tr key={`${label}-${i}`}>
                <th scope="row">{label}</th>
                <td>{f(pa)}</td>
                <td>{f(pb)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
