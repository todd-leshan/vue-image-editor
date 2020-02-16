<template>
  <div class="container--filter" :class=themeClass >
    <h3 class="filter-name">{{ name }}</h3>
    <div class="filter-range">
      <input 
        type="range" 
        min="-100" 
        max="100" 
        v-model=rangeValue
        :style="{backgroundSize: backgroundSize}"
        :disabled=disabled
      >
    </div>
    <span class="filter-desp">{{ description }}</span>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';

const SLIDER_DEBOUNCE_TIMEOUT = 50;
const SLIDER_RANGE_SIZE = 200;
const SLIDER_RANGE_OFFSET = SLIDER_RANGE_SIZE / 2;

export default {
  name: "ImgFilter",
  props: {
    name: String,
    description: String,
    defaultRange: Number,
    changeHandler: Function,
    themeClass: String,
    disabled: Boolean
  },
  data: function() {
    return {
      rangeValue: this.defaultRange
    };
  },
  computed: {
    backgroundSize: function() {
      return `${((parseInt(this.rangeValue) + SLIDER_RANGE_OFFSET) / SLIDER_RANGE_SIZE) * 100}% 100%`;
    }
  },
  watch: {
    rangeValue: debounce(function (val) {
      this.rangeValue = val;
      this.changeHandler(val);
    }, SLIDER_DEBOUNCE_TIMEOUT),
    defaultRange: function(newVal) {
      this.rangeValue = newVal;
    }
  }
}
</script>