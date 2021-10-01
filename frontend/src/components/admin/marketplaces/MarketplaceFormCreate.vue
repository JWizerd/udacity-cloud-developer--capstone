<template>
  <div class="marketplace-create-form mb-5">
    <div class="text-success text-center mb-3" v-if="status === 'SUCCESS'">Successfully created marketplace! Redirecting to marketplaces page...</div>
    <form @submit.prevent="createMarketplace" novalidate>
      <div class="form-group text-center" v-if="error">
        <div class="text-danger">{{ error }}</div>
      </div>

      <div class="form-group">
        <label class="label" for="name">Featured Image</label>
        <input type="file" @change="fileChange($event.target.files)" accept="image/*" class="form-control-file">
        <small class="form-text text-danger" v-if="!$v.model.featuredImage.required">Field is required</small>
      </div>

      <div class="form-group">
        <label class="label" for="name">Name</label>
        <input type="text" class="form-control" name="form" v-model="model.name" placeholder="Enter marketplace name" />
        <small class="form-text text-danger" v-if="!$v.model.name.required">Field is required</small>
        <small class="form-text text-danger" v-if="!$v.model.name.minLength">Name must have at least {{$v.model.name.$params.minLength.min}} letters.</small>
      </div>

      <div class="form-group">
        <label class="label" for="name">Summary</label>
        <input type="text" class="form-control" name="form" v-model="model.summary" placeholder="Enter summary about marketplace" />
        <small class="form-text text-danger" v-if="!$v.model.summary.required">Field is required</small>
        <small class="form-text text-danger" v-if="!$v.model.summary.minLength">Summary must have at least {{$v.model.summary.$params.minLength.min}} letters.</small>
      </div>

      <div class="form-group">
        <label class="label" for="name">Description</label>
        <textarea class="form-control" name="form" v-model="model.description" placeholder="Enter detailed information about marketplace" />
        <small class="form-text text-danger" v-if="!$v.model.description.required">Field is required</small>
        <small class="form-text text-danger" v-if="!$v.model.description.maxLength">Description can only {{$v.model.name.$params.description.max}} letters.</small>
      </div>

      <div class="form-group mt-5">
        <button type="submit" :disabled="$v.$invalid" class="btn btn-primary">{{ status }}</button>
      </div>
    </form>
  </div>
</template>

<script>
import { MARKETPLACE_ACTIONS } from "../../../store/marketplaces/actions";
import { required, minLength, maxLength } from 'vuelidate/lib/validators';
import { STATES } from "../../../utils";
export default {
  data() {
    return {
      error: '',
      status: "SUBMIT",
      model: {
        featuredImage: '',
        name: '',
        description: '',
        summary: '',
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
      summary: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(255),
      },
      description: {
        required,
        maxLength: maxLength(5000),
      },
      featuredImage: {
        required,
      },
    }
  },
  methods: {
    fileChange(files) {
      const newModel = { ...this.model };
      newModel.featuredImage = files[0];
      this.model = newModel;
    },
    async createMarketplace() {
      try {
        this.error = "";
        this.status = "SAVING";
        if (!this.$v.$invalid) {
          await this.$store.dispatch(MARKETPLACE_ACTIONS.CREATE_MARKETPLACE, this.model);
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