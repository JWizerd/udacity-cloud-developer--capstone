<template>
  <div :class="'col-sm-12 mb-3 card marketplace-card p-4 marketplace-content marketplace-' + marketplace.id" v-if="marketplace">
    <div class="relative img-wrapper mb-4">
      <img class="img-fluid" v-show="marketplace.featuredImage" :src="marketplace.featuredImage" :alt="marketplace.name + ' - image'" />
    </div>

    <div class="content-wrapper">
      <h1>{{ marketplace.name }}</h1>
      <hr>
      <p class="mb-4 mt-4 font-italic">{{ marketplace.summary }}</p>
      <hr>
      <div class="mt-4">
        <main class="marketplace-description">{{ marketplace.description }}</main>
      </div>

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
  }
}
</script>

<style lang="scss" scoped>
  .marketplace-content {
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