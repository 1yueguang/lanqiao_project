<template>
  <div id="user-info" @click="showInfo">
      <div id="info">
          <img src>
          <p>
              用户名:{{user_info.userUserName}}
          </p>
          <p>
              电话:{{user_info.userTelphone}}
          </p>
          <p>
              地址:{{user_info.userAddress}}
          </p>
          <el-button
          type="danger"
          size="mini"
          style="margin-top:10px;margin-left:180px;"
          @click="exit"
        >注销</el-button>
      </div>
      <i class="el-icon-user"></i>
      
  </div>
</template>
<script>
export default {
    data(){
        return {
            user_info:{},
        }
    },
    created:function()
    {
        this.init();
    },
    methods:
    {
        init(){
            var user_id = window.sessionStorage.getItem('userId');
            if(user_id)
            {
                this.$axios.get('http://127.0.0.1:8080/lanqiao_project/api/user/findById',{
                    params:{
                        userId:user_id,
                    }
                }).then(response => {
                    console.log('userinfo');
                    console.log(JSON.stringify(response));
                    this.user_info = response.data.data;
                })
            }
            
        },
        showInfo(){
            document.getElementById('info').style.width = document.getElementById('info').style.width==='250px'?'0px':'250px';
        },
        exit()
        {
            if(window.sessionStorage.getItem('userId'))
            {
                window.sessionStorage.setItem('userId','');
                // this.user_info = {};
                // this.$message({
                //     message:'用户注销成功',
                //     type:'success'
                // })
                this.$router.push({path:'/'});
            }
            else
            {
                this.$message({
                    message:'注销失败,用户未登陆!',
                    type:'error'
                })
            }
                
        }
    }
}
</script>

<style>
#user-info {
position: fixed;
  top: 15%;
  right: 55px;
  width: 40px;
  height: 40px;
  margin-top: 10px;
  margin-left: 10px;
  box-shadow: 0 0 10px -5px black;
  background: white;
  border-radius: 10px;
  text-align: center;
  transition: all .5s ease;
}
#user-info:hover
{
    background: black;
    color: white;
    cursor: pointer;

}
.el-icon-user::before
{
    line-height: 40px;
}
#info
{
    position: absolute;
    top: 0%;
    right: 40px;
    padding: 0;
    background: rgb(255, 255, 255);
    text-align: left;
    transition: all 0.5s ease;
    width: 0px;
    height: 130px;
    overflow: hidden;
    border-radius: 5px;
}
#info p
{
    padding: 0;
    width: 200px;
    margin: 5px  5px 5px 100px;
    color: black;
}
#info img
{
    display: block;
    position: absolute;
    left: 0;
    top: 0%;
    width: 90px;
    height: 110px;
    margin: 5px;
}
</style>