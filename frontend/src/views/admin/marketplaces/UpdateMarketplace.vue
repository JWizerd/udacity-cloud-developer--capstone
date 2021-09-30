<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <h1 class="text-center mb-3">Update existing marketplace</h1>
          <marketplace-form-update />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MarketplaceFormUpdate from "../../../components/admin/marketplaces/MarketplaceFormUpdate";

export default {
  name: "update-marketplace",
  components: {
    MarketplaceFormUpdate
  }
};
</script>

<style lang="scss" scoped></style>
