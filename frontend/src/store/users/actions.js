export default {
  async CREATE_USER({ commit }, user) {
    let { data: currentUser } = await this.$api.users.me();
    const { sub: userUuid, picture: headshot, email } = user;

    if (!currentUser) {
      currentUser = await this.$api.users.create({ userUuid, headshot, email });
    }

    commit("SET_USER", currentUser);
  },
  LOGOUT({ commit }) {
    commit("REMOVE_USER");
    commit("REMOVE_USER_MARKETS");
  },
}