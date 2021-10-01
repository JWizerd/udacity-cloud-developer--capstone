import Marketplaces from "../views/Marketplaces.vue"
import MarketplaceSingle from "../views/MarketplaceSingle";

export const MarketplaceRoutes = [
  {
    path: "/",
    name: "marketplaces",
    component: Marketplaces
  },
  {
    path: "/marketplaces/:marketplaceId",
    name: "marketplace",
    component: MarketplaceSingle
  },
]