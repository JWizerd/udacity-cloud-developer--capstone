import getters from './getters';
import mutations from './mutations';
import actions from './actions';

export const MARKETS = {
  state: () => ({
    markets: [],
  }),
  getters,
  mutations,
  actions
}