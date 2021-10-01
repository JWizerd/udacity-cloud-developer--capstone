import Marketplaces from "../views/Marketplaces.vue"
import Marketplace from "../views/Marketplace";

export const MarketplaceRoutes = [
  {
    path: "/",
    name: "marketplaces",
    component: Marketplaces
  },
  {
    path: "/marketplaces/:marketplaceId",
    name: "marketplace",
    component: Marketplace
  },
]