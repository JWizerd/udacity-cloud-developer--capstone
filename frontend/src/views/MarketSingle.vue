<template>
  <div>
    <div class="container" v-if="$store.getters.currentMarket">
      <div class="row">
        <market-content :market="$store.getters.currentMarket" />
      </div>
    </div>
  </div>
</template>

<script>
import MarketContent from "../components/markets/MarketContent";

export default {
  name: "markets",
  components: {
    MarketContent
  },
  data() {
    return {
      market: {}
    }
  },
  async created() {
    await this.$store.dispatch("GET_MARKET", this.$route.params.marketId);
  }
};
</script>

<style lang="scss" scoped></style>
