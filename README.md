# MTS Famous Places Finder

BY Trinath Bysani. A React + Vite web app that tells visitors what is **famous in every district of
Andhra Pradesh and Telangana**. It is an information app: there are no accounts, no selling and no orders.

## What is inside

| Page | What visitors get |
|---|---|
| **Home** | Pick a state and district, a "Heritage of the day" card, and a visitor feedback wall |
| **Explore** | Famous restaurants (with ratings), famous places, and shops and markets for the district, each with **Open in Maps / Show map** |
| **Heritage Hub** | 45 famous foods, handlooms and crafts, with history, the artisans behind them and a **map of where to find them** at the bottom of every item |
| **Cultural Trail** | Save favourite specialties (no sign-in), plan the whole route in Google Maps, share the list on WhatsApp |

Extras for visitors: dark and light mode, search and filters (state, district, category, GI-tagged only),
"Surprise me", shareable links to any item (`#/heritage?item=h-pochampally`), WhatsApp share buttons,
"where to eat in this district" cross-links, and an installable app experience (Add to Home Screen) that also
opens offline after the first visit.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # 15 tests
npm run lint && npm run build
```

## Deploy (Vercel)

Push to GitHub and import the repository in Vercel. Framework: Vite, build `npm run build`, output `dist`.
The app uses hash links (`/#/heritage`), so no server settings are needed.

## Adding or editing information

Everything lives in `src/data/`:

- `heritageData.js` : Heritage Hub items. Copy an existing entry. Optional fields: `season`, and `mapQuery`
  (the exact text Google Maps should search; by default it is `origin, district, state`).
- `restaurants.js`, `famousPlaces.js`, `shopsMarkets.js` : Explore page data.

Check any "GI-tagged" statement against the official GI registry before using it in formal material.

## Visitor feedback (optional)

The feedback wall works without setup (comments stay in the visitor's browser). To share comments between all
visitors, create a free Supabase project, run `supabase-setup.sql`, then copy `.env.example` to `.env` and fill in
the two values. **Do not commit `.env`** (it is already listed in `.gitignore`).

## Project structure

```
src/
  App.jsx, main.jsx       routes (HashRouter) and providers
  pages/                  HomePage, ResultsPage (Explore), HeritagePage, TrailPage
  components/             HeritageCard, ItemModal, MapPanel, ArtisanSpotlight, FeaturedHeritage, Feedback, ...
  context/                Theme, Toast, Location (selected district), Trail (saved items)
  data/                   all the information shown in the app
  utils/maps.js           Google Maps and WhatsApp link helpers
public/                   favicon, icons, manifest.webmanifest, sw.js (offline support)
```
