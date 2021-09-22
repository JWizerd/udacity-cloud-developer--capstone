export default {
  SET_MARKETS(state, markets) {
    state.markets = [...markets];
  },
  SET_USER_MARKETS(state, markets) {
    state.userMarkets = markets;
  },
  SET_CURRENT_MARKET(state, market) {
    state.currentMarket = market;
  },
  REMOVE_MARKET(state, marketId) {
    const index = state.userMarkets.findIndex(m => m.id === marketId);
    if (index) state.userMarkets.splice(index, 1);
  },
  ADD_MARKET(state, market) {
    state.userMarkets.push(market);
  }
};