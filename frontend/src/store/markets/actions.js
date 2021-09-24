export default {
  async GET_MARKETS({ commit }) {
    const markets = await this.$api.markets.find();
    commit("SET_MARKETS", markets);
  },
  async GET_MARKETS_BY_USERS({ commit }) {
    const markets = await this.$api.markets.find({ filterByUser: true });
    commit("SET_USER_MARKETS", markets);
  },
  async GET_MARKET({ commit }, marketId) {
    const market = await this.$api.markets.findOne(marketId);
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
    await this.$api.markets.remove(marketId);
    commit("REMOVE_MARKET", marketId);
  }
};