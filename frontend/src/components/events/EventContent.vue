<template>
  <div :class="'col-sm-12 mb-3 card event-card p-4 event-content event-' + event.id" v-if="event">
    <div class="relative img-wrapper mb-4">
      <img class="img-fluid" v-show="event.marketplace.featuredImage" :src="event.marketplace.featuredImage" :alt="event.name + ' - image'" />
    </div>

    <div class="content-wrapper">
      <h1>{{ event.name }}</h1>

      <div class="mt-4">
        <h2>Details:</h2>
        <event-details :event="event" />
        <hr>
      </div>
      <div class="mt-4">
        <h2>Description:</h2>
        <main class="event-description">{{ event.description }}</main>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <div class="mt-4">
          <h2 class="mb-3">Attendees:</h2>
          <attendee-list :eventId="event.id" />
        </div>
      </div>
    </div>
  </div><!--/ col-sm-6 -->
</template>

<script>
import EventDetails from "./EventDetails";
import AttendeeList from "../attendees/AttendeeList";
export default {
  components: {
    EventDetails,
    AttendeeList
  },
  props: {
    event: {
      type: Object,
      required: true,
    }
  }
}
</script>

<style lang="scss" scoped>
  .market-content {
    border: none;
  }

  .img-wrapper {
    height: 350px;
    max-height: 50vh;
    position: relative;
    overflow: hidden;
  }

  .img-wrapper img {
    position: absolute;
    height: auto;
    width: 100%;
    bottom: -50%;
  }
</style>