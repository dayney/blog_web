<template>
  <div class="k-user-container">
    编辑用户
  </div>
</template>

<script>
export default {
  name: 'EditUser',
  data () {
    return {

    }
  },
  created () {
    console.log('进入编辑功能')
    console.log(this.$route)
    console.log(this.$route.params)
    console.log(this.$route.params.id)
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
