import Vue from "vue";
import Router from "vue-router";
import DetailsContainer from "./components/details/DetailsContainer";
import ListContainer from "./components/list/ListContainer";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "ListContainer",
      component: ListContainer
    },
    {
      path: "/:name",
      name: "DetailsContainer",
      component: DetailsContainer
    }
  ]
});
