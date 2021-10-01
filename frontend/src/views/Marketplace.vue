<template>
  <div>
    <div class="container" v-if="marketplace">
      <div class="row">
        <marketplace-content :marketplace="marketplace" />
      </div>
      <div class="row">
        <div class="col-sm-12">
          <h2>Upcoming Events</h2>
          <hr>
        </div>
        <event-list :marketplaceId="marketplace.id" />
      </div>
      <div class="row">
        <div class="col-sm-12">
          <h2>Reviews</h2>
          <hr>
        </div>
        <review-list :marketplaceId="marketplace.id" />
      </div>
    </div>
  </div>
</template>

<script>
import MarketplaceContent from "../components/marketplaces/MarketplaceContent";
import EventList from "../components/events/EventList";
import ReviewList from "../components/reviews/ReviewList";
import { MARKETPLACE_ACTIONS } from '../store/marketplaces/actions';

export default {
  name: "marketplaces",
  components: {
    MarketplaceContent,
    EventList,
    ReviewList
  },
  computed: {
    marketplace() {
      return this.$store.getters.currentMarketplace;
    }
  },
  async created() {
    this.$store.dispatch(MARKETPLACE_ACTIONS.GET_MARKETPLACE, this.$route.params.marketplaceId);
  }
};
</script>

<style lang="scss" scoped></style>
