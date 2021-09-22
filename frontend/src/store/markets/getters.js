export default {
  markets(state) {
    return [...state.markets];
  },
  currentMarket(state) {
    return state.currentMarket;
  },
  marketSchemaCreate(state) {
    return state.marketSchemaCreate;
  }
};
