<template>
  <div class="markets" v-if="$store.getters.userMarkets.length">
    <div class="row align-items-center profile-header" v-for="(market, index) in $store.getters.userMarkets" :key="index">
      <market-card :market="market" />
    </div><!--/ row -->
  </div><!-- markets -->
</template>

<script>
import MarketCard from "./MarketCard";
export default {
  components: {
    MarketCard
  },
  async created() {
    await this.$store.dispatch("GET_MARKETS_BY_USERS");
  },
}
</script>