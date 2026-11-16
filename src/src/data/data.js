import { RESTAURANTS } from "./restaurants";
import { FAMOUS_PLACES } from "./famousPlaces";
import { SHOPS_MARKETS } from "./shopsMarkets";

export const DATA = Object.fromEntries(
  Object.entries(RESTAURANTS).map(([state, districts]) => [
    state,
    Object.fromEntries(Object.keys(districts).map((district) => [district, true])),
  ])
);

export { FAMOUS_PLACES, RESTAURANTS, SHOPS_MARKETS };
