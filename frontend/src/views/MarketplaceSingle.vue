<template>
  <div>
    <div class="container" v-if="$store.getters.currentMarketplace">
      <div class="row">
        <marketplace-content :marketplace="$store.getters.currentMarketplace" />
      </div>
      <div class="row">
        <div class="col-sm-12">
          <h2>Upcoming Events</h2>
          <hr>
        </div>
        <event-list :marketplaceId="$store.getters.currentMarketplace.id" />
      </div>
    </div>
  </div>
</template>

<script>
import MarketplaceContent from "../components/marketplaces/MarketplaceContent";
import EventList from "../components/events/EventList";
import { MARKETPLACE_ACTIONS } from '../store/marketplaces/actions';

export default {
  name: "marketplaces",
  components: {
    MarketplaceContent,
    EventList
  },
  data() {
    return {
      market: {}
    }
  },
  async created() {
    await this.$store.dispatch(MARKETPLACE_ACTIONS.GET_MARKETPLACE, this.$route.params.marketId);
  }
};
</script>

<style lang="scss" scoped></style>
