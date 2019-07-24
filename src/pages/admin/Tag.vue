<template>
  <div class="k-tag-container">
    标签列表
  </div>
</template>

<script>
export default {
  name: 'Tag',
  data () {
    return {

    }
  },
  created () {

  },
  methods: {
  }
}
</script>

<style lang="less">
.k-user-container {
  overflow: hidden;
  width: 100%;
  height: 100%;
  .k-operate-header {
    margin-bottom: 10px;
    .k-button-group {
      padding: 0 15px;
      .el-button {
        float: left;
      }
    }
    .k-search-user {
      float: right;
      .el-form-item {
        margin-bottom: 0;
      }
    }
  }
  .k-table-container {
    overflow-y: auto;
    width: 100%;
    height: 630px;
    min-height: 630px;
    max-height: 800px;
  }
  .k-cell-num .cell {
    text-align: center;
  }
  .k-pagination {
    width: 100%;
    background-color: #fff;
    .el-pagination {
      padding: 5px 0;
    }
  }
}
</style>
