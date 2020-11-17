<template>
  <div class="list-layout">
    <v-list dense two-line height="48" class="list">
      <template v-for="pokemon in pokemons">
        <list-item
          :pokemon="pokemon"
          :key="pokemon.id"
          class="list-item"
          @favorite-changed="$emit('favorite-changed')"
          @details-displayed="$emit('details-displayed')"
        />
      </template>
    </v-list>
  </div>
</template>

<script>
import ListItem from "./ListItem";

export default {
  name: "ListLayout",

  props: {
    pokemons: {
      type: Array,
      required: true
    }
  },

  data() {
    return {};
  },

  components: {
    ListItem
  },

  methods: {
    getPokemonImage(pokemon) {
      const name = pokemon.name
        .toLowerCase()
        .replace(/[&\\/\\\\#,+()$~%.'":*?<>{}]/g, "")
        .replace(" ", "-");
      const url = `https://img.pokemondb.net/artwork/${name}.jpg`;
      return url;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.list {
  padding-top: 0px !important;
}
</style>
