import { createLocalVue, mount } from "@vue/test-utils";
import Details from "@/components/details/Details";
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

describe("FavoriteButton.vue", () => {
  const localVue = createLocalVue();
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  const mountComponent = function(propsData) {
    return mount(Details, {
      vuetify,
      localVue,
      propsData: propsData || {}
    });
  };

  test("displays Pokemon details ", () => {
    const myPokemon = _.cloneDeep(pokemon);
    myPokemon.isFavorite = true;

    const wrapper = mountComponent({ pokemon: myPokemon });

    const image = wrapper.find(".image");
    const evolutionsTitle = wrapper.find("div.section-title");
    const evolutionPokemons = wrapper.findAll(".pokemon-container");
    const audio = wrapper.find(".audio");
    const favoriteButton = wrapper.find(".favorite-button");

    expect(wrapper.html()).toContain(myPokemon.name);
    myPokemon.types.forEach(type => {
      expect(wrapper.html()).toContain(type);
    });
    expect(wrapper.html()).toContain(myPokemon.maxCP);
    expect(wrapper.html()).toContain(myPokemon.maxHP);
    expect(wrapper.html()).toContain(myPokemon.weight.minimum + " - " + myPokemon.weight.maximum);
    expect(wrapper.html()).toContain(myPokemon.height.minimum + " - " + myPokemon.height.maximum);
    expect(image.exists()).toBe(true);
    expect(evolutionsTitle.text()).toMatch("Evolutions");
    expect(evolutionPokemons.length).toEqual(1);
    expect(evolutionPokemons.at(0).html()).toContain(myPokemon.evolutions[0].name);
    expect(audio.exists()).toBe(true);
    expect(favoriteButton.exists()).toBe(true);
  });
});
