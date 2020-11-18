<template>
  <v-list-item :key="pokemon.id" class="list-item">
    <v-list-item-content>
      <div class="list-item-content">
        <!-- Pokemon image -->
        <div class="image">
          <pokemon-image :pokemon="pokemon" @image-clicked="pokemonSelected" max-height="44" max-width="44" />
        </div>
        <!-- List title and subtitle, e.g. pokemon name and types -->
        <div class="list-title" @click="pokemonSelected()">
          <v-list-item-title class="title">{{ pokemon.name }}</v-list-item-title>
          <v-list-item-subtitle class="subtitle">{{ pokemon.types.join(", ") }}</v-list-item-subtitle>
        </div>
        <!-- Favorite icon -->
        <favorite-button :pokemon="pokemon" @favorite-changed="favoriteChanged" />
      </div>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import FavoriteButton from "@/components/common/FavoriteButton";
import PokemonImage from "@/components/common/PokemonImage";

export default {
  name: "ListItem",

  props: {
    pokemon: {
      type: Object,
      required: true
    }
  },

  components: {
    FavoriteButton,
    PokemonImage
  },

  methods: {
    /*
     * When the user clicks on a Pokemon, display the Pokemon details page
     */
    pokemonSelected() {
      this.$emit("details-displayed");
      this.$router.push({ name: "PokemonDetails", params: { name: this.pokemon.name } });
    },

    /*
     * When the user adds or removes a Pokemon from the favorites list, emit the favorites-changed event
     */
    favoriteChanged(isFavorite) {
      this.pokemon.isFavorite = isFavorite;
      this.$emit("favorite-changed");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.list-item-content {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: solid 1px $border-color;
  background-color: $secondary-color;

  .image {
    padding: 2px 4px 0px 2px;
    height: 46px;
    width: 46px;
    background-color: #ffffff;
    flex: 0 0;
  }
  .list-title {
    flex: 1 1;
    margin-left: 8px;
    .title {
      font-weight: bold;
    }
  }
}
</style>
