import Vue from 'vue'
/* eslint-disable */
import Axios from 'axios'
import App from './App.vue'
import router from './router/'
import store from './store/'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.css'
// import 'font-awesome/css/font-awesome.min.css'

Vue.use(ElementUI)

Vue.prototype.$http = Axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
