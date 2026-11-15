# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## MTS Famous Places Finder - feedback setup

Comments need a free Supabase database so every visitor sees them permanently
(without it the app runs in demo mode and keeps comments only in the visitor's own browser).

1. Create a free project at https://supabase.com
2. SQL Editor -> New query -> paste `supabase-setup.sql` -> Run
3. Project Settings -> API: copy the Project URL and the `anon` public key
4. Local: copy `.env.example` to `.env` and fill both values, then `npm run dev`
5. Vercel: Project -> Settings -> Environment Variables -> add `VITE_SUPABASE_URL` and
   `VITE_SUPABASE_ANON_KEY`, then redeploy

Only the browser that wrote a comment can delete it (enforced inside the database).
