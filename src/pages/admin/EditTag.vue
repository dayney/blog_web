<template>
  <div class="k-edit-tag-container">
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
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button type="primary" @click="goBack">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'EditTag',
  data () {
    return {
      tag: {
        name: '',
        id: '',
        authorId: '',
        status: ''
      }
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      this.$api.findOneTag({
        id: this.$route.params.id
      })
        .then((response) => {
          if (response.status === 'success') {
            this.tag.name = response.data.tagInfo.name
            this.tag.id = response.data.tagInfo.id
            this.tag.authorId = response.data.tagInfo.authorId
            this.tag.status = Boolean(response.data.tagInfo.status)
          }
        })
        .catch((error) => {
          console.log('捕获的错误')
          console.log(error)
          console.log('捕获的错误')
        })
    },
    submitForm () {
      if (this.tag) {
        this.$api.updateTag({tag: this.tag})
          .then((response) => {
            if (response.status === 'success') {
              this.$message({
                type: 'success',
                message: '提交标签成功!'
              })
              this.$router.push({
                path: '/admin/article/tagList'
              })
            }
          })
          .catch((error) => {
            console.log('捕获的错误')
            console.log(error)
            console.log('捕获的错误')
          })
      }
    },
    goBack () {
      this.$router.push({
        path: '/admin/article/tagList'
      })
    }
  }
}
</script>

<style lang="less">
.k-add-edit-container {
  overflow: hidden;
  width: 300px;
  padding: 10px;
  margin: 10px;
  background-color: #fff;

  .k-fl .el-form-item__content {
    float: left;
    margin-left: 0!important;
  }
}
</style>
