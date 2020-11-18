import Vue from "vue";
import Router from "vue-router";
import PokemonDetails from "./components/details/PokemonDetails";
import PokemonList from "./components/list/PokemonList";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "PokemonList",
      component: PokemonList
    },
    {
      path: "/:name",
      name: "PokemonDetails",
      component: PokemonDetails
    }
  ]
});
