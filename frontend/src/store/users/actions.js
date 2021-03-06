import { USER_MUTATIONS } from "./mutations";
import { MARKETPLACE_MUTATIONS } from "../marketplaces/mutations";

export default {
  async CREATE_USER({ commit }, user) {
    let currentUser = await this.$api.users.findOne(user.sub);

    if (!currentUser) {
      const { sub: id, picture: headshot, email } = user;
      currentUser = await this.$api.users.create({ id, headshot, email });
    }

    commit(USER_MUTATIONS.SET_USER, currentUser);
  },
  LOGOUT({ commit }) {
    commit(USER_MUTATIONS.REMOVE_USER);
    commit(MARKETPLACE_MUTATIONS.REMOVE_USER_MARKETPLACES);
  },
}

export const USER_ACTIONS = {
  CREATE_USER: "CREATE_USER",
  LOGOUT: "LOGOUT",
}