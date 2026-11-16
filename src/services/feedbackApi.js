// Feedback storage.
// - With Supabase keys (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY): comments are saved
//   permanently in the database and shown to every visitor.
// - Without keys: falls back to this browser's localStorage (demo mode).
// Each browser gets a secret token. Only the browser holding the token that wrote a
// comment can delete it (the check happens inside the database, not in the page).

const URL = import.meta.env.VITE_SUPABASE_URL;
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const IS_ONLINE = Boolean(URL && KEY);

const TOKEN_KEY = "mts_owner_token";
const LOCAL_KEY = "mts_local_comments";

function makeToken() {
  if (globalThis.crypto?.randomUUID) return crypto.randomUUID() + crypto.randomUUID();
  return Array.from({ length: 4 }, () => Math.random().toString(36).slice(2)).join("");
}

function getToken() {
  try {
    let t = localStorage.getItem(TOKEN_KEY);
    if (!t) {
      t = makeToken();
      localStorage.setItem(TOKEN_KEY, t);
    }
    return t;
  } catch {
    return "session-" + makeToken();
  }
}

async function rpc(fn, body) {
  const res = await fetch(`${URL}/rest/v1/rpc/${fn}`, {
    method: "POST",
    headers: {
      apikey: KEY,
      Authorization: `Bearer ${KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

function readLocal() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
  } catch {
    return [];
  }
}
function writeLocal(list) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(list));
  } catch {
    /* storage unavailable */
  }
}

export async function listComments() {
  if (!IS_ONLINE) return readLocal().map((c) => ({ ...c, mine: true }));
  return rpc("list_comments", { p_token: getToken() });
}

export async function addComment(name, message) {
  if (!IS_ONLINE) {
    const list = readLocal();
    list.unshift({ id: Date.now(), name, message, created_at: new Date().toISOString() });
    writeLocal(list);
    return;
  }
  await rpc("add_comment", { p_name: name, p_message: message, p_token: getToken() });
}

export async function deleteComment(id) {
  if (!IS_ONLINE) {
    writeLocal(readLocal().filter((c) => c.id !== id));
    return true;
  }
  return rpc("delete_comment", { p_id: id, p_token: getToken() });
}
