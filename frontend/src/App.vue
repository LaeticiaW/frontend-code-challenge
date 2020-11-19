<template>
  <v-app>
    <v-main>
      <v-container fluid class="content-container">
        <transition name="fade" mode="out-in">
          <router-view :key="$route.fullPath"></router-view>
        </transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { pokemonTypesQuery } from "@/graphql";

export default {
  name: "App",

  data: () => ({
    pokemonTypes: [],
    skipQuery: false
  }),

  watch: {
    // After pokemon types are retrieved, save them to the Vuex store and then skip the query
    pokemonTypes(newTypes) {
      this.$store.commit("savePokemonTypes", newTypes);
      this.skipQuery = true;
    }
  },

  // Apollo query to retrieve the Pokemon types. This query should just run once - the types will be
  // saved in the Vuex store.
  apollo: {
    pokemonTypes: {
      query: pokemonTypesQuery,
      skip() {
        return this.skipQuery;
      },
      error(error) {
        console.error("Error retrieving Pokemon types", error);
      }
    }
  },

  methods: {
    /*
     * Set Vuetify theme colors
     */
    setThemeColors() {
      this.$vuetify.theme.themes.light.primary = "#71c1a1";
      this.$vuetify.theme.themes.light.secondary = "#efefef";
      this.$vuetify.theme.themes.light.success = "#71c1a1";
    }
  },

  created() {
    this.setThemeColors();
  }
};
</script>

<style lang="scss">
::v-deep .container {
  padding: 0px !important;
  padding: 0px 12px 12px 12px !important;
}

// Fade transition
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
