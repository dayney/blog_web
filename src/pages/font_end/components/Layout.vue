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
}
</style>
