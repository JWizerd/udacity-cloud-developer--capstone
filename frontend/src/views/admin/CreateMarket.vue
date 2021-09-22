<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <h1 class="text-center mb-3">Create a new market</h1>
          <market-form-create />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MarketFormCreate from "../../components/admin/markets/MarketFormCreate";

export default {
  name: "create-market",
  components: {
    MarketFormCreate
  }
};
</script>

<style lang="scss" scoped></style>
