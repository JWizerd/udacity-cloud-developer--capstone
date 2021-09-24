export default {
  SET_MARKETS(state, markets) {
    state.markets = markets;
  },
  SET_USER_MARKETS(state, markets) {
    state.userMarkets = markets;
  },
  SET_CURRENT_MARKET(state, market) {
    state.currentMarket = market;
  },
  REMOVE_MARKET(state, marketId) {
    if (state.userMarkets.items.length === 1) {
      state.userMarkets.items = [];
    } else {
      const index = state.userMarkets.items.findIndex(m => m.id === marketId);
      if (index) state.userMarkets.items.splice(index, 1);
      state.userMarkets = {...state.userMarkets};
    }
  },
  ADD_MARKET(state, market) {
    state.userMarkets.push(market);
  }
};