<template>
    <div class="login">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">后台管理系统</span>
            </div>
            <el-form :model="loginUser" :rules="rules" ref="loginForm" class="loginForm" label-width="100px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="loginUser.username" placeholder="请输入用户名" type="text"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginUser.password" placeholder="请输入密码" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"  @click="submitForm('loginForm')" class="submit_btn">登录</el-button>
                </el-form-item>
                <div class="tiparea">
                    <p>还没有账号？现在<router-link to='/register'>注册</router-link></p>
                </div>
            </el-form>
        </section>
    </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      loginUser: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 1, max: 30, message: "长度在 1 到 30 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 1, max: 30, message: "长度在 1 到 30 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
          this.$axios.post("http://127.0.0.1:8080/lanqiao_project/admin/login", this.loginUser).then(res => {
        if(res.status = 200){
          console.log("登入成功");
        }else{
          console.log("ERROR")
        } 
        this.$router.push("/MainTable");
        });  
      })
    },
  }
};
</script>

<style scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 20%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family:'微软雅黑';
  font-weight: bold;
  font-size: 26px;
  color: #000000;
}
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}
.submit_btn {
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
</style>



