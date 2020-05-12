import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appInfos: null
  },
  mutations: {
    UpdateAppInfos (state, model) {
      state.appInfos = model
    }
  },
  actions: {
    updateAppInfos ({ commit }, data) {
      commit('UpdateAppInfos', data)
    }
  },
  modules: {}
})
