<template>
  <div class="markets" v-if="$store.getters.markets.items">
    <div class="row align-items-center profile-header" v-for="(market, index) in $store.getters.markets.items" :key="index">
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
    this.$store.dispatch("GET_MARKETS");
  }
}
</script>