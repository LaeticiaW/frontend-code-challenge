<template>
  <v-img
    contain
    :eager="eager"
    :src="pokemonImage"
    :alt="pokemonAlt"
    :max-height="maxHeight"
    :max-width="maxWidth"
    @click="$emit('image-clicked')"
  />
</template>

<script>
export default {
  name: "PokemonImage",

  props: {
    pokemon: {
      type: Object,
      required: true
    },
    maxHeight: {
      type: String,
      required: false,
      default: undefined
    },
    maxWidth: {
      type: String,
      required: false,
      default: undefined
    },
    eager: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  computed: {
    // Calculates the url for the Pokemon image
    pokemonImage() {
      const name = this.pokemon.name
        .toLowerCase()
        .replace(/[&\\/\\\\#,+()$~%.'":*?<>{}]/g, "")
        .replace(" ", "-");
      const url = `https://img.pokemondb.net/artwork/${name}.jpg`;
      return url;
    },
    // Sets the alt text for the Pokemon image
    pokemonAlt() {
      return "Image of Pokemon " + this.pokemon.name;
    }
  }
};
</script>
