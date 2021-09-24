<template>
  <div class="market-create-form mb-5">
    <div class="text-danger text-center mb-3" v-if="status === 'ERROR'">{{ error }}</div>
    <div class="text-success text-center mb-3" v-if="status === 'SUCCESS'">Successfully created market! Redirecting to markets page...</div>
    <form @submit.prevent="createMarket" novalidate>
      <div class="form-group text-center" v-if="error">
        <div class="text-danger">{{ error }}</div>
      </div>

      <div class="form-group">
        <label class="label" for="name">Name</label>
        <input type="text" class="form-control" name="form" v-model="model.name" placeholder="Enter market name" />
        <small class="form-text text-danger" v-if="!$v.model.name.required">Field is required</small>
        <small class="form-text text-danger" v-if="!$v.model.name.minLength">Name must have at least {{$v.model.name.$params.minLength.min}} letters.</small>
      </div>

      <div class="form-group">
        <label class="label" for="name">Summary</label>
        <input type="text" class="form-control" name="form" v-model="model.summary" placeholder="Enter summary about market" />
        <small class="form-text text-danger" v-if="!$v.model.summary.required">Field is required</small>
        <small class="form-text text-danger" v-if="!$v.model.summary.minLength">Summary must have at least {{$v.model.summary.$params.minLength.min}} letters.</small>
      </div>

      <div class="form-group">
        <label class="label" for="name">Description</label>
        <textarea class="form-control" name="form" v-model="model.description" placeholder="Enter detailed information about market" />
        <small class="form-text text-danger" v-if="!$v.model.description.required">Field is required</small>
        <small class="form-text text-danger" v-if="!$v.model.description.maxLength">Description can only {{$v.model.name.$params.description.max}} letters.</small>
      </div>

      <div class="form-group">
        <label class="label" for="name">Featured Image</label>
        <input type="file" @change="fileChange($event.target.files)" accept="image/*" class="form-control-file">
        <small class="form-text text-danger" v-if="!$v.model.featuredImage.required">Field is required</small>
      </div>

      <div class="form-group mt-5">
        <button type="submit" :disabled="$v.$invalid" class="btn btn-primary">{{ status }}</button>
      </div>
    </form>
  </div>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators';
export default {
  data() {
    return {
      error: '',
      status: "SUBMIT",
      model: {
        featuredImage: '',
        name: '',
        description: '',
        summary: ''
      },
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
    async createMarket() {
      try {
        this.status = "SAVING";
        if (!this.$v.$invalid) {
          await this.$store.dispatch('CREATE_MARKET', this.model);
          this.status = "SUCCESS";
          setTimeout(() => this.$router.push('/admin/markets'), 3000);
        }
      } catch(error) {
        this.status = "ERROR";
        this.error = error.message;
        setTimeout(() => this.status = "SUBMIT", 5000);
      }
    }
  },
}
</script>