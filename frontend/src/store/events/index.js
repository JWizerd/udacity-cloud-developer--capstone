import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

export default {
  state: () => ({
    events: {},
    userEvents: {},
    currentEvent: null,
  }),
  getters,
  mutations,
  actions
}