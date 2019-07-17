<template>
  <div class="k-layout">
    <el-container>
      <el-aside width="200" class="k-aside-left">
        <el-row>
          <div class="k-logo">LOGO</div>
        </el-row>
        <el-row :span="24">
          <div class="k-menu-container">
            <el-menu default-active="1" class="k-menu-list" @select="handleSelect" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
              <el-menu-item index="1">
                <i class="el-icon-menu"></i>
                <!-- <span slot="title"><router-view to="/admin/home">数据看板</router-view></span> -->
                <!-- <span slot="title">数据看板{{activeIndex}}</span> -->
                <span slot="title"><router-link to="/admin/index" class="is-active">数据看板</router-link></span>
              </el-menu-item>

              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span slot="title">用户数据</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-2-1"><router-link to="/admin/user/list">用户列表</router-link></el-menu-item>
                  <el-menu-item index="1-3-2"><router-link to="/admin/user/add">新增用户</router-link></el-menu-item>
                  <el-menu-item index="1-3-3"><router-link to="/admin/user/edit">编辑用户</router-link></el-menu-item>
                </el-menu-item-group>
              </el-submenu>

              <el-menu-item index="3">
                <i class="el-icon-document"></i>
                <span slot="title"><router-link to="/admin/article">文章管理</router-link></span>
              </el-menu-item>
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
                  <el-menu-item index="1-5-1"><router-link to="/admin/navigation1/1">导航六-1</router-link></el-menu-item>
                  <el-menu-item index="1-5-2"><router-link to="/admin/navigation1/2">导航六-2</router-link></el-menu-item>
                  <el-menu-item index="1-5-3"><router-link to="/admin/navigation1/3">导航六-3</router-link></el-menu-item>
                  <el-menu-item index="1-5-4"><router-link to="/admin/navigation1/4">导航六-4</router-link></el-menu-item>
                  <el-menu-item index="1-5-5"><router-link to="/admin/navigation1/5">导航六-5</router-link></el-menu-item>
                  <el-menu-item index="1-5-6"><router-link to="/admin/navigation1/6">导航六-6</router-link></el-menu-item>
                  <el-menu-item index="1-5-7"><router-link to="/admin/navigation1/7">导航六-7</router-link></el-menu-item>
                  <el-menu-item index="1-5-8"><router-link to="/admin/navigation1/8">导航六-8</router-link></el-menu-item>
                  <el-menu-item index="1-5-9"><router-link to="/admin/navigation1/9">导航六-9</router-link></el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="6">
                <template slot="title">
                  <i class="el-icon-setting"></i>
                  <span slot="title">系统信息</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-6-1"><router-link to="/admin/systemSet">系统设置</router-link></el-menu-item>
                  <el-menu-item index="1-6-2"><router-link to="/admin/systemLog">系统日志</router-link></el-menu-item>
                  <el-menu-item index="1-6-3"><router-link to="/admin/systemDBBack">数据库备份</router-link></el-menu-item>
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
          <div class="k-container">
            <router-view>此处是主要地方</router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

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
      overflow-y: scroll;
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
        background-color: #f0f;

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
      overflow: hidden;
      width: 100%;
      height: calc(100vh - @LogoW);
      padding-top: @LogoW;
      background: #0ff;
    }
  }
}
</style>

<script>
import adminDesk from '@/router/adminDesk.js'

export default {
  name: 'Layout',
  data () {
    return {
      isCollapse: false,
      activeIndex: '1',
      breadcrumb: []
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log('菜单被激活了')
      console.log(key, keyPath)
      let self = this
      self.getBreadcrumbList()
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
      console.log('key::' + key)
      console.log('keyPath::' + keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    getBreadcrumbList () {
      let self = this
      let hopeArr = []

      if (self.$route.matched) {
        self.$route.matched.forEach((val) => {
          hopeArr.push({
            path: val.path,
            name: val.meta.title
          })
        })
      }

      self.breadcrumb = hopeArr
    },
    getMenuList () {
      console.log('>>>>>>>>>>>>>>>>')
      console.log(adminDesk)
      console.log('>>>>>>>>>>>>>>>>')

      // let temMenuList = [
      //   {
      //     name: '首页',
      //     path: '/index',
      //     index: '1'
      //   }
      // ]
    }
  },
  created () {
    let self = this
    self.getMenuList() // 获取菜单列表
    self.getBreadcrumbList() // 获取面包屑导航列表
  }

}
</script>
