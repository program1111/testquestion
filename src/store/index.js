import Vue from 'vue'
import Vuex from 'vuex'
import permission from './permission'
import menu from './menu'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    permission,
    menu
  }
})
