import { createLocalVue, mount } from "@vue/test-utils";
import ListToolbar from "@/components/list/ListToolbar";
import Vuetify from "vuetify";

describe("ListToolbar.vue", () => {
  const localVue = createLocalVue();
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  const mountComponent = function(propsData) {
    return mount(ListToolbar, {
      vuetify,
      localVue,
      propsData: propsData || {}
    });
  };

  test("displays the list toolbar search input, type select, list view icon, and grid view icon", () => {
    const wrapper = mountComponent();

    const searchInput = wrapper.find(".search");
    const typeInput = wrapper.find(".type");
    const listViewButton = wrapper.find("button.list-view");
    const gridViewButton = wrapper.find("button.grid-view");

    expect(searchInput.exists()).toBe(true);
    expect(typeInput.exists()).toBe(true);
    expect(listViewButton.exists()).toBe(true);
    expect(gridViewButton.exists()).toBe(true);
  });

  test("emits a search-changed event when text is input to the search field", () => {
    const wrapper = mountComponent();

    const searchInput = wrapper.find(".search input");
    const searchField = wrapper.find(".search");
    searchInput.setValue("abc");
    searchField.trigger("input");

    expect(wrapper.emitted()["search-changed"]).toBeTruthy();
    expect(wrapper.emitted()["search-changed"][0][0]).toEqual("abc");
  });

  test("emits a display-mode-changed event when the list view button is clicked", () => {
    const wrapper = mountComponent();

    const listViewButton = wrapper.find(".list-view");
    listViewButton.trigger("click");
    expect(wrapper.emitted()["display-mode-changed"]).toBeTruthy();
    expect(wrapper.emitted()["display-mode-changed"][0][0]).toEqual("LIST");
  });

  test("emits a display-mode-changed event when the grid view button is clicked", () => {
    const wrapper = mountComponent();

    const listViewButton = wrapper.find(".grid-view");
    listViewButton.trigger("click");
    expect(wrapper.emitted()["display-mode-changed"]).toBeTruthy();
    expect(wrapper.emitted()["display-mode-changed"][0][0]).toEqual("GRID");
  });
});
