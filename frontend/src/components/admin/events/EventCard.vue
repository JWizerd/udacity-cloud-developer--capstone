<template>
  <div :class="'col-sm-12 mb-3 card event-card p-4 pb-10 event-' + event.id" v-if="event">
    <div class="content-wrapper">
      <h3>{{ event.name }}</h3>
      <event-details :event="event" />
      <p>{{ event.description }}</p>
      <router-link :to="'/admin/marketplaces/' + event.marketplace.id + '/events/' + event.id" class="btn btn-primary m-1">EDIT</router-link>
      <a @click.prevent="deleteEvent" class="btn btn-danger text-white m-1">DELETE</a>
    </div>
  </div><!--/ col-sm-6 -->
</template>

<script>
import EventDetails from "../../events/EventDetails.vue";
import { EVENT_ACTIONS } from "../../../store/events/actions";

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
  data() {
    return {
      deleteStatus: 'DELETE'
    }
  },
  methods: {
    deleteEvent() {
      this.$store.dispatch(EVENT_ACTIONS.DELETE_EVENT, { eventId: this.event.id, marketplaceId: this.$route.params.marketplaceId });
    }
  }
}
</script>