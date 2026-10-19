import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as api from './api'
import 'swiper/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import './assets/css/reset.css'
// 适配
import "amfe-flexible/index.js";

Vue.config.productionTip = false
Vue.prototype.$api = api;
Vue.use(VueAwesomeSwiper)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
