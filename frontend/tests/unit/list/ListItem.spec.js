import { createLocalVue, mount } from "@vue/test-utils";
import ListItem from "@/components/list/ListItem";
import _ from "lodash-core";
import Vuetify from "vuetify";

const pokemon = {
  id: "002",
  name: "Ivysaur",
  types: ["Grass", "Poison"],
  sound: "http://dummyUrl",
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

describe("ListItem.vue", () => {
  const localVue = createLocalVue();
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  const mountComponent = function(propsData) {
    return mount(ListItem, {
      vuetify,
      localVue,
      propsData: propsData || {}
    });
  };

  test("displays a list item with Pokemon image, details, and favorite icon ", () => {
    const myPokemon = _.cloneDeep(pokemon);
    myPokemon.isFavorite = true;

    const wrapper = mountComponent({ pokemon: myPokemon });

    const image = wrapper.find(".pokemon-image");
    const favoriteButton = wrapper.find(".favorite-button");

    expect(image.exists()).toBe(true);
    expect(wrapper.html()).toContain(myPokemon.name);
    myPokemon.types.forEach(type => {
      expect(wrapper.html()).toContain(type);
    });
    expect(favoriteButton.exists()).toBe(true);
  });
});
