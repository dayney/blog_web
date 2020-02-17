<template>
  <div class="k-header-wrap">
    <div class="k-logo" @click="goHome"></div>
    <div class="k-menu-wrap">
      <ul>
        <li v-for="(item, index) in menu" :key="index" @click="goCategory(item.alias)" :class="{'k-actived': item.isSelected}">{{item.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      menu: [
        {
          alias: 'home',
          name: '首页'
        },
        {
          alias: 'life',
          name: '生活感悟'
        },
        {
          alias: 'study',
          name: '学习记录'
        },
        {
          alias: 'about',
          name: '关于作者'
        }
      ]
    }
  },
  created () {
    this.doMenu()
  },
  methods: {
    doMenu () {
      let currentModule = this.$store.state.fontEnd.currentModule
      this.menu.forEach((value, index) => {
        if (value.alias === currentModule) {
          this.$set(value, 'isSelected', true)
        } else {
          this.$set(value, 'isSelected', false)
        }
      })
    },
    goHome () {
      this.$router.push({
        path: 'home'
      })
    },
    goCategory (params) {
      this.menu.forEach((value) => {
        if (value.alias === params) {
          value.isSelected = true
        } else {
          value.isSelected = false
        }
      })
      // this.$store.commit("setWillAddCourse",[])
      this.$store.commit('fontEnd/setCurrentModule', params) // this是Vue实例

      this.$router.push({
        path: params
      })
    }
  }

}
</script>

<style lang="less">
@import '../assets/style/index.less';
.k-header-wrap {
  @headerH: 120px;
  @logoSize: 100px;
  @menuW: @totalW - @logoSize;
  @menuH: 40px;
  width: @totalW;
  height: @headerH;
  margin: 0 auto;
  padding-top: 20px;
  box-sizing: border-box;

  .k-logo:hover, li:hover {
    cursor: pointer;
  }

  .k-logo {
    float: left;
    display: block;
    width: @logoSize;
    height: @logoSize;
    background-color: #666;
  }

  .k-menu-wrap {
    width: @menuW;
    margin-top: @logoSize - @menuH;
    float: left;
    box-sizing: border-box;
    ul {
      position: absolute;
      list-style: none;
      li {
        float: left;
        display: block;
        height: @menuH;
        padding: 0 10px;
        color: #666;
        font-size: @title-1;
        line-height: @menuH;
        &.k-actived {
          color: #000;
        }
      }
    }
  }
}
</style>
