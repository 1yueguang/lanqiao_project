<template>
  <div class="login-container" v-if="content_hidden">
    <div id="background" class="wall"></div>
    <div id="midground" class="wall"></div>
    <div id="foreground" class="wall"></div>
    <div id="top" class="wall"></div>

    <div id="go-serve-login" @click="goServeLogin">
      后台->
    </div>
    <div class="login-regsiter">
      <div class="login-box" :hidden="login_hidden">
        <form>
          <h1 class="login_font">LOGIN IN</h1>
          <table>
            <tr v-for="item of input_login" :key="item.id">
              <td>
                <input
                  autocomplete="off"
                  :type="item.text_type"
                  :id="item.id"
                  :placeholder="item.placeHolder"
                  class="input_clo"
                  v-model="item.vla"
                >
              </td>
            </tr>
            <tr>
              <td>
                <input @click="post_login" type="button" value="OK" class="login_btn">
              </td>
            </tr>
            <tr>
              <td>
                <a @click="change_show" href="#">Not Have One?</a>
              </td>
            </tr>
          </table>
        </form>
      </div>
      <div class="regsiter-box" :hidden="login_hidden===false">
        <form>
          <h1 class="regsiter_font">Regsiter</h1>
          <table>
            <tr v-for="item of regsiter_input" :key="item.id">
              <td>
                <input
                  autocomplete="off"
                  :type="item.text_type"
                  :id="item.id"
                  :placeholder="item.placeHolder"
                  class="input_clo"
                  v-model="item.vla"
                >
              </td>
            </tr>
            <tr>
              <td>
                <input @click="post_regsiter" type="button" value="OK" class="login_btn">
              </td>
            </tr>
            <tr>
              <td>
                <a @click="change_show" href="#">Already Have One?</a>
              </td>
            </tr>
          </table>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { type } from 'os';
export default {
  data: function() {
    return {
      content_hidden: !window.sessionStorage.getItem('userId'),
      login_hidden: false,
      input_login: [
        {
          id: "login_username",
          text_type: "text",
          placeHolder: "Account"
        },
        {
          id: "login_password",
          text_type: "password",
          placeHolder: "Password"
        }
      ],
      regsiter_input: [
        {
          id: "username",
          text_type: "text",
          placeHolder: "Account"
        },
        {
          id: "password",
          text_type: "password",
          placeHolder: "Password"
        },
        {
          id: "phone",
          text_type: "text",
          placeHolder: "Phone"
        },
        {
          id: "address",
          text_type: "text",
          placeHolder: "Address"
        },
        {
          id: "shopname",
          text_type: "text",
          placeHolder: "Shop Name"
        }
      ]
    };
  },

  methods: {
    change_show: function(e) {
      this.login_hidden = !this.login_hidden;
    },
    post_regsiter: function() {
      console.log(this.regsiter_input[0].vla);
      var that = this;
      this.$axios
        .post(
          "http://127.0.0.1:8080/lanqiao_project/api/user/add",
         this.$qs.stringify({
            userUserName: that.regsiter_input[0].vla,
            userPassword: that.regsiter_input[1].vla,
            userTelphone: that.regsiter_input[2].vla,
            userAddress: that.regsiter_input[3].vla,
            userShopName: that.regsiter_input[4].vla,
            userStatus:1,
          })
        )
        .then(response => {
          var type = response.data.status === '200'?'success':'error';
          this.$message({
            message:response.data.message,
            type:type
          })
          console.log(JSON.stringify(response));
        });
    },
    post_login: function() {
       
      var that = this;
      this.$axios
        .post(
          "http://127.0.0.1:8080/lanqiao_project/api/login",
         this.$qs.stringify({
            username: that.input_login[0].vla,
            password: that.input_login[1].vla
          })
        )
        .then(response => {
          console.log(JSON.stringify(response));
          var type = response.data.status === '200'?'success':'error';
          console.log(response.data);
          this.$message({
            message:response.data.message,
            type:type,
          });
          if(response.data.status === '200')
          {
            window.sessionStorage.setItem('userId',response.data.data.userId);
            this.content_hidden = false;
          }
            
        });
      return false;
    },
    goServeLogin(){
    
      this.$router.push({path:'/serve'});
    }
  }
};
</script>
<style scoped>
#background {
  z-index: 0;
  background-size: cover;
}

#midground {
  background: url("../assets/login/midground.png");
  z-index: 1;
  animation: cc 100s linear infinite;
}

#foreground {
  background: url("../assets/login/foreground.png");
  z-index: 2;
  animation: cc 153s linear infinite;
}

#top {
  background: url("../assets/login/midground.png");
  z-index: 4;
  animation: da 100s linear infinite;
}

@keyframes cc {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 600% 0;
  }
}

@keyframes da {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 0 600%;
  }
}
.wall {
  position: absolute;
  width: 100%;
  height: 100%;
  visibility: hidden;
}
#go-serve-login
{
  position: absolute;
  right: 5%;
  top: 50%;
  font-size: 25px;
  margin: 50px;
  color: white;
  z-index: 100;
}
#go-serve-login:hover
{
  text-shadow: -1px -1px 10px white;
   cursor: pointer;
}
.login-container {
  position: fixed;
  left: 50%;
  width: 20%;
  height: 15px;
  background-color: rgba(139, 126, 102, 0.8);
  transform: translateX(-50%);
  overflow: hidden;
  padding: 0;
  transition: all 0.3s ease;
  z-index: 10;
}
.login-container:hover {
  width: 100%;
  height: 100%;
  transition: height 0.5s ease;
  z-index: 120;
}
.login-container:hover .login-regsiter {
  margin-left: 0;
}
.login-container:hover .wall {
  visibility: visible;
}
.login-regsiter {
  z-index: 9999;
  width: 300px;
  padding: 20px;
  text-align: center;
  background: url(../assets/login/preview1.jpg);
  margin-left: 9999px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.login-regsiter form h1 {
  margin-top: 100px;
  display: inline-block;
  text-transform: uppercase;
  margin-right: 5px;
  color: #fff;
  font-size: 40px;
}

.login-regsiter form table {
  width: 100%;
}
.login-regsiter table tr input {
  text-align: center;
  padding: 0 16px;
  height: 44px;
  width: 100%;
  box-sizing: border-box;
  outline: none;
  border: none;
}
.login-regsiter table .input_clo {
  margin: 10px 0;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 6px;
}
.login-regsiter table .login_btn {
  margin-top: 40px;
  margin-bottom: 10px;
  background: #487eb0;
  color: #fff;
  border-radius: 44px;
  transition: 0.3s ease;
}
.login-regsiter table .login_btn:hover {
  transform: scale(0.94);
}
.login-regsiter table tr a {
  text-decoration: none;
  color: #fff;
  text-align: center;
  transition: all 0.5s ease;
}
.login-regsiter table tr a:hover {
  color: black;
}
</style>

