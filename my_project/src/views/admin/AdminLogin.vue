<template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">登录</span>
      </div>
      <el-form
        :model="loginUser"
        :rules="rules"
        ref="loginForm"
        class="loginForm"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginUser.username" placeholder="请输入用户名" type="text"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginUser.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input v-model="inputInfo" placeholder="请输入验证码" type="text"></el-input>
        </el-form-item>
        <el-form-item>
          <a id="code" @click="createCode">{{this.verificationCode}}</a>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登录</el-button>
        </el-form-item>

        <div class="tiparea">
          <p>
            <router-link to="/serve">去往后台登录</router-link>
          </p>
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
      inputInfo: "", //用户输入信息
      verificationCode: "", //生成的验证码
      loginUser: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          {
            min: 4,
            max: 20,
            message: "账号长度4-20，可包括数字、字母、下划线",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "密码长度为6-20位，可以为数字、字母",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    createCode() {
      var self = this;
      self.verificationCode = "";
      var code = "";
      var codeLength = 4;
      var random = [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ];
      for (var i = 0; i < codeLength; i++) {
        var index = Math.floor(Math.random() * 36);
        code += random[index];
      }
      this.verificationCode = code;
    },

    submitForm(formName) {
      let self = this;
      this.$refs[formName].validate(valid => {
        var customerCode = this.inputInfo.toUpperCase();
        if (customerCode == 0) {
          this.createCode();
          this.inputInfo = "";
          this.$alert("请输入验证码");
        } else if (customerCode != this.verificationCode) {
          this.createCode();
          this.inputInfo = "";
          this.$alert("验证码不正确，请重新输入");
        } else if (valid & (customerCode == this.verificationCode)) {
          let params = this.$qs.stringify({
            username: self.loginUser.username,
            password: self.loginUser.password
          });
          console.log(params);
          this.$axios
            .post("http://127.0.0.1:8080/lanqiao_project/api/login", params)
            .then(res => {
              window.sessionStorage.setItem('userId',res.data.data.userId);
              console.log(res.data.data.userId);
              this.$router.push("/home");
            });
        }
      });
    }
  },
  mounted() {
    this.createCode();
  }
};
</script>

<style scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #409eff;
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
  font-family: "微软雅黑";
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
#code {
  display: inline-block;
  width: 100px;
  height: 30px;
  background: #aaa;
  text-align: center;
  line-height: 30px;
  color: #fff;
  text-decoration: none;
  letter-spacing: 7px;
  padding-left: 7px;
  vertical-align: middle;
  font-weight: bold;
}
</style>


