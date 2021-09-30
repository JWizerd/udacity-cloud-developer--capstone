<template>
  <div :class="'col-sm-12 mb-3 card marketplace-card p-4 pb-10 marketplace-' + marketplace.id" v-if="marketplace">
    <div class="content-wrapper">
      <h3>{{ marketplace.name }}</h3>
      <p>{{ marketplace.summary }}</p>
      <router-link :to="'/admin/marketplaces/' + marketplace.id" class="text-primary m-1">EDIT</router-link>
      <a @click.prevent="deleteMarketplace" class="text-danger text-white m-1">DELETE</a>
      <router-link :to="'/admin/marketplaces/' + marketplace.id + '/events'" class="text-info text-white m-1">MANAGE EVENTS</router-link>
    </div>
  </div><!--/ col-sm-6 -->
</template>

<script>
export default {
  props: {
    marketplace: {
      type: Object,
      required: true,
    }
  },
  methods: {
    deleteMarketplace() {
      this.$store.dispatch('DELETE_MARKETPLACE', this.marketplace.id);
    },
  },
  data() {
    return {
      deleteStatus: 'DELETE'
    }
  },
}
</script>