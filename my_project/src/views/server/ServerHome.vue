<template>
  <div>
    <el-carousel
      ref="car" 
      v-if="isLogin === false"
      indicator-position="none"
      type="card"
      :autoplay="false"
      height="680px"
    >
      <el-carousel-item>
        <login-content  @login="isLogin = $event"></login-content>
      </el-carousel-item>
    </el-carousel>
    <el-carousel
      v-if="isLogin"
      @change="changeCentent"
      :initial-index="Number.parseInt(page)"
      indicator-position="none"
      :interval="40000"
      type="card"
      height="680px"
    >
      <el-carousel-item v-for="item in 4" :key="item">
        <server-content :sel="item"></server-content>
      </el-carousel-item>
    </el-carousel>
    <div v-if="isLogin" id="exit-content">
      <el-button type="danger" size="small" @click="exit">注销</el-button>
    </div>
  </div>
</template>
<script>
import ServerContent from "@/views/server/ServerContent.vue";
import Login from "@/views/adminproduct/Login.vue";

export default {
  data() {
    return {
      isLogin: !!window.sessionStorage.getItem("serve_login"),
      page: window.sessionStorage.getItem("page") || 1
    };
  },
  components: {
    "server-content": ServerContent,
    "login-content": Login,
    
  },
  created(){
    
    
  },
  methods: {
    exit(){
      this.isLogin = false;
      window.sessionStorage.setItem("serve_login",'');
    },
    changeCentent(page) {
      
      window.sessionStorage.setItem("page", page);
    }
  }
};
</script>

<style>
* {
  user-select: text;
}
.el-carousel__item {
  position: relative;
}
.el-carousel__item:nth-child(3) {
  background-color: #67c23a;
}
.el-carousel__item:nth-child(4) {
  background-color: #409eff;
}
.el-carousel__item:nth-child(5) {
  background-color: #ffa500;
}
.el-carousel__item:nth-child(6) {
  background-color: #ffe4b5;
}

#exit-content
{
  position: absolute;
  right: 10%;
  bottom: 5px;
}

.is-active {
  margin-top: 20px;
  border-radius: 20px;
  width: 1400px !important;
  transform: translateX(60px) scale(1) !important;
}

.el-carousel--card {
  height: 680px !important;
}
</style>