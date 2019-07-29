<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
                <span class="title">用户信息管理</span>
            </div>
      <div class="manage_tip">
        <span class="title"></span>
      </div>
      <el-form
        :model="registerUser"
        :rules="rules"
        class="registerForm"
        ref="registerForm"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="userUserName">
          <el-input v-model="registerUser.userUserName" placeholder="请输入用户名" type="text"></el-input>
        </el-form-item>
         <el-form-item label="密码" prop="userPassword">
          <el-input v-model="registerUser.userPassword" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="userTelphone">
          <el-input v-model="registerUser.userTelphone" placeholder="请输入电话" type="text"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="userAddress">
          <el-input v-model="registerUser.userAddress" placeholder="请输入地址" type="text"></el-input>
        </el-form-item>

        <el-form-item label="商品名称" prop="userShopName">
          <el-input v-model="registerUser.userShopName" placeholder="请输入商品名称" type="text"></el-input>
        </el-form-item>

        <el-form-item label="备注" prop="userComment">
          <el-input v-model="registerUser.userComment" placeholder="请输入备注" type="text"></el-input>
        </el-form-item>
        
        <el-form-item label="状态" prop="userStatus">
          <el-select v-model="registerUser.userStatus" placeholder="状态">
            <el-option label="1" value="有效"></el-option>
            <el-option label="0" value="无效"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="submit_btn" @click="submitForm('registerForm')">添加</el-button>
          <router-link to="Found/"><el-button type="primary" class="submit_btn">取消</el-button></router-link>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      registerUser: {
        userUserName: "",
        userPassword: "",
        userTelphone: "",
        userAddress: "",
        userShopName: "",
        userComment:"",
        userStatus:"",
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
          { min: 11, max: 13, message: "长度在 11 到 13 个数字", trigger: "blur" }
        ],
        userAddress: [
          { required: true, message: "地址不为空", trigger: "change" },
          { min: 3, max: 60, message: "长度在 2 到 30 个字符", trigger: "blur" }
        ],
        userShopName: [
          { required: true, message: "商品名不为空", trigger: "change" },
          { min: 3, max: 60, message: "长度在 2 到 30 个字符", trigger: "blur" }
        ],
        userComment: [
          { required: true, message: "备注不为空", trigger: "change" },
          { min: 3, max: 60, message: "长度在 2 到 30 个字符", trigger: "blur" }
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      var self = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params=this.$qs.stringify({userUserName:self.registerUser.userUserName, userPassword:self.registerUser.userPassword, userTelphone:self.registerUser.userTelphone, userAddress:self.registerUser.userAddress,  userShopName:self.registerUser.userShopName});
          console.log(JSON.stringify(params));
          this.$axios.post("http://www.wxhwg.com:8080/mock/user/add", params).then(res => {
              this.$message({
                message: "添加成功！",
                type: "success"
              });
              let result = res.data;
              this.$router.push("/MainTable");
              console.log(result);
            });
        } else {
          console.log("ERROR");
          return false;
        }
      });
    }
  }
};
</script>


<style scoped>
.register {
  position: relative;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #000;
}
.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 45%;
  margin: 5px;
}

</style>