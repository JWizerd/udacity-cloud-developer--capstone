<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <h1 class="text-center mb-3">Update existing market</h1>
          <market-form-update />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MarketFormUpdate from "../../components/admin/markets/MarketFormUpdate";

export default {
  name: "update-market",
  components: {
    MarketFormUpdate
  }
};
</script>

<style lang="scss" scoped></style>
