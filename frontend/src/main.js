import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Auth0Plugin } from "./auth";
import apiClientFactory from "./api";
import hljs from "highlight.js/lib/core";
import "highlight.js/styles/github.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faLink, faUser, faPowerOff, faStore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { domain, clientId } from "../auth_config.json";
import Vuelidate from 'vuelidate';

Vue.use(Vuelidate);

store.$api = apiClientFactory({
  baseURL: process.env.VUE_APP_API_URL,
});

Vue.config.productionTip = false;

Vue.use(hljs.vuePlugin);

Vue.use(Auth0Plugin, {
  domain,
  clientId,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  },
  onAfterLogin: (user, claims) => {
    store.$api.defaults.headers.common.Authorization = `Bearer ${claims.__raw}`;

    if (localStorage.getItem('isLoggedIn') === null) {
      store.dispatch("CREATE_USER", user);
    }
  },
});

library.add(faLink, faUser, faPowerOff, faStore);
Vue.component("font-awesome-icon", FontAwesomeIcon);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
