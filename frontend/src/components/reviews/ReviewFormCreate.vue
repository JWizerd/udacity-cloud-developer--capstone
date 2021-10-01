<template>
  <div class="review-create-form mb-5">
    <div class="text-success text-center mb-3" v-if="status === 'SUCCESS'">Successfully created review! Thanks for sharing!</div>
    <form @submit.prevent="createReview" novalidate>
      <div class="form-group text-center" v-if="error">
        <div class="text-danger">{{ error }}</div>
      </div>

      <div class="form-group">
        <label class="label" for="name">Review</label>
        <textarea type="text" class="form-control" name="form" v-model="model.review" placeholder="Enter your review" />
        <small class="form-text text-danger" v-if="!$v.model.review.required">Review is required</small>
        <small class="form-text text-danger" v-if="!$v.model.review.minLength">Review must have at least {{$v.model.review.$params.minLength.min}} chars.</small>
      </div>

      <div class="form-group">
        <label class="label" for="name">Rating</label>
        <input type="number" min="1" max="5" class="form-control" name="form" v-model="model.rating" placeholder="Enter summary about marketplace" />
        <small class="form-text text-danger" v-if="!$v.model.rating.required">Field is required</small>
        <small class="form-text text-danger" v-if="!$v.model.rating.isValidRating">Rating must be between 1 and 5</small>
      </div>

      <div class="form-group mt-5">
        <button type="submit" :disabled="$v.$invalid" class="btn btn-primary">{{ status }}</button>
      </div>
    </form>
  </div>
</template>

<script>
import { REVIEW_ACTIONS } from "../../store/reviews/actions";
import { required, minLength } from 'vuelidate/lib/validators';
const isValidRating = (value) => {
  const rating = parseInt(value, 10);
  return rating > 1 && rating <= 5;
}
export default {
  data() {
    return {
      error: '',
      status: "SUBMIT",
      model: {
        review: '',
        rating: 5,
      },
    }
  },
  validations: {
    model: {
      review: {
        required,
        minLength: minLength(120)
      },
      rating: {
        required,
        isValidRating,
      },
    }
  },
  methods: {
    resetModel() {
      this.model.rating = 5;
      this.model.review = '';
    },
    async createReview() {
      try {
        this.status = "SAVING";
        if (!this.$v.$invalid) {
          await this.$store.dispatch(REVIEW_ACTIONS.CREATE_REVIEW, { review: this.model, marketplaceId: this.$route.params.marketplaceId });
          this.status = "SUCCESS";
          this.resetModel();
          setTimeout(() => this.status = "SUBMIT", 3000);
        }
      } catch(error) {
        this.status = "ERROR";
        this.error = error.message;
      }
    }
  },
}
</script>