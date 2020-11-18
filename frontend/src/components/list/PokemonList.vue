<template>
  <div class="list-container">
    <!-- Header including tabs and toolbar -->
    <header class="list-header">
      <list-tabs :active-tab="listState.activeTab" @tab-changed="tabChanged" />
      <list-toolbar
        :search-text="listState.query.search"
        :pokemon-type="listState.query.filter.type"
        @search-changed="debounceSearchChanged"
        @type-changed="typeChanged"
        @display-mode-changed="displayModeChanged"
      />
    </header>
    <!-- Content area for either the grid layout or the list layout -->
    <section class="list-content">
      <grid-layout
        v-if="listState.isGrid"
        :pokemons="pokemons"
        @details-displayed="saveListState"
        @favorite-changed="favoriteChanged"
      />
      <list-layout
        v-if="listState.isList"
        :pokemons="pokemons"
        @details-displayed="saveListState"
        @favorite-changed="favoriteChanged"
      />
    </section>
    <!-- Snack Msg -->
    <snack-msg ref="snack" :options="snackOptions" />
  </div>
</template>

<script>
import ListTabs from "./ListTabs";
import ListToolbar from "./ListToolbar";
import GridLayout from "./GridLayout";
import ListLayout from "./ListLayout";
import _ from "lodash-core";
import { DisplayModes, ListTabIds } from "@/enums";
import { pokemonsQuery } from "@/graphql";
import SnackMsg from "@/components/common/SnackMsg";

export default {
  name: "PokemonList",

  data() {
    return {
      listState: {
        isGrid: true,
        isList: false,
        activeTab: 0,
        query: {
          limit: 1000,
          offset: 0,
          search: undefined,
          filter: {
            type: undefined,
            isFavorite: false
          }
        }
      },
      pokemons: [],
      snackOptions: {
        show: null,
        msg: null,
        color: "error"
      }
    };
  },

  // Apollo query to retrieve all Pokemons
  apollo: {
    pokemons: {
      query: pokemonsQuery,
      variables() {
        return {
          search: this.listState.query.search,
          type: this.listState.query.filter.type,
          isFavorite: this.listState.query.filter.isFavorite
        };
      },
      update: data => data.pokemons.edges,
      fetchPolicy: "no-cache",
      debounce: 200,
      error(error) {
        console.error("Error retrieving Pokemon list", error);
        this.$refs.snack.show("Unable to retrieve the list of Pokemons");
      }
    }
  },

  components: {
    ListTabs,
    ListToolbar,
    GridLayout,
    ListLayout,
    SnackMsg
  },

  methods: {
    /*
     * Updates the query search field as the user enters search text
     */
    searchChanged(search) {
      this.listState.query.search = search;
    },

    /*
     * Updates the query type field when the user chooses a Pokemon type
     */
    typeChanged(type) {
      this.listState.query.filter.type = type;
    },

    /*
     * Changes the display mode between grid and list when the user clicks on the
     * grid and list icons
     */
    displayModeChanged(displayMode) {
      if (displayMode === DisplayModes.LIST) {
        this.listState.isList = true;
        this.listState.isGrid = false;
      } else if (displayMode === DisplayModes.GRID) {
        this.listState.isGrid = true;
        this.listState.isList = false;
      } else {
        console.error("Invalid display mode change:", displayMode);
      }
    },

    /*
     * Updates the query favorite field when the user changes between the All and Favorites tabs
     */
    tabChanged(tab) {
      this.listState.activeTab = tab;
      if (tab === ListTabIds.ALL) {
        this.listState.query.filter.isFavorite = false;
      } else {
        this.listState.query.filter.isFavorite = true;
      }
    },

    /*
     * Refetch the Pokemons list when the user adds or removes a Pokemon from the favorites list
     */
    favoriteChanged() {
      if (this.listState.query.filter.isFavorite) {
        this.$apollo.queries.pokemons.refetch();
      }
    },

    /*
     * Save the query and display parameters to the Vuex store so that the list state can be
     * restored when the user returns from the Details page
     */
    saveListState() {
      this.$store.commit("saveListState", this.listState);
    },

    /*
     * Restore the query and display parameters from the Vuex store
     */
    restoreListState() {
      this.listState = this.$store.getters.getListState;
    }
  },

  created() {
    // Debounce the searchChanged method to prevent too many server calls as user types
    this.debounceSearchChanged = _.debounce(this.searchChanged, 250);

    // If got here via back button from the Details page, restore the query and display
    // parameters, so the user sees the same data
    if (
      this.$router.options.routes.length >= 2 &&
      this.$router.options.routes[0].name === "PokemonList" &&
      this.$router.options.routes[1].name === "PokemonDetails"
    ) {
      this.restoreListState();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.list-header {
  position: fixed;
  top: 0px;
  width: calc(100% - 26px);
  padding: 8px 0px 8px 0px;
  box-shadow: 0px 4px 2px -2px $border-color;
  // Prevent content bleeding through top of header on scroll
  margin-top: -1px;
  z-index: 5;
  background-color: #ffffff;
}
.list-content {
  margin-top: 96px;
}
</style>
