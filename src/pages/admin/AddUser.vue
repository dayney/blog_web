<template>
  <div class="k-user-container">
    添加用户
  </div>
</template>

<script>
export default {
  name: 'AddUser',
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
  .k-operate-group {
    margin-bottom: 10px;
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
}
</style>
