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
import { mapGetters, mapActions } from 'vuex';

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
      const file = input.files[0];
      vm.ctx.clearRect(0, 0, vm.canvas.width, vm.canvas.height);
      vm.updateBrightness(50);
      vm.updateContrast(50);
      vm.updateFilterStatus('disabled');
      vm.originalImageData = null;

      if (input.files && file) 
      {
        if(file['type'] != 'image/jpeg' && file['type'] != 'image/png') {
          vm.updateFilterStatus('disabled');
          return;
        }
        
        const reader = new FileReader();
        reader.onload = function (e) {
          vm.img.src = e.target.result;
        }

        reader.readAsDataURL(file);

        vm.img.onload = function() 
        {
          vm.imgName = `${file.name.substring(0, 15)} ...`;
          vm.canvas.width = vm.img.width;
          vm.canvas.height = vm.img.height; //need to figure out how to calculate canvas height
          vm.ctx.drawImage(vm.img, 0, 0, vm.img.width, vm.img.height);

          let imageData = vm.ctx.getImageData(0, 0, vm.canvas.width, vm.canvas.height);

          vm.originalImageData = [...imageData.data];
          vm.updateFilterStatus('enabled');
        }
      }
    },
    applyFilters(contrast, brightness) {
      const vm = this;
      if(vm.originalImageData === null) {
        return;
      }

      const data = [...vm.originalImageData];

      const contrastScaled = 255 * 2 / 100 * contrast - 255;
      const brightnessScaled = 255 * 2 / 100 * brightness - 255;
      const factor = (259 * (contrastScaled + 255)) / (255 * (259 - contrastScaled)); 
      for(let i=0;i<data.length;i+=4) {
        data[i]   = vm.applyFiltersOnPixelColor(data[i], factor, brightnessScaled);
        data[i+1] = vm.applyFiltersOnPixelColor(data[i+1], factor, brightnessScaled);
        data[i+2] = vm.applyFiltersOnPixelColor(data[i+2], factor, brightnessScaled);
      }

      const newImageData = new ImageData(new Uint8ClampedArray(data), vm.canvas.width, vm.canvas.height);
      vm.ctx.putImageData(newImageData, 0, 0);
    },
    applyFiltersOnPixelColor(val, contrastFactor, brightness) {
      return contrastFactor * (val - 128) + 128 + brightness;
    }
  }
}
</script>