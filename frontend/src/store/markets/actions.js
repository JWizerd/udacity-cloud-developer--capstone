export default {
  async GET_MARKETS({ commit }) {
    try {
      const markets = await this.$api.get('markets');
      commit("SET_MARKETS", markets);
    } catch (error) {
      console.error(error);
    }
  },
  async CREATE_MARKET({ commit }, market) {
    try {
      const newMarket = await this.$api.post('markets', market);
      commit("ADD_MARKET", newMarket);
    } catch (error) {
      console.error(error);
    }
  }
};