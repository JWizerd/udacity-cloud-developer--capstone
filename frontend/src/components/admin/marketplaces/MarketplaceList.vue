<template>
  <div class="marketplaces" v-if="$store.getters.userMarketplaces.items && $store.getters.userMarketplaces.items.length > 0">
    <div class="row align-items-center profile-header" v-for="(marketplace, index) in $store.getters.userMarketplaces.items" :key="index">
      <marketplace-card :marketplace="marketplace" />
    </div><!--/ row -->
  </div><!-- marketplaces -->
  <div v-else class="text-center mt-5 mb-5">
    <h4>NO MARKETS...</h4>
  </div>
</template>

<script>
import MarketplaceCard from "./MarketplaceCard";
import { MARKETPLACE_ACTIONS } from "../../../store/marketplaces/actions";
export default {
  components: {
    MarketplaceCard
  },
  async created() {
    await this.$store.dispatch(MARKETPLACE_ACTIONS.GET_MARKETPLACES_BY_USERS);
  },
}
</script>