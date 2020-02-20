<template>
  <layout>
    <div class="k-study clearfix">
      <el-row :gutter="20">
        <el-col :span="6" v-for="i in 8" :key="i">
          <div class="k-cell">
            <div class="k-cell-img">
              <div class="k-img">VUE</div>
            </div>
            <div class="k-cell-title"><h3>Vue学习记录</h3></div>
            <div class="k-cell-list">
              <ul>
                <li v-for="i in 5" :key="i" @click="goArticles(i)">
                    生活的苦难
                  </li>
              </ul>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </layout>
</template>

<script>
import { commonLayout } from './utils/mixins.js'

export default {
  name: 'Study',
  mixins: [ commonLayout ],
  methods: {
    goArticles (id) {
      // console.log('----------')
      // console.log(id)
      // console.log('----------')
      this.$router.push({
        path: 'article',
        query: {
          id
        }
      })
    }
  }
}
</script>

<style lang="less">
@import "./assets/style/index.less";

.k-study {
  padding-top: 20px;
  .main-container;

  .k-cell {
    height: 350px;
    margin-bottom: 20px;
    box-shadow: 0 1px 5px 0 rgba(0,0,0,0.15);
  }

  .k-cell-img {
    width: 100%;
    height: 150px;
    padding: 5px;
    box-sizing: border-box;
    background-color: #F5F5F5;
    .k-img {
      width: 100%;
      height: 100%;
      background-color: #fff;
    }
  }
  .k-cell-title {
    @h: 40px;
    width: 100%;
    height: @h;
    line-height: @h;
    text-align: left;
    padding: 0 10px;
    font-size: 16px;
    background-color: #EBEBEB;
    box-sizing: border-box;
  }
  .k-cell-list {
    padding: 10px 5px;
    li {
      height: 20px;
      line-height: 20px;
      list-style: decimal;
      list-style-position: inside;
      text-align: left;
    }
  }
}
</style>
