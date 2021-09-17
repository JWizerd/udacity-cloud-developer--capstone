export default {
  async CREATE_USER({ commit }, user) {
    let { data: currentUser } = await this.$api.get('users/me');
    const { sub: userUuid, picture: headshot, email } = user;

    if (!currentUser) {
      currentUser = await this.$api.post('users', { userUuid, headshot, email });
    }

    commit("SET_USER", currentUser);
  }
}