<template>
  <div class="k-layout">
    <el-container>
      <el-aside width="200" class="k-aside-left">
        <el-row>
          <div class="k-logo">LOGO</div>
        </el-row>
        <el-row :span="24">
          <div class="k-menu-container">
            <el-menu :default-active="activeIndex" class="k-menu-list" @select="handleSelect" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
              <el-menu-item index="1">
                <i class="el-icon-menu"></i>
                <!-- <span slot="title"><router-view to="/admin/home">数据看板</router-view></span> -->
                <!-- <span slot="title">数据看板{{activeIndex}}</span> -->
                <span slot="title"><router-link to="/admin/index" class="is-active">数据看板</router-link></span>
              </el-menu-item>

              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-user"></i>
                  <span slot="title">用户数据</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="2-1"><router-link to="/admin/user/userList">用户列表</router-link></el-menu-item>
                  <el-menu-item index="2-2"><router-link to="/admin/user/addUser">新增用户</router-link></el-menu-item>
                </el-menu-item-group>
              </el-submenu>

              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-document"></i>
                  <span slot="title">文章管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="3-1"><router-link to="/admin/article/articleList">文章列表</router-link></el-menu-item>
                  <el-menu-item index="3-2"><router-link to="/admin/article/addArticle">新增文章</router-link></el-menu-item>
                  <el-menu-item index="3-3"><router-link to="/admin/article/editArticle">编辑文章</router-link></el-menu-item>
                  <el-menu-item index="3-4"><router-link to="/admin/article/categoryList">分类标签列表</router-link></el-menu-item>
                  <el-menu-item index="3-5"><router-link to="/admin/article/addCategory">新增分类标签</router-link></el-menu-item>
                  <el-menu-item index="3-6"><router-link to="/admin/article/tagList">标签列表</router-link></el-menu-item>
                  <el-menu-item index="3-7"><router-link to="/admin/article/addTag">新增标签</router-link></el-menu-item>
                </el-menu-item-group>
              </el-submenu>

              <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title"><router-link to="/admin/navigation">导航四</router-link></span>
              </el-menu-item>

              <el-submenu index="5">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span slot="title">导航六</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="5-1"><router-link to="/admin/navigation1/1">导航六-1</router-link></el-menu-item>
                  <el-menu-item index="5-2"><router-link to="/admin/navigation1/2">导航六-2</router-link></el-menu-item>
                  <el-menu-item index="5-3"><router-link to="/admin/navigation1/3">导航六-3</router-link></el-menu-item>
                  <el-menu-item index="5-4"><router-link to="/admin/navigation1/4">导航六-4</router-link></el-menu-item>
                  <el-menu-item index="5-5"><router-link to="/admin/navigation1/5">导航六-5</router-link></el-menu-item>
                  <el-menu-item index="5-6"><router-link to="/admin/navigation1/6">导航六-6</router-link></el-menu-item>
                  <el-menu-item index="5-7"><router-link to="/admin/navigation1/7">导航六-7</router-link></el-menu-item>
                  <el-menu-item index="5-8"><router-link to="/admin/navigation1/8">导航六-8</router-link></el-menu-item>
                  <el-menu-item index="5-9"><router-link to="/admin/navigation1/9">导航六-9</router-link></el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="6">
                <template slot="title">
                  <i class="el-icon-setting"></i>
                  <span slot="title">系统信息</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="6-1"><router-link to="/admin/system/adminAbout">关于作者</router-link></el-menu-item>
                  <el-menu-item index="6-2"><router-link to="/admin/system/log">系统日志</router-link></el-menu-item>
                  <el-menu-item index="6-3"><router-link to="/admin/system/dBBack">数据库备份</router-link></el-menu-item>
                  <el-menu-item index="6-4"><router-link to="/admin/system/set">系统设置</router-link></el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </div>
        </el-row>
      </el-aside>
      <el-container class="k-aside-right">
        <el-header class="k-header">
          <el-row>
            <div class="k-top">
              <div class="k-system-info">
                <div class="k-system-des">这里是系统名称 v0.0.1</div>
                <div class="k-system-log">
                  <router-link to="/admin/systemLog">系统日志</router-link>
                </div>
              </div>
              <div class="k-userInfo">
                <el-dropdown>
                  <div class="el-dropdown-link">
                    <div class="k-user-name">用户姓名</div>
                    <div class="k-user-photo">
                      <img src="../../common/assets/images/logo.png" alt="用户头像" />
                    </div>
                  </div>
                  <el-dropdown-menu slot="dropdown" style="width: 140px">
                    <el-dropdown-item>修改个人信息</el-dropdown-item>
                    <el-dropdown-item>修改登录密码</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
          </el-row>
          <el-row>
            <div class="k-breadcrumb">
              <el-breadcrumb separator="/" >
                <el-breadcrumb-item v-for="item in breadcrumb" :key="item.name" :to="{ path: item.path }">{{ item.name }}</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
          </el-row>
        </el-header>
        <el-main class="k-main">
          <router-view>此处是主要地方</router-view>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
let vm = ''
export default {
  name: 'Layout',
  data () {
    return {
      isCollapse: false,
      activeIndex: '1',
      breadcrumb: []
    }
  },
  watch: {
    '$route.path': (newVal, oldVal) => {
      vm.handleSelect()
    }
  },
  created () {
    vm = this
    this.getMenuList() // 获取菜单列表
    this.handleSelect()
    this.getBreadcrumbList() // 获取面包屑导航列表
  },
  mounted () {
    // this.activeIndex = '5-2'
  },
  methods: {
    handleSelect (key, keyPath) {
      this.activeIndex = this.$store.state.system.activeIndex
      this.getBreadcrumbList()
    },
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
      // console.log('key::' + key)
      // console.log('keyPath::' + keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    },
    getBreadcrumbList () {
      let hopeArr = []
      // console.log('>>>>>>>>>>>>>>>>>>>')
      // console.log(this.$route.matched)
      // console.log('>>>>>>>>>>>>>>>>>>>')
      if (this.$route.matched) {
        this.$route.matched.forEach((val) => {
          hopeArr.push({
            path: val.path,
            name: val.meta.title
          })
        })
      }
      this.breadcrumb = hopeArr
    },
    getMenuList () {
    }
  }
}
</script>

<style lang="less">
.k-layout {
  @LogoW: 105px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;

  .k-aside-left {
    position: relative;
    width: 200px;
    height: 100vh;

    .k-logo {
      display: block;
      width: 100%;
      height: @LogoW;
      line-height: @LogoW;
      text-align: center;
      background: #03a9f4;
      cursor: pointer;
    }

    .k-menu-container {
      overflow-y: auto;
      width: 100%;
      height: calc( 100vh - @LogoW);

      .k-menu-list {
        .el-menu-item {
          a {
            color: inherit;
            text-decoration: none;
          }
        }
        .el-submenu__icon-arrow {
          margin-top: -5px;
        }
      }
    }
  }

  .k-aside-right {
    position: relative;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    width: calc(100vw - 200px);  // 外面的  height: 100vh;
    padding: 0;
    background-color: #dfdfdf;
    .k-header {
      position: absolute;
      width: inherit;
      height: @LogoW!important;
      // background: #a4cad9;
      padding-right: 0;
      padding-left: 0;
      .k-top {
        width: 100%;
        height: 60px;
        background-color: #03a9f4;

        .k-system-info {
          float: left;
          width: calc(100% - 160px);
          height: 60px;
          margin-left: 20px;
          line-height: 60px;

          .k-system-des,
          .k-system-log {
            float: left;
            padding-right: 10px;
            text-align: left;
          }
        }
        .k-userInfo {
          float: right;
          display: block;
          width: 140px;
          height: inherit;
          cursor: pointer;

          .k-user-name {
            float: left;
            width: 80px;
            height: 60px;
            line-height: 60px;
            text-align: center;
          }
          .k-user-photo {
            display: inline-block;
            overflow: hidden;
            width: 60px;
            height: 60px;
            border-radius: 100%;

            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }

      .k-breadcrumb {
        width: 100%;
        height: 45px;
        padding-right: 20px;
        padding-left: 20px;
        line-height: 45px;
        .el-breadcrumb {
          line-height: inherit;
        }
      }
    }

    .k-main {
      position: absolute;
      top: @LogoW;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: #efefef;
      // overflow: hidden;
      overflow: auto;
      // width: 100%;
      // height: calc(100vh - @LogoW);
      // margin-top: @LogoW;
      // background: #efefef;
    }
  }
}
</style>
