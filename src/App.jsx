import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import { LocationProvider } from "./context/LocationContext";
import { TrailProvider } from "./context/TrailContext";

import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import ResultsPage from "./pages/ResultsPage";
import HeritagePage from "./pages/HeritagePage";
import TrailPage from "./pages/TrailPage";
import { NotFoundPage } from "./pages/StatusPages";
import { FEATURE_ROUTES } from "./features"; // new pages (trip planner, map, guides, ...)

/**
 * A public, information-only app: no accounts, no selling. HashRouter keeps deep links working on
 * any static host (Vercel, Netlify, GitHub Pages) without server rewrites.
 */
export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <HashRouter>
          <LocationProvider>
            <TrailProvider>
              <Routes>
                <Route element={<MainLayout />}>
                  <Route index element={<HomePage />} />
                  <Route path="explore" element={<ResultsPage />} />
                  <Route path="heritage" element={<HeritagePage />} />
                  <Route path="trail" element={<TrailPage />} />

                  {FEATURE_ROUTES}

                  {/* Old links from earlier versions */}
                  <Route path="wishlist" element={<Navigate to="/trail" replace />} />
                  <Route path="home" element={<Navigate to="/" replace />} />
                  {["login", "cart", "orders", "admin/*"].map((p) => (
                    <Route key={p} path={p} element={<Navigate to="/" replace />} />
                  ))}
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </TrailProvider>
          </LocationProvider>
        </HashRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}
