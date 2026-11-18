// The "More" menu. `key` is a translation key; `to` is the route.
export const MENU = [
  {
    group: "groupPlan",
    items: [
      { key: "tripPlanner", to: "/trip", icon: "🗓️" },
      { key: "map", to: "/map", icon: "🗺️" },
      { key: "districts", to: "/districts", icon: "📘" },
      { key: "festivals", to: "/festivals", icon: "🎉" },
      { key: "trails", to: "/trails", icon: "🚩" },
    ],
  },
  {
    group: "groupDiscover",
    items: [
      { key: "nearMe", to: "/near-me", icon: "📍" },
      { key: "compare", to: "/compare", icon: "⚖️" },
      { key: "insights", to: "/insights", icon: "📊" },
    ],
  },
  {
    group: "groupFun",
    items: [
      { key: "quiz", to: "/quiz", icon: "🍛" },
      { key: "passport", to: "/passport", icon: "🛂" },
      { key: "suggest", to: "/suggest", icon: "✍️" },
    ],
  },
];

export const FOOTER_LINKS = [
  { key: "about", to: "/about" },
  { key: "credits", to: "/credits" },
  { key: "privacy", to: "/privacy" },
  { key: "contact", to: "/contact" },
  { key: "suggest", to: "/suggest" },
  { key: "stats", to: "/stats" },
];

export const OPEN_SEARCH_EVENT = "mts:open-search";
export const openSearch = () => window.dispatchEvent(new Event(OPEN_SEARCH_EVENT));
