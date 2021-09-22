import { CONSTANTS } from "./constants";
import axios from "axios";
import { actionResolver } from "../action-resolver";
export default {
  async GET_MARKETS({ commit }) {
    try {
      const { data } = await this.$api.get('markets');
      commit("SET_MARKETS", data.items);
    } catch (error) {
      console.error(error);
    }
  },
  async GET_MARKETS_BY_USERS({ commit }) {
    try {
      const { data } = await this.$api.get('markets', { filterByUser: true });
      commit("SET_MARKETS", data.items);
    } catch (error) {
      console.error(error);
    }
  },
  async GET_MARKET({ commit }, marketId) {
    try {
      const { data: market } = await this.$api.get(`markets/${marketId}`);
      commit("SET_CURRENT_MARKET", market);
    } catch (error) {
      console.error(error);
    }
  },
  CREATE_MARKET(_, market) {
    const uploadMarket = async (market) => {
      if (!market.featuredImage) throw new Error('Featured image is required.');
      const { data } = await this.$api.get(`/files/upload-url/market-${Date.now()}`);
      await axios.put(data.uploadUrl, market.featuredImage);
      market.featuredImage = data.attachmentUrl;
      await this.$api.post('markets', market);
    }

    return actionResolver(uploadMarket, market);
  },
  async GET_MARKET_SCHEMA_CREATE({ commit }) {
    try {
      let schema = JSON.parse(localStorage.getItem(CONSTANTS.cacheKeys.marketsSchemaCreate));

      if (schema === null) {
        const { data } = await this.$api.get('markets/schema/create');
        schema = data;
        localStorage.setItem(CONSTANTS.cacheKeys.marketsSchemaCreate, JSON.stringify(schema));
      }

      commit("SET_MARKET_CREATE_SCHEMA", schema);
    } catch (error) {
      console.error(error);
    }
  }
};