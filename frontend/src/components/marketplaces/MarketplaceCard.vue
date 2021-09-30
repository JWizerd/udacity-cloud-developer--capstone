<template>
  <div :class="'col-sm-12 mb-3 card marketplace-card p-4 pb-10 marketplace-' + marketplace.id" v-if="marketplace">
    <div class="container-fluid">
      <div class="row">
        <div class="relative img-wrapper col-md-3">
          <router-link :to="'/marketplaces/' + marketplace.id" class="text-success m-1 mb-3">
            <img v-show="marketplace.featuredImage" :src="marketplace.featuredImage" class="img-fluid" :alt="marketplace.name + ' - image'" />
          </router-link>
        </div>

        <div class="content-wrapper col-md-9">
          <h3><router-link :to="'/marketplaces/' + marketplace.id" class="text-success m-1 mb-3">{{ marketplace.name }}</router-link></h3>
          <p>{{ marketplace.summary }}</p>
          <router-link :to="'/marketplaces/' + marketplace.id" class="text-success m-1 mb-3">READ MORE</router-link>
        </div>
      </div><!--/ row -->
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
}
</script>