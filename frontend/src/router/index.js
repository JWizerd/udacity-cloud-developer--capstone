import Vue from "vue";
import Router from "vue-router";
import { AdminRoutes } from "./admin";
import { MarketplaceRoutes } from "./marketplaces";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    ...MarketplaceRoutes,
    ...AdminRoutes
  ]
});

export default router;
