import gql from "graphql-tag";

export default {
  /**
   * Add a pokemon to the favorite list
   * @param {string} pokemonId
   */
  addToFavorites($apollo, pokemonId) {
    return $apollo
      .mutate({
        mutation: gql`
          mutation($id: ID!) {
            favoritePokemon(id: $id) {
              id
              name
            }
          }
        `,
        variables: {
          id: pokemonId
        }
      })
      .then(() => {
        return;
      })
      .catch(error => {
        console.error("Error setting favorite pokemon:", error);
        Promise.reject(error);
      });
  },

  /**
   * Remove a pokemon from the favorite list
   * @param {string} pokemonId
   */
  removeFromFavorites($apollo, pokemonId) {
    return $apollo
      .mutate({
        mutation: gql`
          mutation($id: ID!) {
            unFavoritePokemon(id: $id) {
              id
              name
            }
          }
        `,
        variables: {
          id: pokemonId
        }
      })
      .then(() => {
        return;
      })
      .catch(error => {
        console.error("Error unsetting favorite pokemon", error);
        Promise.reject(error);
      });
  }
};
