<template>
  <div :class="'col-sm-12 mb-3 card market-card p-4 market-content market-' + market.id" v-if="market">
    <div class="relative img-wrapper mb-4">
      <img class="img-fluid" v-show="market.featuredImage" :src="market.featuredImage" :alt="market.name + ' - image'" />
    </div>

    <div class="content-wrapper">
      <h1>{{ market.name }}</h1>
      <market-details :market="market" />

      <div class="mt-4">
        <h2>Summary:</h2>
        <p>{{ market.summary }}</p>
      </div>
      <div class="mt-4">
        <h2>Description:</h2>
        <main class="market-description">{{ market.description }}</main>
      </div>

    </div>
  </div><!--/ col-sm-6 -->
</template>

<script>
import MarketDetails from "./MarketDetails";
export default {
  components: {
    MarketDetails
  },
  props: {
    market: {
      type: Object,
      required: true,
    }
  }
}
</script>

<style lang="scss" scoped>
  .market-content {
    border: none;
  }

  .img-wrapper {
    height: 350px;
    max-height: 50vh;
    position: relative;
    overflow: hidden;
  }

  .img-wrapper img {
    position: absolute;
    height: auto;
    width: 100%;
    bottom: -50%;
  }
</style>