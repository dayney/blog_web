<template>
  <div>
    <layout>
      <div class="k-article-detail">
        <div class="k-article-title">{{article.title}}</div>
        <div class="k-article-des">{{article.createTime}} {{article.name}} 点赞 {{article.like}}</div>
        <div class="k-article-content" v-html="article.content"></div>
        <div class="k-article-footer">{{article.tags}}</div>
      </div>
    </layout>
  </div>
</template>

<script>
import Layout from './components/Layout.vue'

export default {
  name: 'home',
  components: {
    Layout
  },
  data () {
    return {
      article: {}
    }
  },
  filters: {
    formateDate (val) {
      return unescape(val)
    }
  },
  created () {
    this.initarticle()
  },
  methods: {
    async initarticle () {
      let self = this
      await this.$api
        .getArticleDetail({id: this.$route.params.id})
        .then(res => {
          self.article = res.article
        })
        .catch(err => {
          err && console.log(err)
        })
    }
  }
}
</script>
<style lang="less">
.k-article-detail {
  width: 100%;
  min-height: 100px;
  background-color: #fff;
  border-radius: 4px;
}
</style>
