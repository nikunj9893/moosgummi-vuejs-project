import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'

import axios from './Axios'
import VueCookies from 'vue-cookies'

Vue.config.performance = true

Vue.prototype.$log = console.log.bind(console)

Vue.config.productionTip = false

Vue.use(CoreuiVue)
Vue.use(VueCookies)

new Vue({
  el: '#app',
  router: router(store),
  store,
  icons,
  template: '<App/>',
  components: {
    App,
  }
})

// Set user token to axios request 
const token = store.getters.getTokenFromCookies;

if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

Vue.prototype.axios = axios