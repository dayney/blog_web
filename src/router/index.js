import Vue from 'vue'
import Router from 'vue-router'
import frontDest from './frontDesk'
// import adminDest from './adminDesk'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    ...frontDest
    // ...frontDest,
    // ...adminDest
  ]
})
