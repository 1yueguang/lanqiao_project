//注册界面
<template>
  <div class="register">
    <h2>注册账号</h2>
    <el-form
      :model="ruleForm"
      :rules="rules"
      class="demo-ruleForm"
      ref="ruleForm"
      label-width="80px"
    >
      <el-form-item
        label="用户名"
        prop="userUserName"
        style="width:400px;height:50px;margin-top:30px;margin-left:30px;"
      >
        <el-input v-model="ruleForm.userUserName" placeholder="请输入用户名" type="text"></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="userPassword"
        style="width:400px;height:50px;margin-top:30px;margin-left:30px;"
      >
        <el-input v-model="ruleForm.userPassword" placeholder="请输入密码" type="password"></el-input>
      </el-form-item>
      <el-form-item
        label="电话"
        prop="userTelphone"
        style="width:400px;height:50px;margin-top:30px;margin-left:30px;"
      >
        <el-input v-model="ruleForm.userTelphone" placeholder="请输入电话" type="text"></el-input>
      </el-form-item>
      <el-form-item
        label="地址"
        prop="userAddress"
        style="width:400px;height:50px;margin-top:30px;margin-left:30px;"
      >
        <el-input v-model="ruleForm.userAddress" placeholder="请输入地址" type="text"></el-input>
      </el-form-item>
      <el-form-item
        label="商店名称"
        prop="userShopName"
        style="width:400px;height:50px;margin-top:30px;margin-left:30px;"
      >
        <el-input v-model="ruleForm.userShopName" placeholder="请输入商店名称" type="text"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          type="danger"
          round
          @click="submitForm('ruleForm')"
          style="width:320px;height:50px;margin-top:10px;margin-left:20px;"
        >注 册</el-button>
      </el-form-item>
      <el-form-item>
        <p
          @click="$emit('finshRegsiter')"
          style="width:100px;margin-top:-15px;margin-left:300px;font-size:18px;"
        >Go Back!</p>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { types } from "util";
export default {
  name: "register",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        userUserName: "",
        userPassword: "",
        userTelphone: "",
        userAddress: "",
        userShopName: "",
        userComment: "",
        userStatus: 1
      },
      rules: {
        userUserName: [
          { required: true, message: "用户名不能为空", trigger: "change" },
          { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" }
        ],
        userPassword: [
          { required: true, message: "密码不为空", trigger: "change" },
          { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" }
        ],
        userTelphone: [
          { required: true, message: "手机号不为空", trigger: "change" },
          {
            min: 11,
            max: 13,
            message: "长度在 11 到 13 个数字",
            trigger: "blur"
          }
        ],
        userAddress: [
          { required: true, message: "地址不为空", trigger: "change" },
          { min: 3, max: 60, message: "长度在 2 到 30 个字符", trigger: "blur" }
        ],
        userShopName: [
          { required: true, message: "商店名称不为空", trigger: "change" },
          { min: 3, max: 60, message: "长度在 2 到 30 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = this.$qs.stringify(this.ruleForm);
          console.log(JSON.stringify(params));
          this.$axios
            .post("http://www.wxhwg.com:8080/mock/user/add", params)
            .then(response => {
              console.log(JSON.stringify(response));
              let result = response.data;
              var type = result.status == "200" ? "success" : "error";
              this.$message({
                message: result.message,
                type: type
              });
              if (result.status == "200") {
                this.$emit("finshRegsiter");
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
.register {
  width: 500px;
  height: 600px;
  background: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 15px;
}
h2 {
  color: #f56600;
  font-size: 24px;
  text-align: center;
  margin-top: 30px;
}

.register p:hover {
  color: #f56600;
}
</style>