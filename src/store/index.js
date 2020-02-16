import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    brightness: 0,
    contrast: 0
  },
  getters: {
    brightness(state) {
      return parseInt(state.brightness);
    },
    contrast(state) {
      return parseInt(state.contrast);
    }
  },
  mutations: {
    setBrightness(state, payload){
      state.brightness = payload;
    },
    setContrast(state, payload){
      state.contrast = payload;
    }
  },
  actions: {
    updateBrightness(context, payload) {
      context.commit('setBrightness', payload);
    },
    updateContrast(context, payload) {
      context.commit('setContrast', payload);
    }
  }
})
