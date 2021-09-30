<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <div class="d-flex justify-content-between align-items-center flex-wrap mb-3">
            <h1 class="text-center">Manage all of your events</h1>
            <router-link :to="'/admin/marketplaces/' + $route.params.marketplaceId + '/events/create-event'" class="btn btn-success mb-3">Create Event</router-link>
          </div>
        </div>
      </div>
      <event-list :marketplaceId="parseInt($route.params.marketplaceId, 10)" />
    </div>
  </div>
</template>

<script>
import EventList from "../../../components/admin/events/EventList";

export default {
  name: "manage-marketplaces",
  components: {
    EventList
  }
};
</script>

<style lang="scss" scoped></style>
