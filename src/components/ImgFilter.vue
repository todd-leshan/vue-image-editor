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
import _ from 'lodash';

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
      return `${((parseInt(this.rangeValue) + 100) / 200) * 100}% 100%`;
    }
  },
  watch: {
    rangeValue: _.debounce(function (val) {
      this.rangeValue = val;
      this.changeHandler(val);
    }, 50),
    defaultRange: function(newVal) {
      this.rangeValue = newVal;
    }
  }
}
</script>