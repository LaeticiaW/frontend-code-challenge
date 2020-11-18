<template>
  <div class="pokemon-container">
    <!-- Pokemon image -->
    <div class="image-wrapper">
      <pokemon-image
        :eager="eager"
        :pokemon="pokemon"
        max-height="190"
        max-width="138"
        @image-clicked="pokemonSelected"
      />
    </div>
    <!-- Footer containing some Pokemon properties and the Favorite button -->
    <div class="pokemon-footer">
      <div @click="pokemonSelected()">
        <div class="item-title">
          {{ pokemon.name }}
        </div>
        <div v-if="pokemon.types" class="item-subtitle">
          {{ pokemon.types.join(", ") }}
        </div>
      </div>
      <favorite-button :pokemon="pokemon" @favorite-changed="favoriteChanged" />
    </div>
  </div>
</template>

<script>
import FavoriteButton from "@/components/common/FavoriteButton";
import PokemonImage from "@/components/common/PokemonImage";

export default {
  name: "GridItem",

  props: {
    pokemon: {
      type: Object,
      required: true
    },
    eager: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  components: {
    FavoriteButton,
    PokemonImage
  },

  methods: {
    /*
     * When the user clicks on a Pokemon, display the Pokemon Details page
     */
    pokemonSelected() {
      this.$emit("details-displayed");
      this.$router.push({ name: "PokemonDetails", params: { name: this.pokemon.name } });
    },

    /*
     * When the user adds or removes the Pokemon from the favorites list, emit the favorites-changed event
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

.pokemon-container {
  height: 256x;
  width: 154px;
  border: solid 1px #cdcdcd;
  margin-left: auto;
  margin-right: auto;

  .image-wrapper {
    padding: 8px;
    height: 200px;
    display: flex;
    align-items: center;

    .image-wrapper-inner {
      margin: 8px;
      position: relative;
    }
  }

  .pokemon-footer {
    display: flex;
    justify-content: space-between;
    background-color: $secondary-color;
    padding: 8px;

    .item-title {
      font-weight: bold;
    }
    .item-subtitle {
      font-size: 0.875rem;
    }
  }
}
</style>
