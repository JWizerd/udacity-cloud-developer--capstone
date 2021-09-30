import { MARKETPLACE_MUTATIONS } from "./mutations";

export default {
  async GET_MARKETPLACES({ commit }) {
    const marketplaces = await this.$api.marketplaces.find();
    commit(MARKETPLACE_MUTATIONS.SET_MARKETPLACES, marketplaces);
  },
  async GET_MARKETPLACES_BY_USERS({ commit }) {
    const marketplaces = await this.$api.marketplaces.find({ filterByUser: true });
    commit(MARKETPLACE_MUTATIONS.SET_USER_MARKETS, marketplaces);
  },
  async GET_MARKETPLACE({ commit }, marketId) {
    const market = await this.$api.marketplaces.findOne(marketId);
    commit(MARKETPLACE_MUTATIONS.SET_CURRENT_MARKET, market);
  },
  async CREATE_MARKETPLACE(_, market) {
    await this.$api.marketplaces.create(market);
  },
  async UPDATE_MARKETPLACE(_, market) {
    await this.$api.marketplaces.update(market);
  },
  async DUPLICATE_MARKETPLACE({ dispatch }, market) {
    await this.$api.marketplaces.duplicate(market);
    dispatch(MARKETPLACE_ACTIONS.GET_MARKETPLACES_BY_USERS);
  },
  async DELETE_MARKETPLACE({ commit }, marketId) {
    await this.$api.marketplaces.remove(marketId);
    commit(MARKETPLACE_MUTATIONS.REMOVE_MARKET, marketId);
  }
};

export const MARKETPLACE_ACTIONS = {
  GET_MARKETPLACES_BY_USERS: "GET_MARKETPLACES_BY_USERS",
  DELETE_MARKETPLACE: "DELETE_MARKETPLACE",
  DUPLICATE_MARKETPLACE: "DUPLICATE_MARKETPLACE",
  UPDATE_MARKETPLACE: "UPDATE_MARKETPLACE",
  CREATE_MARKETPLACE: "CREATE_MARKETPLACE",
  GET_MARKETPLACE: "GET_MARKETPLACE",
  GET_MARKETPLACES: "GET_MARKETPLACES"
};
