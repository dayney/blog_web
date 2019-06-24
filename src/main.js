// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import store from './store/'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.css'
let Tan = require('detector/lib/web-detector.js')
let _ = require('lodash')

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.prototype._ = _
Vue.prototype.$http = Axios
Vue.prototype.$detector = Tan
console.log('use detector...')
console.log(typeof Tan)
console.log(Tan)
console.log(Vue.$http)
console.log('use detector...')
console.log('Vue.tan')
console.log(Vue.$tan)
console.log('Vue.tan')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
