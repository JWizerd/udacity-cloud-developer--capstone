export default {
  user(state) {
    return state.user;
  },
  isLoggedIn(state) {
    return state.user !== null;
  }
}