import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element'

import axios from 'axios'
import api from './api/index.js'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)
// axios.defaults.baseURL = 'http://localhost:8888'
Vue.prototype.$http = axios

Vue.prototype.$api = api
Vue.config.productionTip = false
// 这里主要实现每次请求就将token一起发送
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')

  return config
})

axios.interceptors.response.use(config => {
  return config
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
