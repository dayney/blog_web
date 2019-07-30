<template>
  <div class="k-add-tag-container">
    <el-form
      ref="tagform"
      :model="tag"
      label-width="100px"
    >
      <el-form-item label="标签名称">
        <el-input
          v-model="tag.name"
          placeholder="请输入标签名"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="是否激活"
        class="k-fl"
      >
        <el-switch
          v-model="tag.status"
          style="width: 40px;"
        ></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AddTag',
  data () {
    return {
      tag: {
        name: '',
        status: true
      }
    }
  },
  methods: {
    add () {
      console.log('add....')
      let temObj = {
        name: this.tag.name,
        status: this.tag.status ? 1 : 0
      }
      console.log('temObj')
      console.log(temObj)
      console.log('temObj')
      let self = this
      console.log('this.$api')
      console.log(this.$api)
      console.log('this.$api')
      this.$api.addTag(temObj)
        .then(function (response) {
          if (response.data.status === 'success') {
            self.$router.push({
              path: '/admin/article/tagList'
            })
          }
        })
        .catch(function (error) {
          console.log('捕获的错误')
          console.log(error)
          console.log('捕获的错误')
        })
    }
  }
}
</script>

<style lang="less">
.k-add-tag-container {
  overflow: hidden;
  width: 300px;
  padding: 10px;
  margin: 10px;
  background-color: #fff;
  .k-fl .el-form-item__content {
    float: left;
    margin-left: 0!important;
  }
  // .k-fl {
  //   float: left;
  //   vertical-align: middle;
  // }
}
</style>
