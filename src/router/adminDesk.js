// import Home from 'admin/Home.vue'

// import Layout from '../views/admin/components/Layout.vue'
import Layout from 'admin/components/Layout.vue'
import User from 'admin/User.vue'
import AddUser from 'admin/AddUser.vue'
import EditUser from 'admin/EditUser.vue'
import Article from 'admin/Article.vue'
import AddArticle from 'admin/AddArticle.vue'
// import ArticleDetails from 'admin/ArticleDetails.vue'
import EditArticle from 'admin/EditArticle.vue'
import Tag from 'admin/Tag.vue'
import AddCategory from 'admin/AddCategory.vue'
// import EditTag from 'admin/EditTag.vue'
// import Project from 'admin/Project.vue'
import AddTag from 'admin/AddTag.vue'
import EditTag from 'admin/EditTag.vue'
import Project from 'admin/Project.vue'
import About from 'admin/About.vue'

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
        component: {
          template: `<router-view></router-view>`
        },
        meta: {
          index: '2',
          title: '用户数据',
          keepAlive: false
        },
        redirect: './user/userList',
        children: [
          {
            path: 'userList',
            name: 'userList',
            meta: {
              index: '2-1',
              title: '用户列表',
              keepAlive: false
            },
            component: User
          },
          {
            path: 'addUser',
            name: 'addUser',
            meta: {
              index: '2-2',
              title: '新增用户',
              keepAlive: false
            },
            component: AddUser
          },
          {
            path: 'editUser/:id',
            name: 'editUser',
            meta: {
              index: '2-3',
              title: '编辑用户',
              keepAlive: false
            },
            component: EditUser
          }
        ]
      },
      {
        path: 'article',
        name: 'article',
        component: {
          template: `<router-view></router-view>`
        },
        meta: {
          index: '3',
          title: '文章管理',
          keepAlive: false
        },
        redirect: './article/articleList',
        children: [
          {
            path: 'articleList',
            name: 'articleList',
            meta: {
              index: '3-1',
              title: '文章列表',
              keepAlive: false
            },
            component: Article
          },
          {
            path: 'addArticle',
            name: 'addArticle',
            meta: {
              index: '3-2',
              title: '新增文章',
              keepAlive: false
            },
            component: AddArticle
          },
          {
            path: 'editArticle/:id',
            name: 'editArticle',
            meta: {
              index: '3-3',
              title: '编辑文章',
              keepAlive: false
            },
            component: EditArticle
          },
          {
            path: 'categoryList',
            name: 'categoryList',
            meta: {
              index: '3-4',
              title: '分类标签列表',
              keepAlive: false
            },
            component: {
              template: `<div>该功能正在开发中...</div>`
            }
          },
          {
            path: 'addCategory',
            name: 'addCategory',
            meta: {
              index: '3-5',
              title: '添加分类标签',
              keepAlive: false
            },
            component: AddCategory
          },
          {
            path: 'editCategory/:id',
            name: 'editCategory',
            meta: {
              index: '3-6',
              title: '编辑分类标签',
              keepAlive: false
            },
            component: {
              template: `<div>该功能正在开发中...</div>`
            }
          },
          {
            path: 'tagList',
            name: 'tagList',
            meta: {
              index: '3-7',
              title: '标签列表',
              keepAlive: false
            },
            component: Tag
          },
          {
            path: 'addTag',
            name: 'addTag',
            meta: {
              index: '3-8',
              title: '添加标签',
              keepAlive: false
            },
            component: AddTag
          },
          {
            path: 'editTag/:id',
            name: 'editTag',
            meta: {
              index: '3-9',
              title: '编辑标签',
              keepAlive: false
            },
            component: EditTag
          }
        ]
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
            component: Project
          }
        ]
      },
      {
        path: 'system',
        name: 'system',
        component: {
          template: '<router-view></router-view>'
        },
        meta: {
          index: '6',
          title: '系统设置',
          keepAlive: false
        },
        children: [
          {
            path: 'adminAbout',
            name: 'adminAbout',
            meta: {
              index: '6-1',
              title: '关于作者',
              keepAlive: false
            },
            component: About
          },
          {
            path: 'log',
            name: 'log',
            meta: {
              index: '6-2',
              title: '系统日志',
              keepAlive: false
            },
            component: {
              template: `<div>系统日志</div>`
            }
          },
          {
            path: 'dBBack',
            name: 'dBBack',
            meta: {
              index: '6-3',
              title: '数据库备份',
              keepAlive: false
            },
            component: {
              template: `<div>数据库备份</div>`
            }
          },
          {
            path: 'set',
            name: 'set',
            meta: {
              index: '6-4',
              title: '系统设置',
              keepAlive: false
            },
            component: {
              template: `<div>系统设置</div>`
            }
          }
        ]
      },
      {
        path: '*',
        component: {
          template: '<div>未找到当前页面adminDesk</div>'
        },
        meta: {
          title: '后端当前页面不存在',
          keepAlive: false
        }
      }
    ]
  }
]

export default adminDesk
