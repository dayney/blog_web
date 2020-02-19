<template>
  <div class="k-cell-wrap">
    <div class="k-img"><img src="../assets/images/logo.jpg" alt="文章logo" /></div>
    <div class="k-info">
      <div class="k-title"><h3>文章标题</h3></div>
      <div class="k-des">文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述文章简述</div>
      <el-row class="k-footer">
        <el-col :span="14" class="k-category">电视剧</el-col>
        <el-col :span="4" class="k-date">发布于2020-02-18</el-col>
        <el-col :span="2" class="k-view-amount">17个阅读</el-col>
        <el-col :span="2" :offset="1" class="k-details"><router-link to="/">阅读全文...</router-link></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Article'
}
</script>

<style lang="less">
.k-cell-wrap {
  @imgW: 120px;
  @titleH: 30px;
  @footerH: 20px;
  @desH: 20px;
  margin-bottom: 20px;
  width: 100%;
  height: @imgW;
  position: relative;
  box-shadow:0px 4px 12px 0px rgba(0, 0, 0, 0.15);

  .k-img {
    float: left;
    width: @imgW;
    height: @imgW;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .k-info {
    position: absolute;
    left: calc(~"@{imgW} + 10px");
    top: 0;
    right: 0;
    bottom: 0;
    text-align: left;
  }
  .k-title {
    height: @titleH;
    line-height: @titleH;
    width: 100%;
    font-size: 18px;
  }
  .k-des {
    width: 100%;
    line-height: @desH;
    font-size: 12px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
  .k-footer {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: @footerH;
    line-height: @footerH;
    font-size: 12px;
    .k-category {
      position: relative;
      padding-left: 5px;
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 3px;
        height: 13px;
        border-left: 2px solid #0059b2;
      }
    }
  }
}
</style>
