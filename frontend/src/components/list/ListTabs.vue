<template>
  <div>
    <v-tabs
      v-model="activeTabIndex"
      active-class="active-tab"
      height="32"
      class="list-tabs"
      color="primary"
      grow
      hide-slider
    >
      <v-tab :replace="true" ripple class="tab" @change="tabChanged(listTabIds.ALL)">All</v-tab>
      <v-tab :replace="true" ripple class="tab" @change="tabChanged(listTabIds.FAVORITES)">Favorites</v-tab>
    </v-tabs>
  </div>
</template>

<script>
import { ListTabIds } from "@/enums";

export default {
  name: "ListTabs",

  props: {
    activeTab: {
      type: Number,
      required: false
    }
  },

  data() {
    return {
      activeTabIndex: this.activeTab | 0,
      listTabIds: ListTabIds
    };
  },

  methods: {
    /*
     * When the user changes the tab, propagate the tab-changed event
     */
    tabChanged(tab) {
      this.$emit("tab-changed", tab);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.tab {
  border: solid 1px $primary-color;
  color: $primary-color !important;
}
.active-tab {
  background-color: $primary-color;
  color: #ffffff !important;
}
.list-tabs {
  margin-bottom: 8px;
}

// Override Vuetify tab text to allow mixed case
.v-tab {
  text-transform: none !important;
}
</style>
