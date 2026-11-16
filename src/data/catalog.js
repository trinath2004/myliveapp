import { FAMOUS_PLACES, RESTAURANTS, SHOPS_MARKETS } from "./data";

export function getRestaurants(state, district) {
  return RESTAURANTS[state]?.[district] ?? [];
}

export function getPlaces(state, district) {
  return {
    famous: FAMOUS_PLACES[state]?.[district] ?? [],
    shops: SHOPS_MARKETS[state]?.[district] ?? [],
  };
}
