<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <h1 class="text-center mb-3">Create a new marketplace</h1>
          <marketplace-form-create />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MarketplaceFormCreate from "../../../components/admin/marketplaces/MarketplaceFormCreate";

export default {
  name: "create-marketplace",
  components: {
    MarketplaceFormCreate
  }
};
</script>

<style lang="scss" scoped></style>
