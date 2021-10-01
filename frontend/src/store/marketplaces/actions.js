import { MARKETPLACE_MUTATIONS } from "./mutations";

export default {
  async GET_MARKETPLACES({ commit }) {
    const marketplaces = await this.$api.marketplaces.find();
    commit(MARKETPLACE_MUTATIONS.SET_MARKETPLACES, marketplaces);
  },
  async GET_MARKETPLACES_BY_USERS({ commit }) {
    const marketplaces = await this.$api.marketplaces.find({ filterByUser: true });
    commit(MARKETPLACE_MUTATIONS.SET_USER_MARKETPLACES, marketplaces);
  },
  async GET_MARKETPLACE({ commit }, marketId) {
    const market = await this.$api.marketplaces.findOne(marketId);
    commit(MARKETPLACE_MUTATIONS.SET_CURRENT_MARKETPLACE, market);
  },
  async CREATE_MARKETPLACE({ commit }, market) {
    await this.$api.marketplaces.create(market);
    commit(MARKETPLACE_MUTATIONS.ADD_MARKETPLACE, market);
  },
  async UPDATE_MARKETPLACE({ commit }, market) {
    await this.$api.marketplaces.update(market);
    commit(MARKETPLACE_MUTATIONS.UPDATE_MARKETPLACE, market);
  },
  async DELETE_MARKETPLACE({ commit }, marketId) {
    await this.$api.marketplaces.remove(marketId);
    commit(MARKETPLACE_MUTATIONS.REMOVE_MARKETPLACE, marketId);
  }
};

export const MARKETPLACE_ACTIONS = {
  GET_MARKETPLACES_BY_USERS: "GET_MARKETPLACES_BY_USERS",
  DELETE_MARKETPLACE: "DELETE_MARKETPLACE",
  UPDATE_MARKETPLACE: "UPDATE_MARKETPLACE",
  CREATE_MARKETPLACE: "CREATE_MARKETPLACE",
  GET_MARKETPLACE: "GET_MARKETPLACE",
  GET_MARKETPLACES: "GET_MARKETPLACES"
};
