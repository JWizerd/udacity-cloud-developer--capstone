<template>
  <div>
    <div class="container" v-if="event">
      <div class="row">
        <event-content :event="event" />
      </div>
    </div>
  </div>
</template>

<script>
import EventContent from "../components/events/EventContent";

import { EVENT_ACTIONS } from '../store/events/actions';

export default {
  name: "marketplaces",
  components: {
    EventContent,
  },
  computed: {
    event() {
      return this.$store.getters.currentEvent;
    }
  },
  async created() {
    this.$store.dispatch(EVENT_ACTIONS.GET_EVENT, {
      marketplaceId: this.$route.params.marketplaceId,
      eventId: this.$route.params.eventId
    });
  }
};
</script>

<style lang="scss" scoped></style>
