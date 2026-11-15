# MTS - Famous Places Finder

BY Trinath Bysani

Pick a state and district in Andhra Pradesh or Telangana to see its famous restaurants (with ratings),
famous places, and shops and markets, each with its location and a Google Maps link.
Visitors can also leave feedback and suggestions; only the author of a comment can delete it.

## Run locally

```bash
npm install
npm run dev
```

## Project structure

```
src/
  restaurants.js     restaurants by state and district (name, cuisine, rating, area, famous dish)
  famousPlaces.js    temples, forts, beaches, waterfalls, lakes, dams, museums, wildlife
  shopsMarkets.js    shops, markets, sweets, handloom and handicrafts
  feedbackApi.js     feedback storage (Supabase, with a local fallback)
  components/        Home, Results, RestaurantCard, ShopCard, Feedback, Logo
  App.jsx, main.jsx, index.css
supabase-setup.sql   one-time database setup for the feedback section
```

To add an entry, add one line to the right district in `restaurants.js`, `famousPlaces.js` or `shopsMarkets.js`.
Ratings are approximate (out of 5); `rating: null` shows as "Local favourite".

## Feedback database setup

Comments need a free Supabase project so every visitor sees them (without it the app runs in demo mode
and keeps comments only in the visitor's own browser).

1. Create a project at https://supabase.com
2. SQL Editor -> New query -> paste `supabase-setup.sql` -> Run
3. Project Settings -> API Keys: copy the Project URL and the publishable (or anon) key
4. Create `.env.local` with:
   ```
   VITE_SUPABASE_URL=https://YOUR-PROJECT-ID.supabase.co
   VITE_SUPABASE_ANON_KEY=YOUR-KEY
   ```
5. On Vercel add the same two variables under Settings -> Environment Variables, then redeploy.

## Deploy

Push to GitHub and import the repository on Vercel (Vite is detected automatically).
