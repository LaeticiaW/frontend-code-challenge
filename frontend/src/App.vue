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
export default {
  name: "App",

  data: () => ({}),

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
  transition: opacity 0.25s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
