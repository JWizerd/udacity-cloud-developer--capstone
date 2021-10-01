import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

export default {
  state: () => ({
    reviews: {}
  }),
  getters,
  mutations,
  actions
}