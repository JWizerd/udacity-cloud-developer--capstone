<template>
  <div class="col-sm-12">
    <div class="attendees" v-if="$store.getters.attendees.items && $store.getters.attendees.items.length > 0">
      <div class="row align-items-center" v-for="(attendee, index) in $store.getters.attendees.items" :key="index">
        <attendee-card :attendee="attendee" />
      </div><!--/ row -->
    </div><!-- attendees -->
    <div v-else class="text-center mt-5 mb-5">
      <h4>Nobody has RVSP'd yet. Be the first one!</h4>
    </div>
    <div class="mt-5 mb-5">
      <attendee-form-create />
    </div>
  </div>
</template>

<script>
import { ATTENDEE_ACTIONS } from "../../store/attendees/actions"
import AttendeeCard from "./AttendeeCard.vue";
import AttendeeFormCreate from "./AttendeeFormCreate.vue"
export default {
  components: {
    AttendeeCard,
    AttendeeFormCreate
  },
  async created() {
    this.$store.dispatch(ATTENDEE_ACTIONS.GET_ATTENDEES, {
      eventId: this.$route.params.eventId,
      marketplaceId: this.$route.params.marketplaceId,
    });
  }
}
</script>