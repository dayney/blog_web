<template>
  <div class="login-box">
    <el-row>
      <el-col :span="8">
        <el-input v-model="name" placeholder="请输入您的姓名">
          <template slot="prepend">帐号</template>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-input v-model="password" type="password" placeholder="请输入密码">
          <template slot="prepend">密码</template>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-button v-on:click="login" style="width:100%" type="primary">登录</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="less">
</style>

<script>
export default {
  name: 'Login',
  data () {
    return {
      name: '',
      password: ''
    }
  },
  methods: {
    login () {
      let temObj = {
        name: this.name,
        password: this.password
      }

      this.$http.post('api/verifyAccount', temObj)
        .then(function (response) {
          console.log(response)
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
