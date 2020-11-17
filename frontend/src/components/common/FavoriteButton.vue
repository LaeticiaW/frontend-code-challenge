<template>
  <div>
    <!-- Favorite icon -->
    <v-btn icon @click="toggleFavorite" :title="buttonTitle">
      <v-icon color="red" class="favorite-icon" :class="{ favorite: pokemon.isFavorite }">{{ iconName }}</v-icon>
    </v-btn>
    <!-- Snack Msg -->
    <snack-msg ref="snack" :options="snackOptions" />
  </div>
</template>

<script>
import ApolloService from "@/services/apolloService";
import SnackMsg from "@/components/common/SnackMsg";

export default {
  name: "GridItem",

  props: {
    pokemon: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      snackOptions: {
        show: null,
        msg: null,
        color: "success"
      }
    };
  },

  components: {
    SnackMsg
  },

  computed: {
    // Determines whether to display the filled or outline heart icon based on whether this
    // Pokemon is a favorite or not.
    iconName() {
      return this.pokemon.isFavorite ? "mdi-heart" : "mdi-heart-outline";
    },
    // Determines the title text for the favorite icon
    buttonTitle() {
      return this.pokemon.isFavorite ? "Click to remove from favorites list" : "Click to add to favorites list";
    }
  },

  methods: {
    /*
     * Toggles the favorite icon when it is clicked, and either adds the Pokemon to the favorites list
     * or removes it.
     */
    toggleFavorite() {
      const isFavorite = !this.pokemon.isFavorite;

      if (isFavorite) {
        ApolloService.addToFavorites(this.$apollo, this.pokemon.id)
          .then(() => {
            this.$emit("favorite-changed", isFavorite, this.pokemon.id);
            this.$refs.snack.show("Successfully added Pokemon to favorites", "success");
          })
          .catch(error => {
            console.error("Error adding Pokemon to favorites:", error);
            this.$refs.snack.show("Unable to add Pokemon to favorites");
          });
      } else {
        ApolloService.removeFromFavorites(this.$apollo, this.pokemon.id)
          .then(() => {
            this.$emit("favorite-changed", isFavorite, this.pokemon.id);
            this.$refs.snack.show("Successfully removed Pokemon from favorites", "success");
          })
          .catch(error => {
            console.error("Error removing Pokemon from favorites:", error);
            this.$refs.snack.show("Unable to remove Pokemon from favorites");
          });
      }
    }
  }
};
</script>
