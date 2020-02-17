<template>
  <div class="k-container">
    <Header></Header>
    <slot></slot>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './header.vue'
import Footer from './footer.vue'

export default {
  name: 'Layout',
  components: {
    Header,
    Footer
  },
  data () {
    return {
      latesteArticleTitleList: [], // 右侧最新10篇文章的title
      tagList: [] // 右侧的标签列表
    }
  },
  filters: {
    formateDate (val) {
      return unescape(val)
    }
  },
  created () {
    // this.$store.commit('initRequestedNumber') // 初始化计数器
    // this.$store.commit('setRequestNumber', 3)
    this.getLatesteArticleTitle()
    this.getTagList() // 获取标签列表
  },
  methods: {
    async getLatesteArticleTitle () {
      // let self = this
      // await this.$api.getLatesteArticleTitle().then(res => {
      //   self.latesteArticleTitleList = res.latesteArticleTitleList
      // }).catch((err) => {
      //   err && console.log(err)
      // })
    },
    async getTagList () {
      // let self = this
      // await this.$api.getTagList().then(res => {
      //   self.tagList = res.tagList
      // }).catch((err) => {
      //   err && console.log(err)
      // })
    }
  }
}
</script>
<style lang="less">
.k-container {
  @width: 1200px;
  position: relative;
  width: 100%;
  background-color: #eceff1;

  .k-banner {
    width: 100%;
  }

  .k-banner {
    @bannerH: 300px;
    height: @bannerH;
    background-color: #1d2b2d;

    .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: @bannerH;
      margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    }

  }
  .k-main-container {
    width: @width;
    margin: 15px auto;
  }
}
</style>
