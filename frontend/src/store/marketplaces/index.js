import getters from './getters';
import mutations from './mutations';
import actions from './actions';

export default {
  state: () => ({
    marketplaces: {},
    userMarketplaces: {},
    currentMarketplace: null,
    marketSchemaCreate: null,
    marketCreateFormError: "",
  }),
  getters,
  mutations,
  actions
}