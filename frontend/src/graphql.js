import gql from "graphql-tag";

// Retrieves the list of pokemon types
export const pokemonTypesQuery = gql`
  query pokemonTypes {
    pokemonTypes
  }
`;

// Retrieves the list of pokemons
export const pokemonsQuery = gql`
  query pokemons($limit: Int, $offset: Int, $search: String, $type: String, $isFavorite: Boolean) {
    pokemons(
      query: { limit: $limit, offset: $offset, search: $search, filter: { type: $type, isFavorite: $isFavorite } }
    ) {
      limit
      offset
      count
      edges {
        id
        name
        types
        isFavorite
      }
    }
  }
`;

// Retrieves one pokemon by name
export const pokemonByNameQuery = gql`
  query pokemonByName($name: String!) {
    pokemonByName(name: $name) {
      id
      name
      types
      sound
      maxCP
      maxHP
      isFavorite
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      evolutions {
        id
        name
        isFavorite
      }
    }
  }
`;
