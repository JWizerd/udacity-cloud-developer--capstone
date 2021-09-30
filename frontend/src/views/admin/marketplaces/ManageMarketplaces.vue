<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <div class="d-flex justify-content-between align-items-center flex-wrap mb-3">
            <h1 class="text-center">Manage all of your marketplaces</h1>
            <router-link to="/admin/marketplaces/create-marketplace" class="btn btn-success mb-3">Create Marketplace</router-link>
          </div>
        </div>
      </div>
      <marketplace-list />
    </div>
  </div>
</template>

<script>
import MarketplaceList from "../../../components/admin/marketplaces/MarketplaceList";

export default {
  name: "manage-marketplaces",
  components: {
    MarketplaceList
  }
};
</script>

<style lang="scss" scoped></style>
