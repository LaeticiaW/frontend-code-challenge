<template>
  <div class="list-toolbar">
    <!-- Search and Type filter fields -->
    <v-text-field
      v-model="search"
      placeholder="Search"
      class="filter-item search rounded-0"
      background-color="secondary"
      color="primary"
      height="32"
      @input="searchChanged"
      solo
      flat
      dense
      hide-details
      clearable
    />
    <v-select
      v-model="type"
      :items="$store.state.pokemonTypes"
      placeholder="Type"
      class="filter-item type rounded-0"
      background-color="secondary"
      color="primary"
      @change="typeChanged"
      height="32"
      solo
      flat
      dense
      hide-details
      clearable
    />

    <!-- List View and Grid View icons -->
    <v-btn icon color="primary" class="list-view" @click="displayModeChanged(displayModes.LIST)" title="List View">
      <v-icon>mdi-view-headline</v-icon>
    </v-btn>

    <v-btn icon color="primary" class="grid-view" @click="displayModeChanged(displayModes.GRID)" title="Grid View">
      <v-icon>mdi-view-module</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { DisplayModes } from "@/enums";

export default {
  name: "ListToolbar",

  props: {
    searchText: {
      type: String,
      required: false
    },
    pokemonType: {
      type: String,
      required: false
    }
  },

  data() {
    return {
      search: this.searchText,
      type: this.pokemonType,
      pokemonTypes: [],
      displayModes: DisplayModes
    };
  },

  methods: {
    /*
     * Emit the search-changed event
     */
    searchChanged(value) {
      this.$emit("search-changed", value);
    },

    /*
     * Emit the type-changed event
     */
    typeChanged(value) {
      this.$emit("type-changed", value);
    },

    /*
     * Emit the display-mode-changed event
     */
    displayModeChanged(value) {
      this.$emit("display-mode-changed", value);
    }
  }
};
</script>

<style lang="scss" scoped>
.list-toolbar {
  display: flex;
  height: 32px;
  margin-bottom: 4px;
  justify-content: space-between;
}

.filter-item {
  background-color: #e0e0e0;
  &.search {
    margin-right: 10px !important;
  }
  &.type {
    max-width: 300px;
  }

  // Override Vuetify input min height
  .v-input__slot,
  .v-input.filter-item,
  .v-text-field.v-text-field--solo.v-input--dense > .v-input__control {
    height: 32px !important;
    min-height: 32px !important;
    max-height: 32px !important;
  }
}
</style>
