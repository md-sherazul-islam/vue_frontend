import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/app.scss'
import 'jquery'
//window.$ = window.jQuery = jQuery
import 'popper.js'
import 'bootstrap'

require('@/store/subscriber');

Vue.config.productionTip = false

store.dispatch('auth/attempt', localStorage.getItem('token'))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
