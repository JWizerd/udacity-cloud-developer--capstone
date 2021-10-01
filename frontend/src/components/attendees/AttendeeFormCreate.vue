<template>
  <div class="review-create-form mb-5">
    <div class="text-center mt-5 mb-5"><h4>RVSP for the Event!</h4></div>
    <div class="text-success text-center mb-3" v-if="status === 'SUCCESS'">Thanks for RSVP-ing! We'll add you to the list!</div>
    <form @submit.prevent="createAttendee" novalidate>
      <div class="form-group text-center" v-if="error">
        <div class="text-danger">{{ error }}</div>
      </div>

      <div class="form-group">
        <label class="label" for="name">Give us the details! Tell us what you will be bringing!</label>
        <textarea type="text" class="form-control" name="form" v-model="model.rsvpDetails" placeholder="For example, I am bringing vegetables from my garden!" />
        <small class="form-text text-danger" v-if="!$v.model.rsvpDetails.required">field is required</small>
        <small class="form-text text-danger" v-if="!$v.model.rsvpDetails.minLength">Details must have at least {{$v.model.rsvpDetails.$params.minLength.min}} characters.</small>
        <small class="form-text text-danger" v-if="!$v.model.rsvpDetails.maxLength">Details are too long. Make sure they are under 200 characters</small>
      </div>

      <div class="form-group">
        <label class="label" for="name">Are you bringing any additional people?</label>
        <input type="number" min="1" max="10" class="form-control" name="form" v-model="model.additionalPeople" placeholder="Enter summary about marketplace" />
        <small class="form-text text-danger" v-if="!$v.model.additionalPeople.required">Field is required</small>
        <small class="form-text text-danger" v-if="!$v.model.additionalPeople.isMaxAdditonalPeople">Rating must be between 1 and 5</small>
      </div>

      <div class="form-group mt-5">
        <button type="submit" :disabled="$v.$invalid" class="btn btn-primary">{{ status }}</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ATTENDEE_ACTIONS } from "../../store/attendees/actions";
import { required, minLength, maxLength } from 'vuelidate/lib/validators';

const isMaxAdditonalPeople = (value) => {
  return value < 10
};

export default {
  data() {
    return {
      error: '',
      status: "SUBMIT",
      model: {
        rsvpDetails: '',
        additionalPeople: 0,
      },
    }
  },
  validations: {
    model: {
      rsvpDetails: {
        required,
        minLength: minLength(120),
        maxLength: maxLength(255),
      },
      additionalPeople: {
        required,
        isMaxAdditonalPeople,
      },
    }
  },
  methods: {
    resetModel() {
      this.model.rsvpDetails = '';
      this.model.additionalPeople = 0;
    },
    async createAttendee() {
      try {
        this.status = "SAVING";
        if (!this.$v.$invalid) {
          await this.$store.dispatch(ATTENDEE_ACTIONS.CREATE_ATTENDEE, {
            attendee: this.model,
            marketplaceId: this.$route.params.marketplaceId,
            eventId: this.$route.params.eventId,
          });
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