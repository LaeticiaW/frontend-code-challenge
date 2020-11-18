import { createLocalVue, mount } from "@vue/test-utils";
import FavoriteButton from "@/components/common/FavoriteButton";
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

describe("FavoriteButton.vue", () => {
  const localVue = createLocalVue();
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  const mountComponent = function(propsData, mocks) {
    return mount(FavoriteButton, {
      vuetify,
      localVue,
      propsData: propsData || {},
      mocks: mocks || {}
    });
  };

  test("displays a button with the filled heart icon when the pokemon is a favorite", () => {
    const myPokemon = _.cloneDeep(pokemon);
    myPokemon.isFavorite = true;

    const wrapper = mountComponent({ pokemon: myPokemon });

    let button = wrapper.find("button");

    expect(button.exists()).toBe(true);
    expect(button.html()).toContain("mdi-heart");
    expect(button.html()).not.toContain("mdi-heart-outline");
  });

  test("displays a button with the outline heart icon when the pokemon is NOT a favorite", () => {
    const myPokemon = _.cloneDeep(pokemon);
    myPokemon.isFavorite = false;

    const wrapper = mountComponent({ pokemon: myPokemon });

    let button = wrapper.find("button");

    expect(button.exists()).toBe(true);
    expect(button.html()).toContain("mdi-heart-outline");
  });
});
