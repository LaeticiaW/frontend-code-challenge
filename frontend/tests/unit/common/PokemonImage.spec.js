import { createLocalVue, mount } from "@vue/test-utils";
import PokemonImage from "@/components/common/PokemonImage";
import _ from "lodash-core";
import Vuetify from "vuetify";

const pokemon = {
  id: "002",
  name: "Ivysaur",
  types: ["Grass", "Poison"],
  sound: "http://localhost:4000/sounds/2",
  maxCP: 1483,
  maxHP: 1632,
  isFavorite: false,
  weight: {
    minimum: "11.38kg",
    maximum: "14.63kg",
    __typename: "PokemonDimension"
  },
  height: {
    minimum: "0.88m",
    maximum: "1.13m",
    __typename: "PokemonDimension"
  },
  evolutions: [
    {
      id: "003",
      name: "Venusaur",
      isFavorite: false,
      __typename: "Pokemon"
    }
  ],
  __typename: "Pokemon"
};

describe("PokemonImage.vue", () => {
  const localVue = createLocalVue();
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  const mountComponent = function(propsData) {
    return mount(PokemonImage, {
      vuetify,
      localVue,
      propsData: propsData || {}
    });
  };

  test("displays a Pokemon image area without an audio icon", () => {
    const myPokemon = _.cloneDeep(pokemon);

    const wrapper = mountComponent({ pokemon: myPokemon });

    let image = wrapper.find(".pokemon-image");

    expect(image.exists()).toBe(true);
    expect(wrapper.html()).toContain("Image of Pokemon " + myPokemon.name);
  });
});
