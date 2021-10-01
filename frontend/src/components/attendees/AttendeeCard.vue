<template>
  <div :class="'col-sm-12 mb-3 card attendee-card p-4 pb-10 attendee-' + attendee.id" v-if="attendee">
    <div class="container-fluid">
      <div class="row">
        <div class="content-wrapper">
          <div class="details d-flex align-items-center mb-2">
            <img class="headshot-small mr-3" :src="attendee.user.headshot">
            <strong>{{ attendee.user.username }}</strong>
          </div>
          <div>{{ attendee.rsvpDetails }}</div>
        </div>
      </div><!--/ row -->
    </div>
  </div><!--/ col-sm-6 -->
</template>

<script>

export default {
  props: {
    attendee: {
      type: Object,
      required: true,
    }
  },
}
</script>

<style scoped>
.headshot-small {
  width: 50px;
  border-radius: 50%;
}
</style>