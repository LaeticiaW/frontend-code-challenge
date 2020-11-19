<template>
  <div v-if="pokemon.name" class="details-container">
    <details2 :pokemon="pokemon" />
    <!-- Snack Msg -->
    <snack-msg ref="snack" :options="snackOptions" />
  </div>
</template>

<script>
import Details2 from "./Details";
import { pokemonByNameQuery } from "@/graphql";
import SnackMsg from "@/components/common/SnackMsg";

export default {
  name: "PokemonDetails",

  data() {
    return {
      pokemon: {
        name: "",
        types: [],
        weight: {},
        height: {},
        evolutions: []
      },
      snackOptions: {
        show: null,
        msg: null,
        color: "error"
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
      update: data => data.pokemonByName,
      fetchPolicy: "no-cache",
      error(error) {
        console.error("Error retrieving Pokemon details", error);
        this.$refs.snack.show("Unable to retrieve the Pokemon data");
      }
    }
  },

  components: {
    Details2,
    SnackMsg
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
