import Vue from "vue";
import Vuex from "vuex";
import USERS from "./users";
import MARKETPLACES from "./marketplaces";
import EVENTS from "./events";
import REVIEWS from "./reviews";
import ATTENDEES from "./attendees";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    USERS,
    MARKETPLACES,
    EVENTS,
    REVIEWS,
    ATTENDEES
  }
});