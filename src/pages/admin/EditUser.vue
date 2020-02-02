<template>
  <div class="k-editUser">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号名称" prop="name">
        <el-input v-model="ruleForm.name" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="ruleForm.sex" class="k-radio">
          <el-radio :label="'1'">男</el-radio>
          <el-radio :label="'0'">女</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="年龄" prop="age">
        <el-input v-model="ruleForm.age"></el-input>
      </el-form-item>

      <el-form-item label="手机号" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>

      <el-form-item label="地址" prop="address">
        <el-input v-model="ruleForm.address"></el-input>
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

<script>
export default {
  name: 'EditrUser',
  data () {
    var validatorNumber = (rule, value, callback) => {
      // console.log('validatorNumber arguments')
      // console.log(arguments)
      // console.log('validatorNumber arguments')

      // if (!value) {
      //   return callback(new Error('用户名不能为空'))
      // }
      if (value) {
        if (!(/[0-9]/.test(value))) {
          return callback(new Error('请输入数字'))
        }
      }
      callback()
    }

    var checkAddress = (rule, value, callback) => {
      // if (!value) {
      //   return callback(new Error('地址不能为空'))
      // }
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
        name: '',
        age: '',
        sex: Number,
        phone: '',
        address: '',
        password: '',
        checkPass: ''
      },
      rules: {
        // name: [
        //   {
        //     required: true,
        //     validator: checkName,
        //     trigger: 'blur'
        //   }
        // ],
        age: [
          {
            validator: validatorNumber,
            trigger: 'blur'
          }
        ],
        sex: [
          {
            trigger: 'blur'
          }
        ],
        phone: [
          {
            validator: validatorNumber,
            trigger: 'blur'
          }
        ],
        address: [
          {
            validator: checkAddress,
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
  created () {
    this.initData()
  },
  methods: {
    initData () {
      this.$api.findOneUser({id: this.$route.params.id}).then(data => {
        if (data.status === 'success') {
          this.ruleForm.name = data.data.userInfo.name
          this.ruleForm.phone = data.data.userInfo.phone
          this.ruleForm.age = data.data.userInfo.age
          this.ruleForm.sex = data.data.userInfo.sex ? data.data.userInfo.sex.toString() : ''
          this.ruleForm.address = data.data.userInfo.address
          this.ruleForm.password = data.data.userInfo.password
          this.ruleForm.checkPass = data.data.userInfo.password
          this.ruleForm.address = data.data.userInfo.address
        }
      }).catch(function (error) {
        console.log('查询单个用户信息失败')
        console.log(error)
        console.log('查询单个用户信息失败')
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let temObj = {
            id: this.$route.params.id,
            name: this.ruleForm.name,
            sex: this.ruleForm.sex,
            age: this.ruleForm.age,
            phone: this.ruleForm.phone,
            address: this.ruleForm.address,
            password: this.ruleForm.password
          }

          this.$api.updateUser(temObj)
            .then((result) => {
              if (result.status === 'success') {
                this.$router.push({
                  path: '/admin/user/userList'
                })
              }
            })
            .catch(function (error) {
              console.log('更新用户信息错误')
              console.log(error)
              console.log('更新用户信息错误')
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

<style lang="less">
.k-editUser {
  width: 80vw;
  max-width: 400px;
  height: 60vw;
  max-height: 300px;
  margin: 0 auto;
  .el-form {
    margin-bottom: 10px;
    .k-btn-group .el-form-item__content {
      margin-left: 0!important;
    }
    .k-radio {
      float: left;
      line-height: unset;
    }
  }
}
</style>
