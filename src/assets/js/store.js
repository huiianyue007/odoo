import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    config: null,
    globalConfig: null
  },
  getters: {
  },
  mutations: {
    setConfig (state, opt) {
      state.config = opt
    },
    setGlobalConfig (state, opt) {
      state.globalConfig = opt
    }
  }
})
export default store
