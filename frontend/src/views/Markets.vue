<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <h1 class="text-center">View all open markets</h1>
        </div>
      </div><!--/ row -->
      <markets-list />
    </div>
  </div>
</template>

<script>
import MarketsList from "../components/markets/MarketsList";

export default {
  name: "markets",
  components: {
    MarketsList
  }
};
</script>

<style lang="scss" scoped></style>
