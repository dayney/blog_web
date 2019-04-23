// import Home from 'admin/Home.vue'

// import Layout from '../views/admin/components/Layout.vue'
import Layout from 'admin/components/Layout.vue'

let adminDesk = [
  {
    path: '/admin',
    name: 'admin',
    redirect: './admin/index',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'adminIndex',
        component: {
          template: '<div>管理后台首页11111</div>'
        },
        meta: {
          title: '后台管理的首页',
          keepAlive: false
        }
      }
    ]
  }
]

export default adminDesk
