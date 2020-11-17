<template>
  <div class="bar-scale-container">
    <div class="bar-scale-wrapper" :style="{ border: 'solid 2px ' + color }">
      <div class="bar-scale" :style="{ width: scaleWidth, backgroundColor: color }" />
    </div>
    <div class="scale-value">{{ label }}: {{ scaleValue }}</div>
  </div>
</template>

<script>
export default {
  name: "BarScale",
  props: {
    label: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    maxValue: {
      type: Number,
      required: true
    },
    scaleValue: {
      type: Number,
      required: true
    }
  },

  computed: {
    /*
     * Calculate the percentage of the scale value to the max value, capping it at 100%
     */
    scaleWidth() {
      let pct = parseInt((this.scaleValue / this.maxValue) * 100, 10);
      if (pct > 100) {
        pct = 100;
      }
      return pct + "%";
    }
  }
};
</script>

<style lang="scss" scoped>
.bar-scale-container {
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  .bar-scale-wrapper {
    position: relative;
    border-radius: 3px;
    margin: 4px 8px;
    flex: 1 0;
    .bar-scale {
      height: 12px;
    }
  }
  .scale-value {
    flex-basis: 100px;
    font-size: 13px;
    font-weight: bold;
  }
}
</style>
