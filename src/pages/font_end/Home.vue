<template>
  <layout>
    <div class="k-container">
      <section class="k-banner">
        <div class="block">
          <el-carousel trigger="click" height="300px">
            <el-carousel-item v-for="item in 4" :key="item">
              <h3 class="small">{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </div>
      </section>

      <div class="k-home-container">
        <section class="k-cell">
          <el-row class="k-module-title">人生感想</el-row>
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="k-cell-article">
              <div class="k-module-img">电视观后感</div>
              <div class="k-module-articles">
                <ol>
                  <li v-for="i in 5" :key="i">
                    <router-link to="/">生活的苦难</router-link>
                  </li>
                  <li class="k-more">
                    <span @click="goMore">查看更多</span>
                  </li>
                </ol>
              </div>
            </el-col>

            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="k-cell-article">
              <div class="k-module-img">读书读后感</div>
              <div class="k-module-articles">
                <ol>
                  <li v-for="i in 5" :key="i">
                    <router-link to="/">生活的苦难</router-link>
                  </li>
                  <li class="k-more">
                    <span @click="goMore">查看更多</span>
                  </li>
                </ol>
              </div>
            </el-col>
          </el-row>

          <el-row class="k-module-title">学习记录</el-row>
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="k-cell-article">
              <div class="k-module-img">Javascript</div>
              <div class="k-module-articles">
                <ol>
                  <li v-for="i in 5" :key="i">
                    <router-link to="/">生活的苦难</router-link>
                  </li>
                  <li class="k-more">
                    <span @click="goMore">查看更多</span>
                  </li>
                </ol>
              </div>
            </el-col>

            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="k-cell-article">
              <div class="k-module-img">CSS3</div>
              <div class="k-module-articles">
                <ol>
                  <li v-for="i in 5" :key="i">
                    <router-link to="/">生活的苦难</router-link>
                  </li>
                  <li class="k-more">
                    <span @click="goMore">查看更多</span>
                  </li>
                </ol>
              </div>
            </el-col>

            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="k-cell-article">
              <div class="k-module-img">Node</div>
              <div class="k-module-articles">
                <ol>
                  <li v-for="i in 5" :key="i">
                    <router-link to="/">生活的苦难</router-link>
                  </li>
                  <li class="k-more">
                    <span @click="goMore">查看更多</span>
                  </li>
                </ol>
              </div>
            </el-col>

            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="k-cell-article">
              <div class="k-module-img">Vue</div>
              <div class="k-module-articles">
                <ol>
                  <li v-for="i in 5" :key="i">
                    <router-link to="/">生活的苦难</router-link>
                  </li>
                  <li class="k-more">
                    <span @click="goMore">查看更多</span>
                  </li>
                </ol>
              </div>
            </el-col>
          </el-row>
        </section>
      </div>
    </div>
  </layout>
</template>

<script>
import { commonLayout } from './utils/mixins.js'

export default {
  name: 'home',
  mixins: [commonLayout],
  data () {
    return {}
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
      // let temObj = {
      //   page: this.pageNo,
      //   limit: this.pageSize
      // }
      // let self = this
      // await this.$api
      //   .getArticleList(temObj)
      //   .then(res => {
      //     self.articleList = res.articleList
      //     self.total = res.total
      //   })
      //   .catch(err => {
      //     err && console.log(err)
      //   })
    },
    handleSizeChange (val) {
      // this.pageSize = val
      // this.$store.commit('initRequestedNumber') // 初始化计数器
      // this.getArticleList()
      // console.log(`每页 ${val} 条`)
    },
    goMore () {
      console.log('go more ....')
    }
  }
}
</script>
<style lang="less">
@import "./assets/style/index.less";
.k-home-container {
  .main-container;
  .k-module-title {
    width: 100%;
    height: 60px;
    line-height: 60px;
    font-size: 24px;
  }
  .k-cell-article {
    position: relative;
    margin-bottom: 20px;
    @leftW: 120px;

    .k-module-img {
      width: @leftW;
      height: @leftW;
      line-height: @leftW;
      background-color: #ccc;
      text-align: center;
      font-size: 16px;
    }

    .k-module-articles {
      position: absolute;
      left: calc(~"@{leftW} + 10px");
      top: 0;
      right: 0;
      bottom: 0;

      ol {
        list-style: decimal !important;

        li {
          @liH: 20px;
          height: @liH;
          line-height: @liH;
          list-style: decimal !important;
          list-style-position: inside !important;
          text-align: left;
          a {
            text-align: left;
          }
        }
        .k-more {
          text-align: right;
          color: #ccc;
          padding-right: 20px;
          list-style: none !important;
          list-style-position: none !important;
          span:hover {
            color: #000;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
