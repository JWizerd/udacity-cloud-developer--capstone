<template>
  <div :class="'col-sm-12 mb-3 card market-card p-4 pb-10 market-' + event.id" v-if="event">
    <div class="container-fluid">
      <div class="row">
        <div class="content-wrapper col-md-12">
          <h3>{{ event.name }}</h3>
          <event-details :event="event" />
          <p>{{ event.description }}</p>
          <router-link :to="'/marketplaces/' + $route.params.marketplaceId + '/events/' + event.id" class="btn btn-primary">Details</router-link>
        </div>
      </div><!--/ row -->
    </div>
  </div><!--/ col-sm-6 -->
</template>

<script>
import EventDetails from "./EventDetails";

export default {
  components: {
    EventDetails
  },
  props: {
    event: {
      type: Object,
      required: true,
    }
  },
}
</script>