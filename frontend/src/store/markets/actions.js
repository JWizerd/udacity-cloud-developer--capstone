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
      const { data } = await this.$api.get(`markets?filterByUser=true`);
      commit("SET_USER_MARKETS", data.items);
    } catch (error) {
      console.error(error);
    }
  },
  async GET_MARKET({ commit }, marketId) {
    try {
      commit("SET_CURRENT_MARKET", null);
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
  UPDATE_MARKET(_, market) {
    const uploadMarket = async (market) => {
      const { id, ...fields } = market;
      if (!fields.featuredImage) throw new Error('Featured image is required.');
      if (typeof fields.featuredImage === "object") {
        const { data } = await this.$api.get(`/files/upload-url/market-${Date.now()}`);
        await axios.put(data.uploadUrl, fields.featuredImage);
        fields.featuredImage = data.attachmentUrl;
      }

      await this.$api.patch(`markets/${id}`, fields);
    }

    return actionResolver(uploadMarket, market);
  },
  async DUPLICATE_MARKET({ dispatch }, market) {
    delete market.id;
    market.name = `COPY - ${market.name}`;
    await this.$api.post('markets', market);
    dispatch("GET_MARKETS_BY_USERS");
  },
  async DELETE_MARKET({ commit }, marketId) {
    await this.$api.delete(`markets/${marketId}`);
    commit("REMOVE_MARKET", marketId);
  }
};