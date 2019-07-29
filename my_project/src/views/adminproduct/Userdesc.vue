//用户详情界面
<template>
  <div class="userdesc">
    <div class="title">
      <h3>商城账号</h3>
      <h5 @click="exit()">退出</h5>
    </div>
    <div class="container">
      <div class="upimage">
        <div class="imageArea">
        <el-upload
          class="upload-demo"
          drag
          action="http://www.wxhwg.com:8080/mock/common/upload"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或<em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        </div>
      </div>
      <div class="user">
        <div class="message">
          <h3>基础资料</h3>
        </div>
        <div class="id">
          <p>Id：</p>
          <div class="text">
            <p>{{this.$store.state.loginUserId}}</p>
          </div>
        </div>
        <div class="username">
          <p>姓名：</p>
          <div class="text">
            <p>{{this.userUserName}}</p>
          </div>
        </div>
        <div class="password">
          <p>密码：</p>
          <div class="text">
            <p>{{this.userPassword}}</p>
          </div>
        </div>
        <div class="tel">
          <p>电话：</p>
          <div class="text">
            <p>{{this.userTelphone}}</p>
          </div>
        </div>
        <div class="address">
          <p>地址：</p>
          <div class="text">
            <p>{{this.userAddress}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userUserName: "",
      userPassword: "",
      userTelphone: "",
      userAddress: "",
      userShopName: ""
    };
  },
  created() {
    this.select();
  },
  methods: {
    select() {
      this.$axios
        .get("http://www.wxhwg.com:8080/mock/api/user/findById", {
          params: {
            userId: this.$store.state.loginUserId
          }
        })
        .then(response => {
          let result = response.data;
          if (result.status == 200) {
            this.userUserName = result.data.userUserName;
            this.userPassword = result.data.userPassword;
            this.userTelphone = result.data.userTelphone;
            this.userAddress = result.data.userAddress;
            this.userShopName = result.data.userShopName;
          }
        })
        .catch(error => {});
    },
    exit() {
      this.$router.push({ name: "home" });
    }
  }
};
</script>
<style >
* {
  margin: 0;
  padding: 0;
}
.userdesc {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #f0ebeb;
}
.title {
  position: relative;
  width: 100%;
  height: 30px;
  margin-top: 70px;
}
h3 {
  float: left;
  margin-left: 310px;
  color: #ff6700;
}
h5 {
  float: right;
  margin-right: 300px;
  color: #ababab;
}
.container {
  position: relative;
  width: 960px;
  height: 436px;
  background-color: #ffffff;
  top: 70px;
  left: 300px;
  border-radius: 20px;
}
.upimage {
  position: relative;
  width: 300px;
  height: 436px;
  float: left;
}
.imageArea{
  position: relative;
  top:100px;
  left: 20px;
}
.user {
  position: relative;
  width: 660px;
  height: 436px;
  float: right;
}
.message {
  width: 570px;
  height: 40px;
  margin-top: 50px;
}
.message h3 {
  margin-left: 100px;
  font-size: 20px;
}
.id,
.username,
.password,
.tel,
.address {
  width: 570px;
  height: 40px;
  margin-left: 150px;
  margin-top: 10px;
}
p {
  text-align: left;
}
.text {
  width: 300px;
  height: 40px;
  margin-left: 50px;
  margin-top: -20px;
  text-align: center;
}
</style>
