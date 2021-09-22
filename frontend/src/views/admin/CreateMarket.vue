<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <h1 class="text-center mb-3">Create a new market</h1>
          <market-create-form />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MarketCreateForm from "../../components/admin/markets/MarketCreateForm";

export default {
  name: "create-market",
  components: {
    MarketCreateForm
  }
};
</script>

<style lang="scss" scoped></style>
