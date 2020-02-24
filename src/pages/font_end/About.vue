<template>
  <layout>
    <div class="k-about">
      <div class="k-logo">
        <img :src="adminUrl" alt="krui" />
      </div>
      <section class="k-module" v-html="content">
        <!-- <p>作者krui是90后一枚</p>
        <p>活跃在各个技术社区</p>
        <p>常以天狗食月为头像</p>
        <p>专注Web前端</p>
        <p>热爱思考</p>
        <p>热爱开源分享</p>
        <p>爱好读书</p>
        <p>羽毛球</p>
        <p>乒乓球</p>
        <p>当然非常热爱写代码了</p>
        <p><a href="https://github.com/dayney" target="_blank">https://github.com/dayney</a>是我的个人博客</p>
        <p>目前从事Web前端开发工作</p> -->
      </section>

    </div>
  </layout>
</template>

<script>
import { commonLayout } from './utils/mixins.js'

export default {
  name: 'About',
  mixins: [ commonLayout ],
  data () {
    return {
      adminUrl: '',
      content: ''
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      this.$api.getAdminInfo().then(result => {
        console.log('result ....')
        console.log(result)
        if (result.status === 'success') {
          console.log('-----------')
          console.log('-----------')
          console.log('-----------')
          this.adminUrl = result.data.adminUrl
          this.content = result.data.content
        }
        console.log('result ....')
      })
    }
  }
}
</script>

<style lang="less">
@import "./assets/style/index.less";

.k-about {
  .main-container;

  .k-logo {
    @logoW: 98px;
    width: @logoW;
    height: @logoW;
    margin: 0 auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .k-module {
    width: 100%;
    margin-top: 20px;
    text-align: center;
    font-size: 40px;
    p {
      @h: 30px;
      height: @h;
      line-height: @h;
      font-size: 12px;
    }
  }
}
</style>
