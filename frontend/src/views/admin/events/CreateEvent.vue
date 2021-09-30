<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <h1 class="text-center mb-3">Create a new event</h1>
          <event-form-create :marketplaceId="$route.params.marketplaceId" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventFormCreate from "../../../components/admin/events/EventFormCreate";

export default {
  name: "create-marketplace",
  components: {
    EventFormCreate
  }
};
</script>

<style lang="scss" scoped></style>
