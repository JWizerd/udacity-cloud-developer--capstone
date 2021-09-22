<template>
  <div class="market-create-form mb-5" v-if="$store.getters.marketSchemaCreate">
    <div class="text-danger text-center mb-3" v-if="error">{{ error }}</div>
    <div class="text-success text-center mb-3" v-if="success">Successfully created market! Redirecting to markets page...</div>
    <vue-form-json-schema
      v-model="model"
      :schema="$store.getters.marketSchemaCreate"
      :ui-schema="uiSchema"
    >
    </vue-form-json-schema>
    <button @click="createMarket" class="btn btn-primary">Save Market</button>
  </div>
</template>

<script>
export default {
  async created() {
    this.$store.dispatch("GET_MARKET_SCHEMA_CREATE");
  },
  methods: {
    async createMarket() {
      try {
        await this.$store.dispatch('CREATE_MARKET', this.model);
        this.success = true;
        setTimeout(() => this.$router.push('/admin/markets'), 2000);
      } catch(error) {
        this.error = error;
      }
    }
  },
  data() {
    return {
      error: null,
      success: false,
      model: {},
      uiSchema: [
        {
          component: 'input',
          model: 'name',
          fieldOptions: {
            class: ['form-control mb-3'],
            on: ['input'],
            attrs: {
              placeholder: 'Enter name',
            },
          },
        },
        {
          component: 'textarea',
          model: 'summary',
          fieldOptions: {
            class: ['form-control mb-3'],
            on: ['input'],
            attrs: {
              placeholder: 'Enter summary',
            },
          },
        },
        {
          component: 'textarea',
          model: 'description',
          fieldOptions: {
            class: ['form-control mb-3'],
            on: ['input'],
            attrs: {
              placeholder: 'Enter description',
            },
          },
        }
      ],
    }
  },
}
</script>