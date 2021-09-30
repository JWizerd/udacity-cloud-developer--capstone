<template>
  <div class="marketplace-create-form mb-5" v-if="$store.getters.currentMarketplace">
    <div class="text-danger text-center mb-3" v-if="status === 'ERROR'">{{ error }}</div>
    <div class="text-success text-center mb-3" v-if="status === 'SUCCESS'">Successfully updated marketplace!</div>
    <form @submit.prevent="updateMarketplace" novalidate>
      <div class="form-group text-center" v-if="error">
        <div class="text-danger">{{ error }}</div>
      </div>

      <div class="form-group">
        <label class="label" for="name">Featured Image</label>
        <div>
          <input type="hidden" v-model="model.featuredImage" />
          <img :src="$store.getters.currentMarketplace.featuredImage" class="img-fluid uploaded-image mb-1" />
          <input type="file" @change="fileChange($event.target.files)" accept="image/*" class="form-control-file">
        </div>

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
        <button type="submit" :disabled="$v.$invalid || deleteStatus !== 'DELETE'" class="btn btn-primary m-1">{{ status }}</button>
        <button @click="deleteMarketplace" :disabled="status !== 'UPDATE'" class="btn btn-danger">{{ deleteStatus }}</button>
      </div>
    </form>
  </div>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators';
import { MARKETPLACE_ACTIONS } from "../../../store/marketplaces/actions";
import { STATES } from "../../../utils";

export default {
  async created() {
    await this.setMarketplace();
  },
  computed: {
    states() {
      return STATES;
    }
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
    async setMarketplace() {
      await this.$store.dispatch(MARKETPLACE_ACTIONS.GET_MARKETPLACE, this.$route.params.marketplaceId);
      this.model = this.$store.getters.currentMarketplace;
    },
    fileChange(files) {
      const newModel = { ...this.model };
      newModel.featuredImage = files[0];
      this.model = newModel;
    },
    async updateMarketplace() {
      try {
        this.status = "UPDATING";
        if (!this.$v.$invalid) {
          await this.$store.dispatch(MARKETPLACE_ACTIONS.UPDATE_MARKETPLACE, { id: this.$route.params.marketplaceId, ...this.model });
          this.status = "SUCCESS";
          setTimeout(() => this.$router.push('/admin/marketplaces'), 3000);
        }
      } catch(error) {
        this.status = "ERROR";
        this.error = error;
        setTimeout(() => this.status = "SUBMIT", 5000);
      }
    },
    async deleteMarketplace() {
      try {
        this.deleteStatus = "DELETING";
        await this.$store.dispatch(MARKETPLACE_ACTIONS.DELETE_MARKETPLACE, this.$route.params.marketplaceId);
        this.deleteStatus = "DELETED";
        setTimeout(() => this.$router.push('/admin/marketplaces'), 3000);
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