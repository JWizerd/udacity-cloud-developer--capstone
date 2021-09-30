<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <h1 class="text-center mb-3">Update event</h1>
          <event-form-update />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventFormUpdate from "../../../components/admin/events/EventFormUpdate";

export default {
  name: "update-marketplace",
  components: {
    EventFormUpdate
  }
};
</script>

<style lang="scss" scoped></style>
