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
        <el-input v-model="password1" type="password" placeholder="请确认输入密码">
          <template slot="prepend">密码</template>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-button v-on:click="register" style="width:100%" type="primary">登录</el-button>
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
      password: '',
      password1: ''
    }
  },
  created () {
    let self = this
    self.$http.get('api/getUsers')
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
    self.$http.get('/api/user/1')
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })

      // console.log('name::' + self.name)
      // console.log('password::' + self.password)
      // console.log('password1::' + self.password1)
  },
  methods: {
    register () {
      let self = this
      if (self.password !== self.password1) {
        console.log('两次密码不相同')
        return
      }

      let temObj = {
        name: self.name,
        password: self.password
      }

      console.log('接收用户申请的信息')
      console.log(temObj)
      self.$http.post('api/user', temObj)
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
