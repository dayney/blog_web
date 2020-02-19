<template>
  <layout>
    <div class="k-life">
      <div class="k-banner">
        <el-carousel :interval="4000" type="card" height="260px">
          <el-carousel-item v-for="item in bannerList" :key="item">
            <img :src="item" class="k-banenr-img"/>
          </el-carousel-item>
        </el-carousel>
      </div>

      <el-row class="k-main">
        <el-col :span="18">
          <Article v-for="item in 6" :key="item"></Article>
        </el-col>
        <el-col :span="6" class="k-side">
          更多功能待开发中
        </el-col>
      </el-row>
    </div>
  </layout>
</template>

<script>
import { commonLayout } from './utils/mixins.js'
import Article from './components/article.vue'

export default {
  name: 'Life',
  mixins: [ commonLayout ],
  components: { Article },
  data () {
    return {
      bannerList: [
        require('./assets/images/life-1.jpeg'),
        require('./assets/images/life-2.jpeg'),
        require('./assets/images/life-3.jpeg')
      ]
    }
  }
}
</script>

<style lang="less">
@import "./assets/style/index.less";

.k-life {
  .main-container;
  .k-banner {
    margin-top: 20px;
    .k-banenr-img {
      width: 100%;
      height: 260px;
    }
    .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 200px;
      margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    }

  }
  .k-main {
    margin: 20px 0;
  }
  .k-side {
    padding-left: 10px;
  }

}
</style>
