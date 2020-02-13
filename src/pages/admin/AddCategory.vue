<template>
  <div class="k-add-tag-container">
    <el-form
      ref="tagform"
      :model="category"
      label-width="100px"
    >
      <el-form-item label="分类标签名称">
        <el-input
          v-model="category.name"
          placeholder="请输入分类标签名"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="是否激活"
        class="k-fl"
      >
        <el-switch
          v-model="category.status"
          style="width: 40px;"
        ></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add">提交</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mixMethods } from './mixins'

export default {
  name: 'AddCategory',
  data () {
    return {
      category: {
        name: '',
        status: true
      }
    }
  },
  mixins: [ mixMethods ],
  methods: {
    add () {
      // this.$router.push({
      //   path: '/admin/article/tagList'
      // })
      this.$api.addCategory({
        name: this.category.name,
        status: this.category.status ? 1 : 0
      })
        .then((response) => {
          if (response.status === 'success') {
            this.$message({
              type: 'success',
              message: '添加标签成功!'
            })
            this.$router.push({
              path: '/admin/article/categoryList'
            })
          }
        })
        .catch((error) => {
          console.log('捕获的错误')
          console.log(error)
          console.log('捕获的错误')
        })
    },
    reset () {
      this.resetDefaultData()
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
}
</style>
