<template>
  <div class="marketplaces" v-if="$store.getters.events.items && $store.getters.events.items.length > 0">
    <div class="align-items-center profile-header" v-for="(event, index) in $store.getters.events.items" :key="index">
      <event-card :event="event" />
    </div><!--/ row -->
  </div><!-- marketplaces -->
  <div class="col-sm-12" v-else>
      <h4 class="text-center mt-5 mb-5">NO UPCOMING EVENTS...</h4>
  </div>
</template>

<script>
import { EVENT_ACTIONS } from "../../store/events/actions";
import EventCard from "./EventCard";
export default {
  props: {
    marketplaceId: {
      type: Number,
      required: true,
    }
  },
  components: {
    EventCard
  },
  async created() {
    this.$store.dispatch(EVENT_ACTIONS.GET_EVENTS, this.marketplaceId);
  }
}
</script>