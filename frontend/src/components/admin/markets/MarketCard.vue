<template>
  <div :class="'col-sm-12 mb-3 card market-card p-4 pb-10 market-' + market.id" v-if="market">
    <div class="content-wrapper">
      <h3>{{ market.name }}</h3>
      <p>{{ market.summary }}</p>
      <a :href="'/admin/markets/' + market.id" class="btn btn-primary">Edit</a>
      <a @click.prevent="$store.dispatch('DELETE_MARKET', market.id)" class="btn btn-danger">Delete</a>
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