<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <!---图像区域-->
        <img src="../assets/logo.png">
      </div>
      <!---登录表单区域-->
      <el-form ref="loginForm" label-width="0px" class="login_form" :model="loginForm" :rules="loginFormRules">
        <!--userid-->
        <el-form-item prop="userid">
          <el-input prefix-icon="el-icon-search" v-model="loginForm.userid"></el-input>
        </el-form-item>
        <!---password-->
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-search" v-model="loginForm.password"></el-input>
        </el-form-item>
        <!---button erea-->
        <el-form-item class="btns">
          <el-button type="primary" @click="login()">登录</el-button>
          <el-button type="info" @click="resetLoginForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>
<script>
import { setToken } from '@/utils/auth'
export default {
  data () {
    return {
      loginForm: {
        userid: '123',
        password: '123456'
      },
      loginFormRules: {
        // 验证用户名是否合法
        userid: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在3到10字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在5到10字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击重置按钮，重置登录表单
    resetLoginForm () {
      console.log(this)
      this.$refs.loginFormRef.resetFields()
    },
    // 登录验证
    login () {
      this.$refs.loginForm.validate(async val => {
        if (!val) return

        console.log(this.loginForm, 'this.loginform')
        return this.$api.checkLogin({
          userid: this.loginForm.userid,
          password: this.loginForm.password
        }).then(response => {
          if (response.status === 500) {
            return this.$message.error('服务器连接失败')
          } else if (response.data.flag === false) {
            return this.$message.error('用户名或密码错误')
          } else if (response.data.flag === true) {
            sessionStorage.setItem('token', response.data.token)
            this.$message.success('登录成功')
            // console.log(this, this.$route)
            setToken('Token', 'amy')
            return this.$router.push('/index/index')
          }
          //  else {
          //   sessionStorage.setItem('token', response.token)
          //   this.$message.success('登录成功')
          //   // console.log(this, this.$route)
          //   setToken('Token', 'amy')
          //   return this.$router.push('/index/index')
          //   // return this.$message.error('暂时连不上服务器')
          // }

          //   if (response.meta.status !== 200) {
          //     console.log('登录失败')
          //     localStorage.setItem('userid', 'admin1')
          //     return this.$message.error('登录失败')
          //   } else {
          //     console.log('login success')
          //   localStorage.setItem('userid', this.loginForm.userid)
          // return this.$message.success('登录成功')
          // console.log(this, this.$route)
          // return this.$router.push('/index/index')
          //   }
        }, error => {
          console.log('请求失败了', error.data.message)
          return this.$message.error('请求失败了')
        })
      }
        // this.$refs.loginFormRef.validate(async val => {
        //   if (!val) return
        //   const result = await this.$http.post('login', this.loginForm)

        //   console.log(result.data)
        //   if (result.data.meta.status !== 200) {
        //     localStorage.setItem('userid', 'admin1')
        //     return this.$message.error('登录失败')
        //   } else {
        //     localStorage.setItem('userid', this.loginForm.userid)
        //     // return this.$message.success('登录成功')
        //     // console.log(this, this.$route)
        //     return this.$router.replace('/dataMan')// 跳转到主页面
        //   }
        // 1.将登录成功之后的token保存到客户端的sessionStorage中
        // 1.1项目中除了登录之外的其他api接口，必须在登录之后才能访问
        // 1.2 token只应在当前网站打开期间生效，所以将token保存在sessionStorage中
        // 2.通过编程式导航跳转到
        // })
      )
    }
  },
  updated () {
    var lett = this
    document.onkeydown = function (e) {
      var key = window.event.keyCode
      if (key === 13) {
        lett.login()
      }
    }
  }
}
</script>
<style scoped>
  .login_container {
    background-color: #2b4b6b;
    height: 100%;
  }

  .login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #eee;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;

  }

  .avatar_box img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }

  .btns {
    display: flex;
    justify-content: flex-end;
  }

  .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }

</style>
