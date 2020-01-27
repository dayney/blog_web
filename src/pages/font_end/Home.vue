<template>
  <layout>
    <div class="k-home-container">
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
                {{getFilterTagList(val.tags)[0].name}}-->
                <!-- <span v-for="(val, id) in getFilterTagList(val.tags)" :key="id">{{val.name}}</span> -->
                <!-- <router-link to="{path: 'tags', query: {id: val.id}}">{{val.name}}</router-link> -->
              </li>
            </ul>
          </div>
          <div class="k-article-info">{{val.createTime}} {{val.name}} 点赞 {{val.like}}</div>
        </div>
        <div class="k-article-main">
          <div class="k-article-brief" v-html="val.content"></div>
          <div class="k-article-more">
            <router-link :to="{path: `/article/${val.id}`}">阅读全文</router-link>
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
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </layout>
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
      total: 0, // 文章总的记录数
      pageSize: 10, // 每页有多少条
      pageSizes: [10, 20, 50, 100], // 每页有多少条
      pageNo: 1, // 当前页码
      articleList: [] // 文章列表
    }
  },
  filters: {
    formateDate (val) {
      return unescape(val)
    }
  },
  created () {
    // this.$store.commit('setRequestNumber', 3)
    this.getArticleList()
  },
  methods: {
    async getArticleList () {
      let temObj = {
        page: this.pageNo,
        limit: this.pageSize
      }

      let self = this
      await this.$api
        .getArticleList(temObj)
        .then(res => {
          self.articleList = res.articleList
          self.total = res.total
        })
        .catch(err => {
          err && console.log(err)
        })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.$store.commit('initRequestedNumber') // 初始化计数器
      this.getArticleList()
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pageNo = val
      this.$store.commit('initRequestedNumber') // 初始化计数器
      this.getArticleList()
    }
  }
}
</script>
<style lang="less">
.k-home-container {
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
</style>
