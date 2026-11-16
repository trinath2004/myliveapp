import { describe, it, expect } from "vitest";
import { render, screen, within, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";
import { HERITAGE_SEED } from "../data/heritageData";

const go = (hash) => {
  window.location.hash = hash;
  return render(<App />);
};
const pageText = () => document.body.textContent;
// Item cards only (the artisan spotlight is also an <article>).
const cards = () => screen.queryAllByRole("article").filter((el) => el.classList.contains("h-card"));
const findCards = async () => { await screen.findAllByRole("article"); return cards(); };

describe("information-only app (no accounts, no selling)", () => {
  it("has no sign-in, cart, orders, admin, price or role wording on any main page", async () => {
    for (const hash of ["#/", "#/explore", "#/heritage", "#/trail"]) {
      const { unmount } = go(hash);
      await screen.findAllByText(/MTS/);
      const t = pageText();
      for (const bad of [/sign in/i, /log ?in/i, /\bcart\b/i, /\borders?\b/i, /\badmin\b/i, /₹/, /add to cart/i, /in stock/i, /super admin/i]) {
        expect(t, `${hash} should not match ${bad}`).not.toMatch(bad);
      }
      unmount();
    }
  });

  it("sends old account and shop links back to the home page", async () => {
    for (const hash of ["#/login", "#/cart", "#/orders", "#/admin/users"]) {
      const { unmount } = go(hash);
      expect(await screen.findByText("Famous Places Finder")).toBeTruthy();
      unmount();
    }
  });

  it("shows a Heritage of the day card on the home page", async () => {
    go("#/");
    const card = await screen.findByLabelText("Heritage of the day");
    expect(within(card).getByText("Read the story")).toBeTruthy();
    expect(within(card).getByText(/Open in Maps/).getAttribute("href")).toContain("google.com/maps/search");
  });
});

describe("Heritage Hub", () => {
  it("puts an Open in Maps link and a Show map button at the bottom of EVERY item card", async () => {
    go("#/heritage");
    const all = await findCards();
    expect(all).toHaveLength(HERITAGE_SEED.length);
    for (const card of all) {
      const link = within(card).getByText("Open in Maps");
      expect(link.getAttribute("href")).toMatch(/^https:\/\/www\.google\.com\/maps\/search\/\?api=1&query=/);
      expect(within(card).getByText("Show map")).toBeTruthy();
    }
  });

  it("opens the right map for an item and toggles the inline map", async () => {
    go("#/heritage?q=pochampally");
    const card = (await findCards())[0];
    expect(within(card).getByText("Open in Maps").getAttribute("href")).toContain(encodeURIComponent("Bhoodan Pochampally, Yadadri Bhuvanagiri, Telangana"));
    expect(card.querySelector("iframe")).toBeNull();
    fireEvent.click(within(card).getByText("Show map"));
    expect(card.querySelector("iframe").getAttribute("src")).toContain("output=embed");
    fireEvent.click(within(card).getByText("Hide map"));
    expect(card.querySelector("iframe")).toBeNull();
  });

  it("filters by search, category and GI tag", async () => {
    go("#/heritage");
    await findCards();
    fireEvent.change(screen.getByPlaceholderText(/Search/), { target: { value: "kalamkari" } });
    await waitFor(() => expect(cards().length).toBeLessThan(6));
    fireEvent.change(screen.getByPlaceholderText(/Search/), { target: { value: "" } });
    fireEvent.click(screen.getByText(/Traditional Handlooms/));
    await waitFor(() => expect(cards()).toHaveLength(HERITAGE_SEED.filter((i) => i.category === "handloom").length));
    fireEvent.click(screen.getByText(/GI-tagged only/));
    await waitFor(() => expect(cards()).toHaveLength(HERITAGE_SEED.filter((i) => i.category === "handloom" && i.gi).length));
  });

  it("opens a shareable deep link with a map at the bottom of the details window", async () => {
    go("#/heritage?item=h-pochampally");
    const dialog = await screen.findByRole("dialog");
    expect(within(dialog).getByText("Pochampally Ikat Sarees")).toBeTruthy();
    expect(within(dialog).getByText("📜 History & background")).toBeTruthy();
    expect(dialog.querySelector("iframe").getAttribute("src")).toContain("output=embed");
    expect(within(dialog).getByText("Open in Maps")).toBeTruthy();
    expect(within(dialog).getByText(/Share on WhatsApp/).getAttribute("href")).toContain("wa.me");
    expect(within(dialog).getByText(/Where to eat, what to see/)).toBeTruthy();
    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });
});

describe("Cultural Trail (no login needed)", () => {
  it("saves items, remembers them, and plans a Google Maps route", async () => {
    const { unmount } = go("#/heritage?q=pochampally");
    const card = (await findCards())[0];
    fireEvent.click(within(card).getByLabelText("Add to Cultural Trail"));
    expect(JSON.parse(localStorage.getItem("mts:trail"))).toEqual(["h-pochampally"]);
    unmount();

    go("#/heritage?q=gadwal");
    fireEvent.click(within((await findCards())[0]).getByLabelText("Add to Cultural Trail"));
    window.location.hash = "#/trail";
    await waitFor(() => expect(screen.getByText(/saved across 2 districts/)).toBeTruthy());
    const route = screen.getByText(/Plan route in Google Maps/);
    expect(route.getAttribute("href")).toContain("google.com/maps/dir");
    expect(screen.getByText(/Share on WhatsApp/).getAttribute("href")).toContain("wa.me");
    fireEvent.click(screen.getByText("Clear trail"));
    await waitFor(() => expect(screen.getByText("Your trail is empty")).toBeTruthy());
  });
});

describe("Explore (original finder)", () => {
  it("still opens a district from the home page", async () => {
    go("#/");
    fireEvent.click(await screen.findByText("Enter"));
    await waitFor(() => expect(window.location.hash).toBe("#/explore"));
    expect(await screen.findByText(/Famous restaurants, places and markets in this district/)).toBeTruthy();
  });
});
