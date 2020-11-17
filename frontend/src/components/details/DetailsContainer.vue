<template>
  <div v-if="!$apollo.loading" class="details-container">
    <details2 :pokemon="pokemon" />
  </div>
</template>

<script>
import Details2 from "./Details";
import { pokemonByNameQuery } from "@/graphql";

export default {
  name: "DetailsContainer",

  data() {
    return {
      pokemon: {
        name: "",
        types: [],
        weight: {},
        height: {},
        evolutions: []
      }
    };
  },

  // Query to retrieve the Pokemon by name
  apollo: {
    pokemon: {
      query: pokemonByNameQuery,
      variables() {
        return { name: this.$route.params.name };
      },
      update: data => data.pokemonByName
    }
  },

  components: {
    Details2
  }
};
</script>

<style lang="scss" scoped>
.details-container {
  margin-left: auto;
  margin-right: auto;
  max-width: 490px;
  padding-top: 4px;
}
</style>
