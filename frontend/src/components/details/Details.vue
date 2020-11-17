<template>
  <div>
    <section class="details-wrapper">
      <!-- Pokemon image -->
      <div class="image">
        <pokemon-image :pokemon="pokemon" max-height="270" max-width="470" :eager="true" />
        <div class="audio">
          <v-btn icon large @click="playSound()">
            <v-icon color="primary">mdi-volume-high</v-icon>
          </v-btn>
        </div>
      </div>

      <!-- Details -->
      <div class="details">
        <!-- Basic info -->
        <div class="basic-info">
          <div>
            <div class="title">{{ pokemon.name }}</div>
            <div class="subtitle">{{ pokemon.types.join(", ") }}</div>
          </div>
          <div>
            <favorite-button :pokemon="pokemon" @favorite-changed="favoriteChanged" />
          </div>
        </div>

        <!-- Bar scale -->
        <div class="scale-stats">
          <bar-scale label="maxCP" color="#9f9fff" :max-value="3000" :scale-value="pokemon.maxCP" />
          <bar-scale label="maxHP" color="#71c1a1" :max-value="3000" :scale-value="pokemon.maxHP" />
        </div>

        <!-- Height and weight -->
        <div class="height-weight">
          <div class="weight-wrapper">
            <label>
              Weight
              <div class="weight">{{ pokemon.weight.minimum }} - {{ pokemon.weight.maximum }}</div>
            </label>
          </div>
          <div>
            <label for="height">
              Height
              <div class="height">{{ pokemon.height.minimum }} - {{ pokemon.height.maximum }}</div>
            </label>
          </div>
        </div>
      </div>
    </section>

    <!-- Evolutions -->
    <section v-if="pokemon.evolutions.length">
      <div class="section-title">Evolutions</div>
      <grid-layout :pokemons="pokemon.evolutions" :eager="true" />
    </section>
  </div>
</template>

<script>
import GridLayout from "@/components/list/GridLayout";
import FavoriteButton from "@/components/common/FavoriteButton";
import PokemonImage from "@/components/common/PokemonImage";
import BarScale from "@/components/common/BarScale";

export default {
  name: "Details2",
  props: {
    pokemon: {
      type: Object,
      required: true
    }
  },

  components: {
    GridLayout,
    FavoriteButton,
    PokemonImage,
    BarScale
  },

  methods: {
    playSound() {
      if (this.pokemon.sound) {
        var audio = new Audio(this.pokemon.sound);
        audio.play();
      }
    },

    favoriteChanged(isFavorite) {
      this.pokemon.isFavorite = isFavorite;
      this.$emit("favorite-changed");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.details-wrapper {
  position: relative;
  border: solid 1px #cdcdcd;
  margin-bottom: 12px;
  width: 492px;

  .details {
    background-color: $secondary-color;

    .image {
      position: relative;
      padding: 8px;
      height: 290px;

      .audio {
        position: absolute;
        top: 230px;
        left: 12px;
      }
    }
    .basic-info {
      display: flex;
      justify-content: space-between;
      padding: 8px 12px 4px 12px;
    }
    .height-weight {
      display: flex;
      justify-content: space-between;
      text-align: center;
      background-color: $secondary-color;

      > div {
        flex: 1 1;
        padding: 8px;
        border-top: solid 1px $border-color;
      }

      .weight-wrapper {
        border-right: solid 1px $border-color;
      }

      .height,
      .weight {
        font-weight: 500;
      }
    }
    label {
      font-weight: bold;
    }
  }
}

.section-title {
  font-weight: bold;
  font-size: 1.125rem;
}
</style>
