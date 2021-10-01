<template>
  <div class="details d-flex">
    <div class="d-flex mr-2">
      <div class="start-date mr-1 form-text"><strong>Location:</strong></div>
      <div class="start-date mr-1 form-text"> {{ event.address }}</div>
      <div class="start-date mr-1 form-text">{{ event.city }},</div>
      <div class="start-date mr-1 form-text">{{ event.state }}</div>
      <div class="start-date mr-1 form-text">{{ event.zipcode }}</div>
    </div>
    <div class="d-flex">
      <div class="start-date mr-1 form-text"><strong>Start:</strong> {{ startDate }}</div>
      <div class="end-date form-text"><strong>End:</strong> {{ endDate }}</div>
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