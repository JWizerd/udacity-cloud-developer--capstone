import { authGuard } from "../auth";
import Profile from "../views/Profile.vue";
import ManageMarketplaces from "../views/admin/marketplaces/ManageMarketplaces";
import CreateMarketplace from "../views/admin/marketplaces/CreateMarketplace";
import UpdateMarketplace from "../views/admin/marketplaces/UpdateMarketplace";
import ManageEvents from "../views/admin/events/ManageEvents";
import CreateEvent from "../views/admin/events/CreateEvent";
import UpdateEvent from "../views/admin/events/UpdateEvent";

export const AdminRoutes = [
    {
      path: "/profile",
      name: "profile",
      component: Profile,
      beforeEnter: authGuard
    },
    {
      path: "/admin/marketplaces",
      name: "my-marketplaces",
      component: ManageMarketplaces,
      beforeEnter: authGuard
    },
    {
      path: "/admin/marketplaces/create-marketplace",
      name: "create-marketplace",
      component: CreateMarketplace,
      beforeEnter: authGuard
    },
    {
      path: "/admin/marketplaces/:marketplaceId",
      name: "update-marketplace",
      component: UpdateMarketplace,
      beforeEnter: authGuard
    },
    {
      path: "/admin/marketplaces/:marketplaceId/events",
      name: "marketplace-events",
      component: ManageEvents,
      beforeEnter: authGuard
    },
    {
      path: "/admin/marketplaces/:marketplaceId/events/create-event",
      name: "create-event",
      component: CreateEvent,
      beforeEnter: authGuard
    },
    {
      path: "/admin/marketplaces/:marketplaceId/events/:eventId",
      name: "update-event",
      component: UpdateEvent,
      beforeEnter: authGuard
    },
]