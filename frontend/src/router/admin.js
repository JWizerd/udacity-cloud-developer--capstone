import { authGuard } from "../auth";
import Profile from "../views/Profile.vue";
import ManageMarkets from "../views/admin/ManageMarkets";
import ManageMarketSingle from "../views/admin/ManageMarketSingle";
import CreateMarket from "../views/admin/CreateMarket";
import UpdateMarket from "../views/admin/UpdateMarket";

export const AdminRoutes = [
    {
      path: "/profile",
      name: "profile",
      component: Profile,
      beforeEnter: authGuard
    },
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
    {
      path: "/admin/update-market/:marketId",
      name: "update-market",
      component: UpdateMarket,
      beforeEnter: authGuard
    },
]