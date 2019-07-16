// import Home from 'admin/Home.vue'

// import Layout from '../views/admin/components/Layout.vue'
import Layout from 'admin/components/Layout.vue'
import User from 'admin/User.vue'
import Demo from 'admin/Demo.vue'

let adminDesk = [
  {
    path: '/admin',
    name: '',
    redirect: './admin/index',
    component: Layout,
    meta: {
      index: '1',
      title: '首页',
      keepAlive: false
    },
    children: [
      {
        path: 'index',
        name: 'index',
        component: {
          template: '<div>管理后台首页的内容</div>'
        },
        meta: {
          index: '1',
          title: '后台管理的首页',
          keepAlive: false
        }
      },
      {
        path: 'user',
        name: 'user',
        component: User,
        meta: {
          index: '2',
          title: '用户数据',
          keepAlive: false
        }
      },
      {
        path: 'article',
        name: 'article',
        component: Demo,
        meta: {
          index: '3',
          title: '文章管理',
          keepAlive: false
        }
      },
      {
        path: 'navigation',
        name: 'navigation',
        component: {
          template: '<div>navigation</div>'
        },
        meta: {
          index: '4',
          title: '导航管理四',
          keepAlive: false
        }
      },
      {
        path: 'navigation1',
        name: 'navigation1',
        component: {
          template: `<router-view></router-view>`
        },
        meta: {
          index: '5',
          title: '导航六',
          keepAlive: false
        },
        children: [
          {
            path: '1',
            name: '1',
            meta: {
              index: '5-1',
              title: '导航分支1',
              keepAlive: false
            },
            component: {
              template: `<div>导航分支1</div>`
            }
          },
          {
            path: '2',
            name: '2',
            meta: {
              index: '5-2',
              title: '导航分支2',
              keepAlive: false
            },
            component: {
              template: '<div>导航分支2</div>'
            }
          },
          {
            path: '3',
            name: '3',
            meta: {
              index: '5-3',
              title: '导航分支3',
              keepAlive: false
            },
            component: {
              template: '<div>导航分支3</div>'
            }
          },
          {
            path: '4',
            name: '4',
            meta: {
              index: '5-4',
              title: '导航分支4',
              keepAlive: false
            },
            component: {
              template: '<div>导航分支4</div>'
            }
          },
          {
            path: '5',
            name: '5',
            meta: {
              index: '5-5',
              title: '导航分支5',
              keepAlive: false
            },
            component: {
              template: '<div>导航分支5</div>'
            }
          },
          {
            path: '6',
            name: '6',
            meta: {
              index: '5-6',
              title: '导航分支6',
              keepAlive: false
            },
            component: {
              template: '<div>导航分支6</div>'
            }
          },
          {
            path: '7',
            name: '7',
            meta: {
              index: '5-7',
              title: '导航分支7',
              keepAlive: false
            },
            component: {
              template: '<div>导航分支7</div>'
            }
          },
          {
            path: '8',
            name: '8',
            meta: {
              index: '5-8',
              title: '导航分支8',
              keepAlive: false
            },
            component: {
              template: '<div>导航分支8</div>'
            }
          },
          {
            path: '9',
            name: '9',
            meta: {
              index: '5-9',
              title: '导航分支9',
              keepAlive: false
            },
            component: {
              template: '<div>导航分支9</div>'
            }
          }
        ]
      },
      {
        path: 'systemSet',
        name: 'systemSet',
        component: {
          template: '<div>系统设置</div>'
        },
        meta: {
          index: '6',
          title: '系统设置',
          keepAlive: false
        }
      },
      {
        path: 'systemLog',
        name: 'systemLog',
        component: {
          template: '<div>此处是系统日志</div>'
        },
        meta: {
          index: '6-1',
          title: '系统日志',
          keepAlive: false
        }
      },
      {
        path: 'systemDBBack',
        name: 'systemDBBack',
        component: {
          template: '<div>数据库备份</div>'
        },
        meta: {
          index: '6-2',
          title: '数据库备份',
          keepAlive: false
        }
      }
    ]
  }
]

export default adminDesk
