<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <div class="d-flex justify-content-between align-items-center flex-wrap mb-3">
            <h1 class="text-center">Manage all of your markets</h1>
            <router-link to="/admin/create-market" class="btn btn-success mb-3">Create Market</router-link>
          </div>
        </div>
      </div>
      <markets-list />
    </div>
  </div>
</template>

<script>
import MarketsList from "../../components/admin/markets/MarketList";

export default {
  name: "manage-markets",
  components: {
    MarketsList
  }
};
</script>

<style lang="scss" scoped></style>
