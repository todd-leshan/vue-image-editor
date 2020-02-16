<template>
  <div>
    <canvas ref="canvas"></canvas>
    <div class="container--upload">
      <div class="file-name">
        <span>name</span>
        <span>{{ imgName }}</span>
      </div>
      <div class="file-upload">
        <label for="file--img">
          upload
        </label>
        <input 
          type="file" 
          id="file--img" 
          accept="image/png, image/jpeg"
          @change="getImage">
      </div>
    </div>
  </div>
</template>

<script>
import get from 'lodash/get';
import { mapGetters, mapActions } from 'vuex';

const ALLOWED_IMAGE_TYPE = [
  'image/jpeg',
  'image/png',
];

const DEFAULT_RANGE_VALUE = 0;

export default {
  name: 'ImgUpload',
  props: {
    updateFilterStatus: Function,
  },
  data: function() {
    return {
      ctx: null, 
      canvas: null,
      img: null, 
      imgName: '',
      originalImageData: null,
    };
  },
  computed: {
    ...mapGetters([
      'brightness',
      'contrast'
    ])
  },
  mounted: function() {
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.img = document.createElement("img");
  },
  watch: {
    contrast: function(newContrst) {
      this.applyFilters(newContrst, this.brightness);
    },
    brightness: function(newBrightness) {
      this.applyFilters(this.contrast, newBrightness);
    }
  },
  methods: {
    ...mapActions([
      'updateBrightness',
      'updateContrast'
    ]),
    getImage: function (event) {
      const vm = this;
      const input = event.target;
      const file = get(input, 'files[0]');

      if (!file || !file.type || !ALLOWED_IMAGE_TYPE.includes(file.type)) {
        return;
      }

      vm.ctx.clearRect(0, 0, vm.canvas.width, vm.canvas.height);
      vm.updateBrightness(DEFAULT_RANGE_VALUE);
      vm.updateContrast(DEFAULT_RANGE_VALUE);
      vm.updateFilterStatus('disabled');
      vm.originalImageData = null;

      const reader = new FileReader();

      reader.onload = (e) => {
        vm.img.src = e.target.result;
      }

      reader.readAsDataURL(file);

      vm.img.onload = () => {
        vm.imgName = file.name;
        vm.canvas.width = vm.img.width;
        vm.canvas.height = vm.img.height; //need to figure out how to calculate canvas height
        vm.ctx.drawImage(vm.img, 0, 0, vm.img.width, vm.img.height);

        const imageData = vm.ctx.getImageData(0, 0, vm.canvas.width, vm.canvas.height);

        vm.originalImageData = [...imageData.data];
        vm.updateFilterStatus('enabled');
      }
    },
    applyFilters(contrast, brightness) {
      const vm = this;

      if(vm.originalImageData === null) {
        return;
      }

      const data = [...vm.originalImageData];
      const contrastScaled = contrast * 2.55;
      const brightnessScaled = brightness * 2.55;
      const factor = (259 * (contrastScaled + 255)) / (255 * (259 - contrastScaled));

      for(let i=0;i<data.length;i+=4) {
        data[i]   = vm.applyFiltersOnPixelColor(data[i], factor, brightnessScaled);
        data[i+1] = vm.applyFiltersOnPixelColor(data[i+1], factor, brightnessScaled);
        data[i+2] = vm.applyFiltersOnPixelColor(data[i+2], factor, brightnessScaled);
      }

      const newImageData = new ImageData(new Uint8ClampedArray(data), vm.canvas.width, vm.canvas.height);

      // return newImageData;
      vm.ctx.putImageData(newImageData, 0, 0);
    },
    applyFiltersOnPixelColor(val, contrastFactor, brightness) {
      return contrastFactor * (val - 128) + 128 + brightness;
    }
  }
}
</script>