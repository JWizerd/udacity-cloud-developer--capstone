<template>
  <div :class="'col-sm-12 mb-3 card market-card p-4 pb-10 market-' + market.id" v-if="market">
    <div class="relative img-wrapper">
      <img v-show="market.featuredImage" :alt="market.name + ' - image'" />
    </div>

    <div class="content-wrapper">
      <h3>{{ market.name }}</h3>
      <p>{{ market.summary }}</p>
      <a :href="'/markets/' + market.id" class="btn btn-primary">Read More</a>
    </div>
  </div><!--/ col-sm-6 -->
</template>

<script>
export default {
  props: {
    market: {
      type: Object,
      required: true,
    }
  }
}
</script>