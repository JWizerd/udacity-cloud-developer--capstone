<template>
  <div :class="'col-sm-12 mb-3 card marketplace-card p-4 pb-10 marketplace-' + review.id" v-if="review">
    <div class="container-fluid">
      <div class="row">
        <div class="content-wrapper">
          <div class="d-flex align-items-center mb-3">
            <div class="mr-2"><strong>Rating: {{ review.rating }} out of 5</strong></div>
          </div>
          <p>{{ review.review }}</p>
        </div>
      </div><!--/ row -->
    </div>
  </div><!--/ col-sm-6 -->
</template>

<script>

export default {
  props: {
    review: {
      type: Object,
      required: true,
    }
  },
}
</script>