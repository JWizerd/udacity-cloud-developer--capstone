<template>
  <div class="market-create-form mb-5" v-if="$store.getters.currentMarket">
    <div class="text-danger text-center mb-3" v-if="status === 'ERROR'">{{ error }}</div>
    <div class="text-success text-center mb-3" v-if="status === 'SUCCESS'">Successfully updated market!</div>
    <form @submit.prevent="updateMarket" novalidate>
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
        <div>
          <input type="hidden" v-model="model.featuredImage" />
          <img :src="$store.getters.currentMarket.featuredImage" class="img-fluid uploaded-image mb-1" />
          <input type="file" @change="fileChange($event.target.files)" accept="image/*" class="form-control-file">
        </div>

        <small class="form-text text-danger" v-if="!$v.model.featuredImage.required">Field is required</small>
      </div>

      <div class="form-group">
        <label class="label" for="name">Start Date</label>
        <input type="date" class="form-control" v-model="model.startDate">
        <small class="form-text text-danger" v-if="!$v.model.startDate.required">Field is required</small>
        <small class="form-text text-danger" v-if="!$v.model.startDate.required">Start date should be at least be today</small>
      </div>

      <div class="form-group">
        <label class="label" for="name">End Date</label>
        <input type="date" class="form-control" v-model="model.endDate">
        <small class="form-text text-danger" v-if="!$v.model.endDate.required">Field is required</small>
        <small class="form-text text-danger" v-if="!$v.model.endDate.required">End date should be at max a year from now</small>
      </div>

      <div class="form-group mt-5">
        <button type="submit" :disabled="$v.$invalid || deleteStatus !== 'DELETE'" class="btn btn-primary m-1">{{ status }}</button>
        <button @click="deleteMarket" :disabled="status !== 'UPDATE'" class="btn btn-danger">{{ deleteStatus }}</button>
      </div>
    </form>
  </div>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators';

export default {
  async created() {
    await this.setMarket();
  },
  data() {
    return {
      error: '',
      status: "UPDATE",
      deleteStatus: "DELETE",
      model: {
        featuredImage: '',
        name: '',
        description: '',
        summary: '',
        startDate: '',
        endDate: ''
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
      startDate: {
        required,
      },
      endDate: {
        required,
      },
    }
  },
  methods: {
    async setMarket() {
      await this.$store.dispatch("GET_MARKET", this.$route.params.marketId);
      const { featuredImage, name, description, summary, startDate, endDate } = this.$store.getters.currentMarket;

      this.model = {
        featuredImage,
        name,
        description,
        summary,
        startDate,
        endDate,
      };
    },
    fileChange(files) {
      const newModel = { ...this.model };
      newModel.featuredImage = files[0];
      this.model = newModel;
    },
    async updateMarket() {
      try {
        this.status = "UPDATING";
        if (!this.$v.$invalid) {
          await this.$store.dispatch('UPDATE_MARKET', { id: this.$route.params.marketId, ...this.model });
          this.status = "SUCCESS";
          setTimeout(() => this.$router.push('/admin/markets'), 3000);
        }
      } catch(error) {
        this.status = "ERROR";
        this.error = error;
        setTimeout(() => this.status = "SUBMIT", 5000);
      }
    },
    async deleteMarket() {
      try {
        this.deleteStatus = "DELETING";
        await this.$store.dispatch("DELETE_MARKET", this.$route.params.marketId);
        this.deleteStatus = "DELETED";
        setTimeout(() => this.$router.push('/admin/markets'), 3000);
      } catch(error) {
        this.error = error.message;
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.uploaded-image {
  max-width: 250px;
}
</style>