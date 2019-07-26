// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import store from './store/'
import ElementUI from 'element-ui'
import api from './api/' // 个人封装的Api

import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.css'

let Tan = require('detector/lib/web-detector.js')
let _ = require('lodash')

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.prototype._ = _
Vue.prototype.$http = Axios
Vue.prototype.$detector = Tan
Vue.prototype.$api = api // 讲API挂载在Vue实例上

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
