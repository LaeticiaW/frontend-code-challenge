import Vue from "vue";
import Vuex from "vuex";
import _ from "lodash-core";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    listState: {
      isGrid: true,
      isList: false,
      activeTab: null,
      query: {
        limit: 1000,
        offset: 0,
        search: null,
        filter: {
          type: null,
          isFavorite: false
        }
      },
      tab: "",
      scrollPosition: null
    },
    listPokemons: []
  },
  getters: {
    getListState(state) {
      return _.cloneDeep(state.listState);
    },
    getListPokemons(state) {
      return _.cloneDeep(state.listPokemons);
    }
  },
  mutations: {
    saveListState(state, listState) {
      state.listState = _.cloneDeep(listState);
    },
    saveListPokemons(state, pokemons) {
      state.pokemons = _.cloneDeep(pokemons);
    }
  },
  actions: {}
});
