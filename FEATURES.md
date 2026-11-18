# New features (added on top of the existing app)

Nothing that existed was rewritten. All new code lives in `src/features/` plus `supabase-features.sql`.

## The only existing files that were touched
| File | Change |
|---|---|
| `src/App.jsx` | +2 lines: import and `{FEATURE_ROUTES}` |
| `src/layouts/MainLayout.jsx` | +4 lines: "More ▾" menu, search/language buttons, global helpers |
| `vercel.json` | 1 line: `microphone=(self), geolocation=(self)` so Near Me and voice search can ask permission (both were blocked before) |
| `package.json` / `package-lock.json` | + `leaflet` (map) and `qrcode-generator` (QR codes) |

Run `npm install` once after unzipping.

## Pages (all under "More ▾", plus Ctrl+K search)
Trip Planner `#/trip` · Interactive Map `#/map` · District Guides `#/districts`, `#/district/<slug>`, A4 brochure `#/district/<slug>/print`
· Festival Calendar `#/festivals` · Curated Trails `#/trails` · Insights `#/insights` · "What should I eat?" `#/quiz`
· Food Passport `#/passport` · Compare Districts `#/compare` · Near Me + weather `#/near-me` · Suggest a place `#/suggest`
· About / Credits / Privacy / Contact / Visitor numbers `#/about #/credits #/privacy #/contact #/stats`

Polish pack: every new page is lazy-loaded (the original pages load as fast as before), skeleton loaders, page fade-in,
skip link and landmark for keyboard/screen-reader users, offline notice, scroll-to-top on new pages, print styles.

## To switch on the online parts
1. Supabase dashboard → SQL editor → run `supabase-features.sql` once. Suggestions and messages then appear in
   Table editor → `suggestions` (change `status` as you review). Visits appear in `visits`; `#/stats` shows totals.
   Without it everything still works: notes and visit counts stay on the visitor's device.
2. Optional: add `VITE_CONTACT_EMAIL=you@example.com` to `.env` to show an e-mail on the Contact page.

## Things for you to verify (I could not)
* **Coordinates** (`src/features/data/districtMeta.js`, `heritageCoords.js`) are approximate. Check them.
* **District one-liners and festival months** (`districtMeta.js`, `festivals.js`) come from public knowledge. Check locally.
* **Telugu wording** (`src/features/i18n/translations.js` and the Telugu district names) needs a native-speaker review.
  The three original navbar labels (Explore, Heritage Hub, Cultural Trail) stay in English because those lines were left untouched.
* **Privacy page** is a plain-language summary, not legal advice. Review before formal use.
* **Open-Meteo** is free for non-commercial use. Check their terms if the site becomes commercial.
* Voice search works in Chrome (Telugu uses `te-IN`); other browsers show a friendly message.
* The A4 brochure uses the browser's Print dialog: choose "Save as PDF".
* Map tiles need internet; I could not load them in my test environment, so I checked the pins and layout only.

## Not included
Real photos (need licensed images). The stray duplicate folders that were already in the project (`src/src`, flat copies in `src/`) were left as they were.
