<template>
  <div class="details d-flex">
    <div class="d-flex mr-2">
      <small class="start-date mr-1 form-text"><strong>Location:</strong></small>
      <small class="start-date mr-1 form-text"> {{ event.address }}</small>
      <small class="start-date mr-1 form-text">{{ event.city }},</small>
      <small class="start-date mr-1 form-text">{{ event.state }}</small>
      <small class="start-date mr-1 form-text">{{ event.zipcode }}</small>
    </div>
    <div class="d-flex">
      <small class="start-date mr-1 form-text"><strong>Start:</strong> {{ startDate }}</small>
      <small class="end-date form-text"><strong>End:</strong> {{ endDate }}</small>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  computed: {
    startDate() {
      return new Date(this.event.startDate).toDateString();
    },
    endDate() {
      return new Date(this.event.endDate).toDateString();
    },
  }
}
</script>