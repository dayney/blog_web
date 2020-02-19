<template>
  <div class="k-footer-wrap clearfix">
    <p>dayney.com © 2019 | Powered by <span @click="goAuthor">Krui</span> .</p>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  created () {
  },
  methods: {
    goAuthor () {
      console.log('去到关于我的页面')
    }
  }

}
</script>

<style lang="less">
@import '../assets/style/index.less';
.k-footer-wrap {
  width: 100%;
  @height: 60px;
  height: @height;
  line-height: @height;
  background-color: #363636;
  p {
    color: #fff;
    text-align: center;
  }
  span:hover {
    cursor: pointer;
  }
}
</style>
