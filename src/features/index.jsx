/* eslint-disable react-refresh/only-export-components -- this file is a route registry, not a component module */
import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { PageSkeleton } from "./components/Skeleton";
import "./styles/features.css";

// All new pages are loaded on demand (code splitting), so the original pages load exactly as fast as before
// and heavy libraries (the map, QR codes) are only downloaded by visitors who open those pages.
const lazyNamed = (loader, name) => lazy(() => loader().then((m) => ({ default: m[name] })));

const TripPlannerPage = lazy(() => import("./pages/TripPlannerPage"));
const MapPage = lazy(() => import("./pages/MapPage"));
const DistrictsIndexPage = lazyNamed(() => import("./pages/DistrictPages"), "DistrictsIndexPage");
const DistrictGuidePage = lazyNamed(() => import("./pages/DistrictPages"), "DistrictGuidePage");
const DistrictPrintPage = lazyNamed(() => import("./pages/DistrictPages"), "DistrictPrintPage");
const FestivalsPage = lazy(() => import("./pages/FestivalsPage"));
const TrailsPage = lazy(() => import("./pages/TrailsPage"));
const InsightsPage = lazy(() => import("./pages/InsightsPage"));
const QuizPage = lazy(() => import("./pages/QuizPage"));
const PassportPage = lazy(() => import("./pages/PassportPage"));
const ComparePage = lazy(() => import("./pages/ComparePage"));
const NearMePage = lazy(() => import("./pages/NearMePage"));
const SuggestPage = lazy(() => import("./pages/SuggestPage"));
const AboutPage = lazyNamed(() => import("./pages/InfoPages"), "AboutPage");
const CreditsPage = lazyNamed(() => import("./pages/InfoPages"), "CreditsPage");
const PrivacyPage = lazyNamed(() => import("./pages/InfoPages"), "PrivacyPage");
const ContactPage = lazyNamed(() => import("./pages/InfoPages"), "ContactPage");
const StatsPage = lazyNamed(() => import("./pages/InfoPages"), "StatsPage");

const ROUTES = [
  ["trip", TripPlannerPage],
  ["map", MapPage],
  ["districts", DistrictsIndexPage],
  ["district/:slug", DistrictGuidePage],
  ["district/:slug/print", DistrictPrintPage],
  ["festivals", FestivalsPage],
  ["trails", TrailsPage],
  ["insights", InsightsPage],
  ["quiz", QuizPage],
  ["passport", PassportPage],
  ["compare", ComparePage],
  ["near-me", NearMePage],
  ["suggest", SuggestPage],
  ["about", AboutPage],
  ["credits", CreditsPage],
  ["privacy", PrivacyPage],
  ["contact", ContactPage],
  ["stats", StatsPage],
];

/** Drop this array inside <Route element={<MainLayout />}> in App.jsx. */
export const FEATURE_ROUTES = ROUTES.map(([path, Page]) => (
  <Route key={path} path={path} element={<Suspense fallback={<PageSkeleton />}><Page /></Suspense>} />
));
