<template>
  <div class="marketplaces" v-if="$store.getters.marketplaces && $store.getters.marketplaces.items">
    <div class="row align-items-center profile-header" v-for="(marketplace, index) in $store.getters.marketplaces.items" :key="index">
      <marketplace-card :marketplace="marketplace" />
    </div><!--/ row -->
  </div><!-- marketplaces -->
  <div v-else class="text-center mt-5 mb-5">
    <h4>NO MARKETS...</h4>
  </div>
</template>

<script>
import { MARKETPLACE_ACTIONS } from "../../store/marketplaces/actions";
import MarketplaceCard from "./MarketplaceCard";
export default {
  components: {
    MarketplaceCard
  },
  async created() {
    this.$store.dispatch(MARKETPLACE_ACTIONS.GET_MARKETPLACES);
  }
}
</script>