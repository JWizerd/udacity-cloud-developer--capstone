<template>
  <div class="marketplaces" v-if="$store.getters.userEvents.items && $store.getters.userEvents.items.length > 0">
    <div class="row align-items-center profile-header" v-for="(event, index) in $store.getters.userEvents.items" :key="index">
      <event-card :event="event" />
    </div><!--/ row -->
  </div><!-- marketplaces -->
  <div v-else class="text-center mt-5 mb-5">
    <h4>NO UPCOMING EVENTS...</h4>
  </div>
</template>

<script>
import { EVENT_ACTIONS } from "../../../store/events/actions";
import EventCard from "./EventCard.vue";
export default {
  components: {
    EventCard
  },
  async created() {
    await this.$store.dispatch(EVENT_ACTIONS.GET_USER_EVENTS, this.$route.params.marketplaceId);
  },
}
</script>