<template>
  <div>
    <!-- Layout for all of the Pokemons -->
    <div class="grid">
      <div v-for="pokemon in pokemons" :key="pokemon.id" class="grid-cell">
        <grid-item
          :eager="eager"
          :pokemon="pokemon"
          @details-displayed="$emit('details-displayed')"
          @favorite-changed="$emit('favorite-changed')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import GridItem from "./GridItem";

export default {
  name: "GridLayout",

  props: {
    pokemons: {
      type: Array,
      required: true
    },
    eager: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data() {
    return {};
  },

  components: {
    GridItem
  }
};
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 1rem;
}
</style>
