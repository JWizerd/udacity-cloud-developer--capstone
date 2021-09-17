import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Auth0Plugin } from "./auth";
import apiClientFactory from "./api";
import hljs from "highlight.js/lib/core";
import "highlight.js/styles/github.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faLink, faUser, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { domain, clientId } from "../auth_config.json";

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
    store.$api = apiClientFactory({
      baseURL: process.env.VUE_APP_API_URL,
      token: claims.__raw,
    })

    store.dispatch("CREATE_USER", user);
  },
});

library.add(faLink, faUser, faPowerOff);
Vue.component("font-awesome-icon", FontAwesomeIcon);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
