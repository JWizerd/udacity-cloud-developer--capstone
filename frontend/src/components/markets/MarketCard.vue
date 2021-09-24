<template>
  <div :class="'col-sm-12 mb-3 card market-card p-4 pb-10 market-' + market.id" v-if="market">
    <div class="container-fluid">
      <div class="row">
        <div class="relative img-wrapper col-md-3">
          <img v-show="market.featuredImage" :src="market.featuredImage" class="img-fluid" :alt="market.name + ' - image'" />
        </div>

        <div class="content-wrapper col-md-9">
          <h3>{{ market.name }}</h3>
          <market-details :market="market" />
          <p>{{ market.summary }}</p>
          <a :href="'/markets/' + market.id" class="btn btn-primary">Read More</a>
        </div>
      </div><!--/ row -->
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
  },
}
</script>