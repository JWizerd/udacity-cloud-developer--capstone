export default {
  SET_USER(state, user) {
    state.user = user;
  },
  REMOVE_USER(state) {
    state.user = null;
  },
}

export const USER_MUTATIONS = {
 SET_USER: "SET_USER",
 REMOVE_USER: "REMOVE_USER"
}