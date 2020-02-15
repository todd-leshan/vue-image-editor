<template>
  <form action="#">
    <ImgFilter 
      name='Brightness'
      description='Slide to adjust image brightness!☀️'
      v-bind:defaultRange='brightness'
      themeClass='filter--eucalyptus'
      :changeHandler='updateBrightness'
      :disabled='disableFilter'
    /> 
    <ImgFilter 
      name='Contrast'
      description='Slide to adjust image contrast! 🌓'
      v-bind:defaultRange='contrast'
      themeClass='filter--havelock-blue'
      :changeHandler='updateContrast'
      :disabled='disableFilter'
    /> 
    <ImgUpload 
      :updateFilterStatus='updateFilterStatus'
    />
  </form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ImgFilter from '@/components/ImgFilter.vue';
import ImgUpload from '@/components/ImgUpload.vue';

export default {
  name: "ImgEditForm",
  data: function() {
    return {
      disableFilter: true
    }
  },
  components: {
    ImgFilter,
    ImgUpload
  },
  computed: {
    ...mapGetters([
      'brightness',
      'contrast'
    ])
  },
  methods: {
    ...mapActions([
      'updateBrightness',
      'updateContrast'
    ]),
    updateFilterStatus(status) {
      status == 'enabled' ? this.disableFilter = false : this.disableFilter = true;
    }
  }
}
</script>