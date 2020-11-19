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
      tab: ""
    },
    pokemonTypes: []
  },
  getters: {
    getListState(state) {
      return _.cloneDeep(state.listState);
    }
  },
  mutations: {
    saveListState(state, listState) {
      state.listState = _.cloneDeep(listState);
    },
    savePokemonTypes(state, pokemonTypes) {
      state.pokemonTypes = pokemonTypes;
    }
  }
});
