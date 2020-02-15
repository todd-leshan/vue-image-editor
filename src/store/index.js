import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    brightness: 50,
    contrast: 50,
    imageData: null
  },
  getters: {
    brightness(state) {
      return parseInt(state.brightness);
    },
    contrast(state) {
      return parseInt(state.contrast);
    },
    imageData(state) {
      return state.imageData;
    }
  },
  mutations: {
    setBrightness(state, payload){
      state.brightness = payload;
    },
    setContrast(state, payload){
      state.contrast = payload;
    },
    setImageData(state, payload){
      state.imageData = payload;
    }
  },
  actions: {
    updateBrightness(context, payload) {
      context.commit('setBrightness', payload);
    },
    updateContrast(context, payload) {
      context.commit('setContrast', payload);
    },
    updateImageData(context, payload) {
      context.commit('setImageData', payload);
    },
  }
})
