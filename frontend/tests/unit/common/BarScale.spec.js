import { mount } from "@vue/test-utils";
import BarScale from "@/components/common/BarScale";

const mountComponent = function(propsData) {
  return mount(BarScale, {
    propsData: propsData || {}
  });
};
describe("BarScale.vue", () => {
  test("displays the label and value props", () => {
    const label = "CP";
    const scaleValue = 950;
    const maxValue = 3000;
    const color = "#71c1a1";

    const wrapper = mountComponent({ label, scaleValue, maxValue, color });

    expect(wrapper.text()).toContain(label + ": " + scaleValue);
  });
});
