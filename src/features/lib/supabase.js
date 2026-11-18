// Tiny Supabase RPC helper for the new features. It uses the same two environment variables as the
// existing feedback wall (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY) and only calls database
// functions created by supabase-features.sql. Without the keys the features fall back to this device.
const URL = import.meta.env.VITE_SUPABASE_URL;
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const ONLINE = Boolean(URL && KEY);

export async function rpc(fn, body) {
  const res = await fetch(`${URL}/rest/v1/rpc/${fn}`, {
    method: "POST",
    headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    keepalive: true,
  });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}
