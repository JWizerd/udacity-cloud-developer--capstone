import getters from './getters';
import mutations from './mutations';
import actions from './actions';

export default {
  state: () => ({
    markets: {},
    userMarkets: [],
    currentMarket: null,
    marketSchemaCreate: null,
    marketCreateFormError: "",
  }),
  getters,
  mutations,
  actions
}