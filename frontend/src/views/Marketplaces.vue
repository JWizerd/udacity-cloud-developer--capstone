<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <h1 class="text-center">View all marketplaces</h1>
        </div>
      </div><!--/ row -->
      <marketplace-list />
    </div>
  </div>
</template>

<script>
import MarketplaceList from "../components/marketplaces/MarketplaceList";

export default {
  name: "marketplaces",
  components: {
    MarketplaceList
  }
};
</script>

<style lang="scss" scoped></style>
