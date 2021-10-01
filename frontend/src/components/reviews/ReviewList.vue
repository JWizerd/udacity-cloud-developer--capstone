<template>
  <div class="col-sm-12">
    <div class="reviews" v-if="$store.getters.reviews.items && $store.getters.reviews.items.length > 0">
      <div class="row align-items-center profile-header" v-for="(review, index) in $store.getters.reviews.items" :key="index">
        <review-card :review="review" />
      </div><!--/ row -->
    </div><!-- reviews -->
    <div v-else class="text-center mt-5 mb-5">
      <h4>NO REVIEWS...</h4>
    </div>
    <div class="mt-5 mb-5">
      <review-form-create />
    </div>
  </div>
</template>

<script>
import { REVIEW_ACTIONS } from "../../store/reviews/actions"
import ReviewCard from "./ReviewCard.vue";
import ReviewFormCreate from "./ReviewFormCreate.vue"
export default {
  components: {
    ReviewCard,
    ReviewFormCreate
  },
  async created() {
    this.$store.dispatch(REVIEW_ACTIONS.GET_REVIEWS, this.$route.params.marketplaceId);
  }
}
</script>