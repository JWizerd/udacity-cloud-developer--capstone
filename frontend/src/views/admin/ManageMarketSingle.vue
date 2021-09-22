<template>
  <div>
    <div class="container" v-if="$store.getters.currentMarket">
      <div class="row">

      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: "manage-market",
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
