import { authGuard } from "../auth";
import ManageMarkets from "../views/admin/ManageMarkets";
import ManageMarketSingle from "../views/admin/ManageMarketSingle";
import CreateMarket from "../views/admin/CreateMarket";

export const AdminRoutes = [
      {
      path: "/admin/markets",
      name: "my-markets",
      component: ManageMarkets,
      beforeEnter: authGuard
    },
    {
      path: "/admin/markets/:marketId",
      name: "manage-market",
      component: ManageMarketSingle,
      beforeEnter: authGuard
    },
    {
      path: "/admin/create-market",
      name: "create-market",
      component: CreateMarket,
      beforeEnter: authGuard
    },
]