import Vue from 'vue'
import Router from 'vue-router'
import frontDest from './frontDesk'
import adminDest from './adminDesk'
import store from '../store/'
Vue.use(Router)

let router = new Router({
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
    ...frontDest,
    ...adminDest
  ]
})

// 用到了路由守卫
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  store.commit('system/initRequestedNumber') // 初始化计数器
  // console.log(to.meta.index, 'to.meta.index')
  store.commit('system/setActiveIndex', to.meta.index)
  next()
})

export default router
