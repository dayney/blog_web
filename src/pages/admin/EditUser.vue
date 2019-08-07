<template>
  <div class="k-user-container">
    编辑用户{{ $route.params.id }}
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
    let axios = this.$http
    // this.$http
    //   .get('/api/getUserList', {
    //     params: {
    //       page: 1,
    //       limit: 10
    //     }
    //   })
    //   .then(function (response) {
    //     let data = response.data
    //     if (data.status === 'success') {
    //       console.log('return result')
    //       console.log(data.data)
    //       console.log('return result')
    //       return data.data
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log('捕获的错误')
    //     console.log(error)
    //     console.log('捕获的错误')
    //   })
    var instance = axios.create({})
    instance.get('/api/getUserList', {
      params: {
        page: 1,
        limit: 10
      }
    }).then(function (response) {
      let data = response.data
      if (data.status === 'success') {
        console.log('return result')
        console.log(data.data)
        console.log('return result')
        return data.data
      }
    })
      .catch(function (error) {
        console.log('捕获的错误')
        console.log(error)
        console.log('捕获的错误')
      })
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
