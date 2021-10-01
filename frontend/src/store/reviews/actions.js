import { REVIEW_MUTATIONS } from "./mutations";

export default {
  async GET_REVIEWS({ commit }, marketplaceId) {
    const reviews = await this.$api.reviews.find({}, { marketplaceId });
    commit(REVIEW_MUTATIONS.SET_REVIEWS, reviews);
  },
  async CREATE_REVIEW({ dispatch }, { marketplaceId, review }) {
    await this.$api.reviews.create(review, { marketplaceId });
    dispatch(REVIEW_ACTIONS.GET_REVIEWS, marketplaceId);
  },
}

export const REVIEW_ACTIONS = {
  GET_REVIEWS: "GET_REVIEWS",
  CREATE_REVIEW: "CREATE_REVIEW"
}