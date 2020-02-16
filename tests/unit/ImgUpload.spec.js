import { shallowMount, createLocalVue } from '@vue/test-utils'
import ImgUpload from '@/components/ImgUpload.vue'
import Vuex from 'vuex'

const localVue = createLocalVue();
localVue.use(Vuex);

describe('ImgUpload.vue', () => {
  let store;
  let getters;
  let actions;

  beforeEach(() => {
    getters = {
      'brightness': jest.fn(),
      'contrast': jest.fn()
    };

    actions = {
      'updateBrightness': jest.fn(),
      'updateContrast': jest.fn()
    };

    store = new Vuex.Store({
      getters,
      actions
    });

    jest.resetModules();
    jest.restoreAllMocks();
  });

  describe('applyFiltersOnPixelColor function', () => {
    test('should return 128', () => {
      const wrapper = shallowMount(ImgUpload, {
        store, localVue
      });

      expect(wrapper.vm.applyFiltersOnPixelColor(0, 0, 0)).toEqual(128);
    });

    test('should return 168', () => {
      const wrapper = shallowMount(ImgUpload, {
        store, localVue
      });

      expect(wrapper.vm.applyFiltersOnPixelColor(156, 1, 12)).toEqual(168);
    });

    test('should return 32768', () => {
      const wrapper = shallowMount(ImgUpload, {
        store, localVue
      });

      expect(wrapper.vm.applyFiltersOnPixelColor(255, 255, 255)).toEqual(32768);
    });
  });

  describe('applyFilters function', () => {
    test('should apply no filter to image pixels', () => {
      const originalImageData = [0, 0, 0, 0, 255, 255, 255, 1];

      const wrapper = shallowMount(ImgUpload, {
        store,
        localVue,
        data: () => {
          return {
            originalImageData,
          }
        }
      });
      wrapper.vm.canvas.width = 2;
      wrapper.vm.canvas.height = 1;

      const putImageDataSpy = jest.spyOn(wrapper.vm.ctx, 'putImageData');
      wrapper.vm.applyFilters(0, 0);

      expect(putImageDataSpy).toHaveBeenCalledTimes(1);
      expect(putImageDataSpy).toHaveBeenCalledWith(
        new ImageData(new Uint8ClampedArray(originalImageData), 2, 1), 0, 0
      );
    });

    test('should apply contrast filter to image pixels', () => {
      const originalImageData = [123, 23, 222, 0, 255, 255, 255, 1];
      const newImageData = [121, 0, 255, 0, 255, 255, 255, 1];

      const wrapper = shallowMount(ImgUpload, {
        store,
        localVue,
        data: () => {
          return {
            originalImageData,
          }
        }
      });
      wrapper.vm.canvas.width = 2;
      wrapper.vm.canvas.height = 1;

      const putImageDataSpy = jest.spyOn(wrapper.vm.ctx, 'putImageData');
      wrapper.vm.applyFilters(20, 0);

      expect(putImageDataSpy).toHaveBeenCalledTimes(1);
      expect(putImageDataSpy).toHaveBeenCalledWith(
        new ImageData(new Uint8ClampedArray(newImageData), 2, 1), 0, 0
      );
    });
  });
})