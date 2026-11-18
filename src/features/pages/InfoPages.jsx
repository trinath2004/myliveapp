import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FAMOUS_PLACES, RESTAURANTS, SHOPS_MARKETS } from "../../data/data";
import { HERITAGE_SEED } from "../../data/heritageData";
import BarChart from "../components/BarChart";
import { SuggestForm } from "./SuggestPage";
import { useLang } from "../i18n/useLang";
import { ANALYTICS_ONLINE, localStats, remoteStats } from "../lib/analytics";
import { ALL_DISTRICTS } from "../lib/districts";
import { usePageTitle } from "../lib/usePageTitle";

const count = (obj) => Object.values(obj).reduce((a, s) => a + Object.values(s).reduce((b, l) => b + l.length, 0), 0);
const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL;

function Shell({ kicker, title, children }) {
  usePageTitle(title);
  return (
    <div className="page fx-page narrow fx-prose">
      <p className="kicker">{kicker}</p>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

export function AboutPage() {
  const { t } = useLang();
  return (
    <Shell kicker={t("groupAbout")} title={t("aboutTitle")}>
      <p className="lead">MTS Heritage Hub is a free guide to the famous places, food, markets, handlooms and crafts of Andhra Pradesh and Telangana. It is for visitors, students and anyone curious about the two states.</p>
      <div className="fx-stats" aria-label="Coverage">
        {[["Districts", ALL_DISTRICTS.length], ["Restaurants", count(RESTAURANTS)], ["Places", count(FAMOUS_PLACES)], ["Shops & markets", count(SHOPS_MARKETS)], ["Heritage items", HERITAGE_SEED.length]].map(([l, n]) => <div key={l} className="fx-stat"><strong>{n}</strong><span>{l}</span></div>)}
      </div>
      <h2 className="fx-h2">What you can do here</h2>
      <ul>
        <li>Plan a day-by-day trip, open each day's route in Google Maps, print it or send it on WhatsApp.</li>
        <li>Explore every district on a map and in its own shareable guide.</li>
        <li>Check the festival calendar, follow a curated trail, collect Food Passport stamps.</li>
      </ul>
      <h2 className="fx-h2">How accurate is it?</h2>
      <p>The information comes from widely documented public knowledge. Map pins use approximate coordinates, and festival dates are given as months because many follow the lunar calendar. Please confirm opening times, prices and dates locally before you travel. Nothing here is for sale: the site does not sell anything and has no payments.</p>
      <p>Found a mistake or a missing place? <Link to="/suggest">Tell us</Link>.</p>
      <p><Link to="/credits">Credits</Link> · <Link to="/privacy">Privacy</Link> · <Link to="/contact">Contact</Link> · <Link to="/stats">Visitor numbers</Link></p>
    </Shell>
  );
}

export function CreditsPage() {
  const { t } = useLang();
  const rows = [
    ["Map tiles and data", "© OpenStreetMap contributors", "https://www.openstreetmap.org/copyright"],
    ["Map library", "Leaflet (BSD-2-Clause)", "https://leafletjs.com"],
    ["Weather", "Open-Meteo.com (CC BY 4.0)", "https://open-meteo.com"],
    ["QR codes", "qrcode-generator (MIT)", "https://github.com/kazuhikoarase/qrcode-generator"],
    ["Directions and place links", "Google Maps (opened in a new tab; no Google code runs on this site)", "https://www.google.com/maps"],
    ["Feedback and suggestions storage", "Supabase", "https://supabase.com"],
    ["Built with", "React, Vite and React Router", "https://react.dev"],
  ];
  return (
    <Shell kicker={t("groupAbout")} title={t("creditsTitle")}>
      <p className="lead">This guide stands on the work of many people and projects.</p>
      <ul className="fx-list plain">
        {rows.map(([what, who, href]) => <li key={what}><div><strong>{what}</strong><p><a href={href} target="_blank" rel="noopener noreferrer">{who}</a></p></div></li>)}
      </ul>
      <h2 className="fx-h2">The information</h2>
      <p>District facts, festival months and descriptions come from public knowledge and have been written in our own words. Artisans are described as communities and clusters, never as named individuals. No photographs are used.</p>
      <p>Created by Trinath Bysani. Telugu wording is a first draft and is waiting for a native-speaker review.</p>
    </Shell>
  );
}

export function PrivacyPage() {
  const { t } = useLang();
  return (
    <Shell kicker={t("groupAbout")} title={t("privacyTitle")}>
      <p className="lead">Short version: no accounts, no ads, no selling anything, and no personal details are needed to use this site.</p>
      <h2 className="fx-h2">Kept only on your device</h2>
      <p>Your Cultural Trail, Food Passport stamps, saved trip, theme and language are stored in your browser. They never leave your device. Clearing your browser data removes them.</p>
      <h2 className="fx-h2">Visitor statistics</h2>
      <p>To count visits, the site records which page was opened, the day, your chosen language and a random identifier stored on your device. It has no name, e-mail or location. If your browser's “Do Not Track” setting is on, nothing is sent.</p>
      <h2 className="fx-h2">Things you choose to send</h2>
      <ul>
        <li><strong>Suggestions, corrections and messages</strong> are stored for the site team to review. Giving an e-mail or phone number is optional.</li>
        <li><strong>Feedback</strong> left on the feedback wall is stored online for display.</li>
      </ul>
      <h2 className="fx-h2">Location, voice and maps</h2>
      <ul>
        <li><strong>Location</strong> is requested only when you press a location button. It is used on your device to pick the closest district. Weather is requested for that district's headquarters, rounded to about 1 km, and not for your exact spot. Your position is not stored.</li>
        <li><strong>Voice search</strong> uses your browser's speech service, which may send the audio to the browser maker (for example Google for Chrome). The site itself does not record it.</li>
        <li><strong>Maps</strong> load tiles from OpenStreetMap, which can see your IP address and the map area, like any website. Links to Google Maps open in a new tab and are governed by Google's policy.</li>
      </ul>
      <h2 className="fx-h2">Questions or removal requests</h2>
      <p>Use the <Link to="/contact">contact page</Link>. This page is a plain-language summary and should be reviewed by the site owner before the site is used formally.</p>
    </Shell>
  );
}

export function ContactPage() {
  const { t } = useLang();
  return (
    <Shell kicker={t("groupAbout")} title={t("contactTitle")}>
      <p className="lead">Questions, ideas, or something to correct? Send a note below.</p>
      {CONTACT_EMAIL && <p>You can also write to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>}
      <SuggestForm contactMode />
      <p className="muted small">To suggest a new place or report a wrong detail, the <Link to="/suggest">suggestion form</Link> asks for the right details.</p>
    </Shell>
  );
}

export function StatsPage() {
  const { t } = useLang();
  usePageTitle(t("statsTitle"));
  const [days, setDays] = useState(30);
  const [remote, setRemote] = useState({ key: "", data: null, error: false });
  const local = localStats();

  useEffect(() => {
    if (!ANALYTICS_ONLINE) return;
    let live = true;
    remoteStats(days)
      .then((data) => live && setRemote({ key: String(days), data, error: false }))
      .catch(() => live && setRemote({ key: String(days), data: null, error: true }));
    return () => {
      live = false;
    };
  }, [days]);

  const loading = ANALYTICS_ONLINE && remote.key !== String(days);
  const data = remote.key === String(days) ? remote.data : null;

  return (
    <Shell kicker={t("groupAbout")} title={t("statsTitle")}>
      <p className="lead">Page views and unique visitors. Only totals are shown, never individuals.</p>
      {ANALYTICS_ONLINE ? (
        <>
          <div className="chips" role="group" aria-label="Period">
            {[7, 30, 90].map((n) => <button key={n} type="button" className={days === n ? "chip active" : "chip"} aria-pressed={days === n} onClick={() => setDays(n)}>Last {n} days</button>)}
          </div>
          {loading && <p className="muted" role="status">{t("loading")}</p>}
          {remote.error && !loading && <p className="muted">The visitor database is not reachable. Run supabase-features.sql in your Supabase project to turn it on.</p>}
          {data && (
            <>
              <div className="fx-stats">
                <div className="fx-stat"><strong>{data.totals?.views ?? 0}</strong><span>Page views</span></div>
                <div className="fx-stat"><strong>{data.totals?.visitors ?? 0}</strong><span>Unique visitors</span></div>
              </div>
              <h2 className="fx-h2">Most visited pages</h2>
              <BarChart rows={(data.pages ?? []).map((p) => ({ label: p.path, value: p.views }))} label="Most visited pages" />
              <h2 className="fx-h2">Views by day</h2>
              <BarChart rows={(data.days ?? []).slice(0, 14).map((d) => ({ label: d.day, value: d.views }))} label="Views per day" hue="#10b981" />
            </>
          )}
        </>
      ) : (
        <p className="muted">The online visitor database is not connected, so only visits from this device are shown below.</p>
      )}
      <h2 className="fx-h2">This device only</h2>
      <p>{local.totalViews} page views recorded here.</p>
      {local.pages.length > 0 && <BarChart rows={local.pages.map((p) => ({ label: p.path, value: p.views }))} label="Pages opened on this device" hue="#6366f1" />}
    </Shell>
  );
}
