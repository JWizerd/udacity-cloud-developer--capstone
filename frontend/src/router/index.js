import Vue from "vue";
import Router from "vue-router";
import { AdminRoutes } from "./admin";
import { MarketRoutes } from "./markets";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    ...MarketRoutes,
    ...AdminRoutes
  ]
});

export default router;
