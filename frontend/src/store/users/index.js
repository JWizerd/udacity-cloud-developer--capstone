import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";

export default {
  state: () => ({
    user: null,
    isLoggedIn: localStorage.getItem('isLoggedIn') || false
  }),
  actions,
  getters,
  mutations
}