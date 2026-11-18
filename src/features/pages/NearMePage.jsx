import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocationSelection } from "../../context/LocationContext";
import DistrictSelect from "../components/DistrictSelect";
import { useLang } from "../i18n/useLang";
import { closestDistrict, districtByName, getProfile, guidePath } from "../lib/districts";
import { usePageTitle } from "../lib/usePageTitle";
import { fetchWeather } from "../lib/weather";

function Weather({ ll }) {
  const { t } = useLang();
  const [state, setState] = useState({ key: "", data: null, error: "" });
  const key = ll.join(",");

  useEffect(() => {
    const ctl = new AbortController();
    fetchWeather(ll, ctl.signal)
      .then((data) => setState({ key, data, error: "" }))
      .catch((e) => e.name !== "AbortError" && setState({ key, data: null, error: "Weather is not available right now." }));
    return () => ctl.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `key` is the stable form of `ll`
  }, [key]);

  if (state.key !== key) return <p className="muted" role="status">{t("loading")}</p>;
  if (state.error) return <p className="muted">{state.error}</p>;
  const { now, days } = state.data;
  return (
    <div className="fx-weather" aria-label={t("weather")}>
      <div className="fx-weather-now">
        <span className="fx-weather-icon" aria-hidden="true">{now.icon}</span>
        <div>
          <p className="fx-weather-temp">{now.temp}°C</p>
          <p>{now.text}. Feels like {now.feels}°C</p>
          <p className="muted small">Humidity {now.humidity}% · Wind {now.wind} km/h</p>
        </div>
      </div>
      <ul className="fx-weather-days">
        {days.map((d, i) => (
          <li key={d.date}>
            <strong>{i === 0 ? t("today") : new Date(`${d.date}T00:00:00`).toLocaleDateString(undefined, { weekday: "short", day: "numeric" })}</strong>
            <span aria-hidden="true">{d.icon}</span>
            <span>{d.max}° / {d.min}°</span>
            <span className="muted small">☔ {d.rain ?? 0}%</span>
          </li>
        ))}
      </ul>
      <p className="muted small">Weather data by Open-Meteo.com.</p>
    </div>
  );
}

export default function NearMePage() {
  const { t, dn } = useLang();
  usePageTitle(t("nearTitle"));
  const loc = useLocationSelection();
  const [status, setStatus] = useState("idle"); // idle | locating | denied | done
  const [found, setFound] = useState(null);
  const [manual, setManual] = useState(loc?.district ?? "Hyderabad");

  const locate = () => {
    if (!navigator.geolocation) {
      setStatus("denied");
      return;
    }
    setStatus("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setFound(closestDistrict([pos.coords.latitude, pos.coords.longitude]));
        setStatus("done");
      },
      () => setStatus("denied"),
      { timeout: 12000, maximumAge: 300000 }
    );
  };

  const chosen = status === "done" && found ? found : districtByName(manual);
  const profile = chosen ? getProfile(chosen.state, chosen.district) : null;

  return (
    <div className="page fx-page narrow">
      <p className="kicker">{t("groupDiscover")}</p>
      <h1>📍 {t("nearTitle")}</h1>
      <p className="lead">{t("nearLead")}</p>

      <div className="trail-actions">
        <button type="button" className="btn" onClick={locate} disabled={status === "locating"}>{status === "locating" ? t("locating") : `📡 ${t("useLocation")}`}</button>
      </div>
      {status === "denied" && <p className="muted" role="alert">{t("locDenied")}</p>}

      <DistrictSelect id="near-manual" label={t("orPick")} value={manual} onChange={(v) => { setManual(v); setStatus("idle"); }} />

      {chosen && profile && (
        <section className="fx-card" aria-live="polite">
          <p className="kicker">{status === "done" ? t("closest") : t("district")}</p>
          <h2 className="fx-h2">{dn(chosen.state, chosen.district)}</h2>
          {status === "done" && <p className="muted small">About {found.km} km from the district headquarters. Near a border the true district may be the neighbouring one.</p>}
          <p>{chosen.knownFor}</p>
          {chosen.ll && <Weather ll={chosen.ll} />}
          <h3 className="fx-h3">{t("topPicks")}</h3>
          <ul className="fx-list compact">
            {profile.topPlaces.slice(0, 3).map((p) => <li key={p.name}><span aria-hidden="true">{p.icon}</span><div><strong>{p.name}</strong></div></li>)}
            {profile.topRestaurants.slice(0, 2).map((r) => <li key={r.name}><span aria-hidden="true">🍽️</span><div><strong>{r.name}</strong> <span className="muted small">{r.dish}</span></div></li>)}
          </ul>
          <Link className="btn btn-sm" to={guidePath(chosen)}>{t("viewGuide")}</Link>
        </section>
      )}
    </div>
  );
}
