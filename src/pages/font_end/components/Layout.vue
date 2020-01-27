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

          <slot></slot>
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
                  <router-link :to="{ path: `/article/${val.id}` }">{{val.title}}</router-link>
                </li>
              </ul>
            </div>
          </section>
          <section class="k-tags-group">
            <div class="k-section-title">
              <h3>标签</h3>
            </div>
            <div class="k-section-list">
              <router-link v-for="val in tagList" :key="val.id" :to="{ path: `/tag/${val.id}`}" :class="'k-tag' + val.id">{{val.name}}</router-link>
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
  name: 'Layout',
  components: {
    // HelloWorld
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
      let self = this
      await this.$api.getLatesteArticleTitle().then(res => {
        self.latesteArticleTitleList = res.latesteArticleTitleList
      }).catch((err) => {
        err && console.log(err)
      })
    },
    async getTagList () {
      let self = this
      await this.$api.getTagList().then(res => {
        self.tagList = res.tagList
      }).catch((err) => {
        err && console.log(err)
      })
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
