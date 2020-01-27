import Home from 'fontend/Home.vue'
import ArticleDetails from 'fontend/ArticleDetails.vue'

let fontDesk = [
  {
    path: '/',
    redirect: 'home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      title: '首页',
      keepAlive: false
    }
  },
  {
    path: '/article/:id',
    name: 'articleDetail',
    component: ArticleDetails,
    meta: {
      title: '文章详情',
      keepAlive: false
    }
  },
  {
    path: '/about1',
    name: 'about1',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ 'fontend/About.vue'),
    meta: {
      title: '用户详情页',
      keepAlive: false
    }
  },
  {
    path: '/demo',
    name: 'demo',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ 'fontend/Demo.vue'),
    meta: {
      title: '用户详情页',
      keepAlive: false
    }
  },
  {
    path: '/register',
    name: 'register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ 'fontend/Register.vue'),
    meta: {
      title: '用户注册',
      keepAlive: false
    }
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ 'fontend/Login.vue'),
    meta: {
      title: '用户登录',
      keepAlive: false
    }
  },
  {
    path: '*',
    component: {
      template: '<div>未找到当前页面frontDesk</div>'
    },
    meta: {
      title: '前端当前页面不存在',
      keepAlive: false
    }
  }
]

export default fontDesk
