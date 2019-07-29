//登录界面
<template>
  <div id="loginView">
    <regsiter-content @finshRegsiter="login=true" v-if="login === false"></regsiter-content>
    <div v-if="login" class="user-login">
      <h2>账号登录</h2>
      <div class="table">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="用户名"
            prop="username"
            style="width: 400px;height: 50px;margin-top: 30px;margin-left:-20px;"
          >
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
            style="width: 400px;height: 50px;margin-top: 30px;margin-left:-20px;"
          >
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              id="login"
              type="warning"
              round
              v-on:click="submitForm('ruleForm')"
              style="width: 300px;height: 50px;background-color: #f56700; margin-left:-50px;"
            >登录</el-button>
            <el-button
              id="goregister"
              type="danger"
              round
              v-on:click="login = false"
              style="width: 300px;height: 50px; margin-left:-50px;margin-top:30px;"
            >立即注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Register from "@/views/adminproduct/Register.vue";
export default {
  data() {
    var checkName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      login: true,
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ validator: checkName, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  components: {
    "regsiter-content": Register
  },
  methods: {
    submitForm(formName) {
      console.log(111);
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = this.$qs.stringify(this.ruleForm);
          this.$axios
            .post("http://127.0.0.1:8080/lanqiao_project/admin/login", params)
            .then(response => {
              
              let result = response.data;
              var type = result.status === "200" ? "success" : "error";
              this.$message({
                message: result.message,
                type: type
              });
              if (result.status === "200") {
                window.sessionStorage.setItem(
                  "serve_login",
                  result.data.userId
                );
                this.$emit("login", true);
              }
            })
            .catch(error => {});
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
}

h2 {
  color: #f56600;
  font-size: 24px;
  text-align: center;
  margin-top: 30px;
}
.user-login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 410px;
  height: 450px;
  background-color: white;
  border-radius: 10px;
}
</style>

