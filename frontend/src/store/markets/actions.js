export default {
  async GET_MARKETS({ commit }) {
    const { data } = await this.$api.get('markets');
    commit("SET_MARKETS", data.items);
  },
  async GET_MARKETS_BY_USERS({ commit }) {
    const { data } = await this.$api.markets.find({ filterByUser: true });
    commit("SET_USER_MARKETS", data.items);
  },
  async GET_MARKET({ commit }, marketId) {
    commit("SET_CURRENT_MARKET", null);
    const { data: market } = await this.$api.markets.findOne(marketId);
    commit("SET_CURRENT_MARKET", market);
  },
  async CREATE_MARKET(_, market) {
    await this.$api.markets.create(market);
  },
  async UPDATE_MARKET(_, market) {
    await this.$api.markets.update(market);
  },
  async DUPLICATE_MARKET({ dispatch }, market) {
    await this.$api.markets.duplicate(market);
    dispatch("GET_MARKETS_BY_USERS");
  },
  async DELETE_MARKET({ commit }, marketId) {
    await this.$api.markets.delete(marketId);
    commit("REMOVE_MARKET", marketId);
  }
};