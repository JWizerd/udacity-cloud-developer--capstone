export default {
  SET_MARKETPLACES(state, marketplaces) {
    state.marketplaces = marketplaces;
  },
  SET_USER_MARKETS(state, marketplaces) {
    state.userMarketplaces = marketplaces;
  },
  SET_CURRENT_MARKET(state, market) {
    state.currentMarketplace = market;
  },
  REMOVE_MARKET(state, marketId) {
    if (state.userMarketplaces.items.length === 1) {
      state.userMarketplaces.items = [];
    } else {
      const index = state.userMarketplaces.items.findIndex(m => m.id === marketId);
      if (index !== -1) state.userMarketplaces.items.splice(index, 1);
      state.userMarketplaces = {...state.userMarketplaces};
    }
  },
  ADD_MARKET(state, market) {
    state.userMarketplaces.items.push(market);
  },
  REMOVE_USER_MARKETPLACES(state) {
    state.userMarketplaces = {};
  }
};

export const MARKETPLACE_MUTATIONS = {
  SET_MARKETPLACES: "SET_MARKETPLACES",
  SET_USER_MARKETS: "SET_USER_MARKETS" ,
  SET_CURRENT_MARKET: "SET_CURRENT_MARKET",
  REMOVE_MARKET: "REMOVE_MARKET",
  ADD_MARKET: "ADD_MARKET",
  REMOVE_USER_MARKETS: "REMOVE_USER_MARKETS",
}