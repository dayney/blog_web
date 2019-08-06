<template>
  <div class="k-container">
    <section class="k-header">
      <div class="k-header-container">
        <div class="k-logo">LOGO</div>
        <div class="k-menus">
          <ul>
            <li>
              <router-link to="/">首页</router-link>
            </li>
            <li>
              <router-link to="/">文章</router-link>
            </li>
            <li>
              <router-link to="/">关于作者</router-link>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section class="k-banner">
      <p>krui的一个练手项目</p>
    </section>
    <div class="k-main-container">
      <el-row :gutter="10">
        <el-col :span="18">
          <div v-for="(val, ind) in articleList" :key="ind" class="k-article">
            <div class="k-article-header">
              <div class="k-article-title">
                <h3>{{val.title}}</h3>
              </div>
              <div class="k-article-tags">
                <ul>

                  <li>
                    {{val.tags}}
                    <!-- {{getFilterTagList(val.tags)}} -->
                    <!-- {{getFilterTagList(val.tags)}} -->
                    <!-- {{getFilterTagList(val.tags)[0].id}}
                    {{getFilterTagList(val.tags)[0].name}} -->
                    <!-- <span v-for="(val, id) in getFilterTagList(val.tags)" :key="id">{{val.name}}</span> -->
                    <!-- <router-link to="{path: 'tags', query: {id: val.id}}">{{val.name}}</router-link> -->
                  </li>
                </ul>
              </div>
              <div class="k-article-info">{{val.createTime}} {{val.name}} 点赞 {{val.like}} </div>
            </div>
            <div class="k-article-main">
              <div class="k-article-brief" v-html="val.content">
              </div>
              <div class="k-article-more">
                <router-link to="{path: '/article', query: {id: val.id}}">阅读全文</router-link>
              </div>
            </div>
          </div>

          <div class="k-pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="pageNo"
              :page-sizes="pageSizes"
              :page-size="pageSize"
              layout="prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </el-col>
        <el-col :span="6">
          <section class="k-latest-article">
            <div class="k-section-title">
              <h3>
                最新文章
                <span>
                  <a href>更多&gt;&gt;</a>
                </span>
              </h3>
            </div>
            <div class="k-section-list">
              <ul>
                <li v-for="val in latesteArticleTitleList" :key="val.id">
                  <router-link :to="{ path: 'articles', query: { id: val.id }}">{{val.title}}</router-link>
                </li>
              </ul>
            </div>
          </section>
          <section class="k-tags-group">
            <div class="k-section-title">
              <h3>标签</h3>
            </div>
            <div class="k-section-list">
              <router-link v-for="val in tagList" :key="val.id" :to="{ path: 'tag', query: { id: val.id }}" :class="'k-tag' + val.id">{{val.name}}</router-link>
            </div>
          </section>
          <section class="k-features">
            <div class="k-section-title">
              <h3>功能</h3>
            </div>
            <div class="k-section-list">
              <ul>
                <li>
                  <router-link to="/register">注册</router-link>
                </li>
                <li>
                  <router-link to="/login">登陆</router-link>
                </li>
              </ul>
            </div>
          </section>
        </el-col>
      </el-row>
    </div>
    <section class="k-footer">
      <p>dayney.com © 2019 | Powered by Krui | Based on Theme: Nisarg by Falguni Desai.</p>
    </section>
  </div>
</template>

<script>
// import HelloWorld from 'components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    // HelloWorld
  },
  data () {
    return {
      total: 0, // 文章总的记录数
      pageSize: 10, // 每页有多少条
      pageSizes: [10, 20, 50, 100], // 每页有多少条
      pageNo: 1, // 当前页码
      latesteArticleTitleList: [], // 右侧最新10篇文章的title
      tagList: [], // 右侧的标签列表
      articleList: [] // 文章列表
    }
  },
  filters: {
    // formateTags (val) {
    //   console.log('过滤器里面的值val' + val)
    //   console.log(this)

    //   // return this.getFilterTagList(val)
    //   return val
    // },
    formateDate (val) {
      return unescape(val)
    }
  },
  created () {
    this.$store.commit('setRequestNumber', 3)
    this.getLatesteArticleTitle()
    this.getTagList() // 获取标签列表
    this.getArticleList()
  },
  methods: {
    async getLatesteArticleTitle () {
      let self = this
      await this.$api.getLatesteArticleTitle().then(res => {
        let data = res.data
        if (data.status === 'success') {
          self.latesteArticleTitleList = data.data.latesteArticleTitleList
        }
      }).catch((err) => {
        err && console.log(err)
      })
    },
    async getTagList () {
      let self = this
      await this.$api.getTagList().then(res => {
        let data = res.data
        if (data.status === 'success') {
          self.tagList = data.data.tagList
        }
      }).catch((err) => {
        err && console.log(err)
      })
    },
    async getArticleList () {
      let temObj = {
        page: this.pageNo,
        limit: this.pageSize
      }

      let self = this
      await this.$api.getArticleList(temObj).then(res => {
        let data = res.data

        if (data.status === 'success') {
          self.articleList = data.data.articleList

          self.total = data.data.total
        }
      }).catch((err) => {
        err && console.log(err)
      })
    },
    async getFilterTagList (val) {
      let temObj = {
        tags: val
      }
      let data = await this.$api.getTagList(temObj).then((res) => {
        return res.data.data.tagList
      })
      console.log('data ...')
      console.log(data)
      console.log('data ...')
      // return data.data.data.tagList
      return data
      // return new Promise((resolve, reject) => {
      // // let self = this
      //   this.$api.getTagList(temObj).then(res => {
      //     let data = res.data
      //     console.log('getFilterTagList ...')
      //     console.log(data)
      //     console.log('getFilterTagList ...')
      //     if (data.status === 'success') {
      //       // self.articleList = data.data.articleList
      //       // self.total = data.data.total
      //       console.log('data.data.tagList')
      //       console.log(data.data.tagList)
      //       console.log('data.data.tagList')

      //       resolve(data.data.tagList)
      //     }
      //   }).catch((err) => {
      //     err && console.log(err)
      //   })
      // })
    },
    log () {
      console.log('excel log')
    },
    tagAEvent (e) {
      console.log('excel tagAEvent')
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getArticleList()
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pageNo = val
      this.getArticleList()
    }
  }
}
</script>
<style lang="less">
.k-container {
  @width: 1200px;
  @headerHeight: 50px;
  position: relative;
  width: 100%;
  background-color: #eceff1;
  .k-header,
  .k-banner,
  .k-footer {
    width: 100%;
  }
  .k-main-container {
    width: @width;
    margin: 0 auto;
  }

  .k-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    height: @headerHeight;
    background: #fff;
    .k-header-container {
      width: @width;
      margin: 0 auto;
      .k-logo {
        float: left;
        width: @headerHeight;
        height: @headerHeight;
        background-color: #666;
      }
      .k-menus {
        float: right;
        ul {
          list-style: none;
          li {
            float: left;
            display: block;
            height: @headerHeight;
            padding: 0 10px;
            color: #000;
            font-size: 18px;
            line-height: @headerHeight;
          }
        }
      }
    }
  }
  .k-banner {
    height: 300px;
    margin-top: @headerHeight;
    margin-bottom: 20px;
    background-color: #1d2b2d;
    p {
      height: 300px;
      color: #fff;
      font-size: 36px;
      line-height: 300px;
      text-align: center;
    }
  }

  .k-main-container {
    margin-bottom: 15px;
    .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-col {
      border-radius: 4px;

      .k-article,
      section {
        margin-bottom: 10px;
        background-color: #fff;
        border-radius: 4px;
        &:last-child {
          margin-bottom: 0;
        }
      }
      .k-article {
        .common-padding {
          padding: 0 15px;
        }
        .k-article-header {
          margin-bottom: 10px;
          border-bottom: 1px solid #dfdfdf;
          .k-article-title h3 {
            @titleHeight: 40px;
            width: 100%;
            height: @titleHeight;
            color: #000;
            font-size: 16px;
            line-height: @titleHeight;
          }
          .k-article-tags,
          .k-article-info {
            .common-padding;
            box-sizing: border-box;
            width: 100%;
            height: 24px;
          }
          .k-article-tags {
            @tagHeight: 24px;
            ul {
              list-style: none;

              li {
                float: left;
                display: block;
                height: @tagHeight;
                padding: 0 5px;
                color: #333;
                font-size: 12px;
                line-height: @tagHeight;
              }
            }
          }
          .k-article-info {
            text-align: left;
          }
        }
        .k-article-main {
          .common-padding;
          box-sizing: border-box;
          .k-article-brief {
            margin-bottom: 10px;
            text-indent: 2em;
          }
          .k-article-more {
            width: 100%;
            text-align: center;
            a {
              @height: 36px;
              height: @height;
              padding: 0 10px;
              line-height: @height;
              border-bottom: 1px solid #ddd;
            }
          }
        }
      }
      .k-pagination {
        width: 100%;
        background-color: #fff;
      }
      section {
        .k-section-title {
          width: 100%;
          height: 40px;
          line-height: 40px;

          h3 {
            padding: 0 15px;
            color: #000;
            font-size: 16px;
            text-align: left;
            border-bottom: 1px solid #dfdfdf;
            span {
              float: right;
              display: block;
              padding: 0 2px;
              font-size: 12px;
            }
          }
        }
        &.k-latest-article .k-section-list {
          ul {
            list-style: none;
            li {
              @cellHeight: 30px;
              box-sizing: border-box;
              width: 100%;
              height: @cellHeight;
              padding: 0 10px;
              color: #000;
              font-size: 12px;
              line-height: @cellHeight;
              text-align: left;
              border-bottom: 1px dotted #fff;
              &:last-child {
                border-bottom: none;
              }
            }
          }
        }
        &.k-tags-group .k-section-list {
          padding: 10px;
          a {
            display: inline-block;
            padding: 0 4px;
          }
          .k-tag0 {
            color: #000;
            font-size: 14px;
          }
          .k-tag1 {
            color: #615f5f;
            font-size: 16px;
          }
          .k-tag2 {
            color: #727272;
            font-size: 18px;
          }
          .k-tag3 {
            color: #727272;
            font-size: 12px;
          }
          .k-tag4 {
            color: #727272;
            font-size: 14px;
          }
          .k-tag5 {
            color: #727272;
            font-size: 16px;
          }
          .k-tag6 {
            color: #727272;
            font-size: 18px;
          }
          .k-tag7 {
            color: #727272;
            font-size: 14px;
          }
          .k-tag8 {
            color: #78909c;
            font-size: 14px;
          }
          .k-tag9 {
            color: #727272;
            font-size: 18px;
          }
        }
        &.k-features ul {
          padding: 0 15px;
          list-style: none;
          li {
            @height: 30px;
            box-sizing: border-box;
            width: 100%;
            height: @height;
            line-height: @height;
            border-bottom: 1px solid #9ea3ad;
            &:last-child {
              border-bottom: none;
            }
          }
        }
      }
    }
  }
  .k-footer {
    @height: 60px;
    height: @height;
    line-height: @height;
    background-color: #363636;
    p {
      color: #fff;
      text-align: center;
    }
  }
}
</style>
