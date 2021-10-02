import { removeItem, updateItem } from "../utils";

export default {
  SET_MARKETPLACES(state, marketplaces) {
    state.marketplaces = marketplaces;
  },
  SET_USER_MARKETPLACES(state, marketplaces) {
    state.userMarketplaces = marketplaces;
  },
  SET_CURRENT_MARKETPLACE(state, market) {
    state.currentMarketplace = market;
  },
  REMOVE_MARKETPLACE(state, marketId) {
    state.userMarketplaces = removeItem(state.userMarketplaces, marketId);
  },
  UPDATE_MARKETPLACE(state, market) {
    state.userMarketplaces = updateItem(state.userMarketplaces, market.id, market);
  },
  REMOVE_USER_MARKETPLACES(state) {
    state.userMarketplaces = {};
  }
};

export const MARKETPLACE_MUTATIONS = {
  SET_MARKETPLACES: "SET_MARKETPLACES",
  SET_USER_MARKETPLACES: "SET_USER_MARKETPLACES" ,
  SET_CURRENT_MARKETPLACE: "SET_CURRENT_MARKETPLACE",
  REMOVE_MARKETPLACE: "REMOVE_MARKETPLACE",
  ADD_MARKETPLACE: "ADD_MARKETPLACE",
  REMOVE_USER_MARKETPLACES: "REMOVE_USER_MARKETPLACES",
  UPDATE_MARKETPLACE: "UPDATE_MARKETPLACE",
}