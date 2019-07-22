<template>
  <div class="login-box">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item class="k-btn-group">
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less">
.login-box {
  width: 80vw;
  max-width: 400px;
  height: 60vw;
  max-height: 300px;
  margin: 0 auto;
  margin-top: 20vh;
  .el-form {
    margin-bottom: 10px;
    .k-btn-group .el-form-item__content {
      margin-left: 0!important;
    }
  }
}
</style>

<script>
export default {
  name: 'Register',
  data () {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      }

      callback()
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        password: '',
        checkPass: '',
        name: ''
      },
      rules: {
        name: [
          {
            required: true,
            validator: checkName,
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            validator: validatePass,
            trigger: 'blur'
          }
        ],
        checkPass: [
          {
            required: true,
            validator: validatePass2,
            trigger: 'blur'
          }
        ]

      }
    }
  },
  methods: {
    submitForm (formName) {
      console.log('submitForm')
      // let self = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          let temObj = {
            name: this.ruleForm.name,
            password: this.ruleForm.password
          }

          let self = this
          this.$http.post('/api/user', temObj)
            .then(function (response) {
              if (response.data.status === 'success') {
                console.log('token::' + response.data.data.token)

                self.$store.commit('setToken', response.data.data.token)

                self.$router.push({
                  path: '/'
                })
              }
            })
            .catch(function (error) {
              console.log('捕获的错误')
              console.log(error)
              console.log('捕获的错误')
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
