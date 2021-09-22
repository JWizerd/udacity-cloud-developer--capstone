import Markets from "../views/Markets.vue"
import MarketSingle from "../views/MarketSingle";

export const MarketRoutes = [
  {
    path: "/",
    name: "markets",
    component: Markets
  },
  {
    path: "/markets/:marketId",
    name: "market",
    component: MarketSingle
  },
]