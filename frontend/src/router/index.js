import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";
import { authGuard } from "../auth";
import { AdminRoutes } from "./admin";
import { MarketRoutes } from "./markets";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
      beforeEnter: authGuard
    },
    ...MarketRoutes,
    ...AdminRoutes
  ]
});

export default router;
