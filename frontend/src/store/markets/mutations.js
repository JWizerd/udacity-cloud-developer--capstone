export default {
  SET_MARKETS(state, markets) {
    state.markets = [...markets];
  },
  SET_CURRENT_MARKET(state, market) {
    state.currentMarket = market;
  },
  SET_MARKET_CREATE_SCHEMA(state, schema) {
    state.marketSchemaCreate = schema;
  }
};