// "Suggest a place / Report a correction" and the contact form.
// With Supabase keys the note is stored in the `suggestions` table (create it with supabase-features.sql)
// and you review it in the Supabase dashboard. Without keys it is kept on this device only (demo mode).
import { read, write } from "../../services/storage";
import { ONLINE, rpc } from "./supabase";
import { visitorId } from "./analytics";

const LOCAL_KEY = "suggestions";

export const KINDS = [
  { id: "new_place", label: "Suggest a new place" },
  { id: "correction", label: "Report a correction" },
  { id: "other", label: "Something else" },
];
export const CATEGORIES = ["Restaurant", "Famous place", "Shop or market", "Heritage item", "District information", "Other"];

export async function submitSuggestion(s) {
  const clean = {
    p_kind: String(s.kind || "other").slice(0, 20),
    p_state: String(s.state || "").slice(0, 40),
    p_district: String(s.district || "").slice(0, 60),
    p_category: String(s.category || "").slice(0, 40),
    p_name: String(s.name || "").trim().slice(0, 120),
    p_details: String(s.details || "").trim().slice(0, 1000),
    p_contact: String(s.contact || "").trim().slice(0, 120),
    p_token: visitorId(),
  };
  if (!clean.p_details) throw new Error("Please add a few details.");
  if (ONLINE) {
    await rpc("add_suggestion", clean);
    return { mode: "online" };
  }
  const list = read(LOCAL_KEY, []);
  list.unshift({ ...clean, p_token: undefined, at: new Date().toISOString() });
  write(LOCAL_KEY, list.slice(0, 50));
  return { mode: "local" };
}
