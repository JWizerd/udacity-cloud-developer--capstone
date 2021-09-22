import Vue from "vue";
import Vuex from "vuex";
import USERS from "./users";
import MARKETS from "./markets";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    USERS,
    MARKETS
  }
});