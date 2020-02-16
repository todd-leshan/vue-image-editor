import { shallowMount } from '@vue/test-utils'
import ImgFilter from '@/components/ImgFilter.vue'

describe('ImgFilter.vue', () => {
  test('should return backgroundsize "50% 100%"', () => {
    const wrapper = shallowMount(ImgFilter, {
      data() {
        return {
          rangeValue: 0
        }
      }
    });
    expect(wrapper.vm.backgroundSize).toMatch('50% 100%');
  });

  test('should return backgroundsize "0% 100%"', () => {
    const wrapper = shallowMount(ImgFilter, {
      data() {
        return {
          rangeValue: -100
        }
      }
    });
    expect(wrapper.vm.backgroundSize).toMatch('0% 100%');
  });

  test('should return backgroundsize "100% 100%"', () => {
    const wrapper = shallowMount(ImgFilter, {
      data() {
        return {
          rangeValue: 100
        }
      }
    });
    expect(wrapper.vm.backgroundSize).toMatch('100% 100%');
  });
})
