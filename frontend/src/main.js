import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { createProvider } from "./vue-apollo";

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  // console.log("Router to:", to, "from:", from);
  next();
});

new Vue({
  router,
  store,
  vuetify,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount("#app");
