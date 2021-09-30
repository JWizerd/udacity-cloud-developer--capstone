<template>
  <div class="market-create-form mb-5">
    <div class="text-success text-center mb-3" v-if="status === 'SUCCESS'">Successfully created event! Redirecting to marketplaces page...</div>
    <form @submit.prevent="createMarket" novalidate>
      <div class="form-group text-center" v-if="error">
        <div class="text-danger">{{ error }}</div>
      </div>

      <div class="form-group">
        <label class="label" for="name">Event Name</label>
        <input type="text" class="form-control" name="form" v-model="model.name" placeholder="Enter Event name" />
        <small class="form-text text-danger" v-if="!$v.model.name.required">Field is required</small>
        <small class="form-text text-danger" v-if="!$v.model.name.minLength">Name must have at least {{$v.model.name.$params.minLength.min}} letters.</small>
      </div>

      <div class="form-group">
        <label class="label" for="name">Description</label>
        <textarea class="form-control" name="form" v-model="model.description" placeholder="Enter detailed information about event" />
        <small class="form-text text-danger" v-if="!$v.model.description.required">Field is required</small>
        <small class="form-text text-danger" v-if="!$v.model.description.maxLength">Description can only {{$v.model.name.$params.description.max}} letters.</small>
      </div>

      <div class="form-group">
        <label class="label" for="name">Start Date</label>
        <input type="date" class="form-control" v-model="model.startDate">
        <small class="form-text text-danger" v-if="!$v.model.startDate.required">Field is required</small>
        <small class="form-text text-danger" v-if="!$v.model.startDate.required">Start date should be at least a day in advance be today</small>
      </div>

      <div class="form-group">
        <label class="label" for="name">End Date</label>
        <input type="date" class="form-control" v-model="model.endDate">
        <small class="form-text text-danger"  v-if="!$v.model.endDate.required">Field is required</small>
      </div>

      <div class="form-group">
        <label class="label" for="name">Address</label>
        <input type="text" class="form-control" v-model="model.address">
        <small class="form-text text-danger"  v-if="!$v.model.address.required">Field is required</small>
      </div>

      <div class="form-group">
        <label class="label" for="name">City</label>
        <input type="text" class="form-control" v-model="model.city">
        <small class="form-text text-danger"  v-if="!$v.model.city.required">Field is required</small>
      </div>

      <div class="form-group">
        <label class="label" for="name">State</label>
        <select v-model="model.state" class="form-control">
          <option v-for="state in states" :value="state.abbreviation" :key="state.abbreviation">{{ state.name }}</option>
        </select>
        <small class="form-text text-danger"  v-if="!$v.model.state.required">Field is required</small>
      </div>

      <div class="form-group">
        <label class="label" for="name">Zipcode</label>
        <input type="text" class="form-control" v-model.number="model.zipcode">
        <small class="form-text text-danger"  v-if="!$v.model.zipcode.required">Field is required</small>
      </div>

      <div class="form-group mt-5">
        <button type="submit" :disabled="$v.$invalid" class="btn btn-primary">{{ status }}</button>
      </div>
    </form>
  </div>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators';
import { EVENT_ACTIONS } from "../../../store/events/actions";
import { STATES } from "../../../utils";
export default {
  data() {
    return {
      error: '',
      status: "SUBMIT",
      model: {
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        city: '',
        address: '',
        state: '',
        zipcode: '',
      },
    }
  },
  computed: {
    states() {
      return STATES;
    }
  },
  validations: {
    model: {
      name: {
        required,
        minLength: minLength(5)
      },
      description: {
        required,
        maxLength: maxLength(5000),
      },
      startDate: {
        required,
      },
      endDate: {
        required,
      },
      city: {
        required,
      },
      address: {
        required
      },
      zipcode: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(5)
      },
      state: {
        required
      }
    }
  },
  methods: {
    fileChange(files) {
      const newModel = { ...this.model };
      newModel.featuredImage = files[0];
      this.model = newModel;
    },
    async createMarket() {
      try {
        this.status = "SAVING";
        if (!this.$v.$invalid) {
          await this.$store.dispatch(EVENT_ACTIONS.CREATE_EVENT, { marketplaceId: this.$route.params.marketplaceId, event: this.model });
          this.status = "SUCCESS";
          setTimeout(() => this.$router.push('/admin/marketplaces'), 3000);
        }
      } catch(error) {
        this.status = "ERROR";
        this.error = error.message;
      }
    }
  },
}
</script>