<template>
  <div>
    <div class="pay-btn" @click="isHidden = !isHidden;clearNum()">
      <div v-if="new_num" id="new-num">{{new_num}}</div>
      <a>￥</a>
    </div>
    <div id="cart-content" :hidden="isHidden">
      <div class="cart-pro-box">
        <ul>
          <li v-for="(item,index) of products" :key="item.detailId" class="cart-pro">
            <div>
              <img :src="'http://127.0.0.1:8080/static/'+item.product.productPhoto">
            </div>
            <p class="name">{{item.product.productName}}</p>
            <p>
              <span class="tag">数量</span>
              {{item.detailProductCount}}
            </p>
            <p>
              <span class="tag">总价</span>
              {{(item.detailTotalPrice - 0).toFixed(1)}}元
            </p>
            <div @click="del(index,$event)" class="cart-del">—</div>
          </li>
        </ul>
      </div>
      <div id="pay-box">
        <p>总计</p>
        <p class="cast">{{total_price}}</p>元
        <a @click="buyProducts" id="buy-btn">付款</a>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";
export default {
  data: function() {
    return {
      isHidden: true,
      products: []
    };
  },
  computed: {
    new_num: function() {
      return this.$store.state.new_num;
    },
    total_price: {
      get: function() {
        var price = 0;
        if (this.products) {
          for (var index of this.products) {
            console.log(JSON.stringify(index));
            price = index.detailTotalPrice - 0 + price;
            
          }
        }
        return price;
      },
      set: function(newVla) {
        console.log(newVla);
      }
    }
  },
  watch: {
    isHidden: function(newVla) {
      if (!newVla) {
       window.sessionStorage.getItem('userId') && axios
          .get("http://127.0.0.1:8080/lanqiao_project/api/detail/qryCartList", {
            params: {
              uid: window.sessionStorage.getItem('userId'),
            }
          })
          .then(response => {
            this.products = response.data.data;
            console.log(JSON.stringify(this.products));
          });
      }
    }
  },
  methods: {
    del: function(index, e) {
      if (e.target.className === "cart-del") {
        var detail_id = this.products[index].detailId;
        e.target.parentNode.style.width = 0;
        e.target.parentNode.style.height = 0;
        e.target.parentNode.style.padding = 0;
        e.target.parentNode.style.margin = 0;
        e.target.parentNode.style.overflow = "hidden";
        this.$set(this.products[index], "detailTotalPrice", 0);
        axios
          .post(
            "http://127.0.0.1:8080/lanqiao_project/api/detail/cartDel",
            qs.stringify({
              detailId: detail_id
            })
          )
          .then(response => {
            console.log(JSON.stringify(response));
          });
      }
    },
    clearNum: function() {
      
      this.$store.dispatch("addProductNumFun", 0);
      console.log(this.$store.state.new_num);
    },
    buyProducts: function() {
      if (!this.products) {
        this.$message({
          message: "购物车为空",
          type: "error"
        });
      } else {
        var that = this;
        var params = this.$qs.stringify({
          orderUserId: window.sessionStorage.getItem('userId'),
          orderTotalPrice: that.total_price,
          orderComment: ""
        });
        this.$axios
          .post("http://127.0.0.1:8080/lanqiao_project/api/order/commit", params)
          .then(response => {
            this.$message({
              message: response.data.message,
              type: "success"
            });
            this.products = [];
          });
      }
    }
  }
};
</script>
<style scoped>
.pay-btn {
  width: 55px;
  height: 55px;
  background: white;
  box-shadow: 0 0 50px -5px black;
  position: fixed;
  bottom: 5%;
  right: 3%;

  text-align: center;
  border-radius: 55px;
  transition: all 0.3s linear;
  z-index: 101;
}
.pay-btn #new-num {
  position: absolute;
  display: block;
  width: 20px;
  height: 20px;
  top: -5px;
  right: -5px;
  background: red;
  color: white;
  font-size: 15px;
  overflow: hidden;
  transition: all 0.5s ease;
  border-radius: 5px;
}
.pay-btn a {
  height: 55px;
  line-height: 55px;
  font-size: 30px;
  font-weight: bold;
}
.pay-btn:hover {
  color: white;
  background: black;
  cursor: pointer;
}
.pay-btn:hover #new-num {
  width: 0;
}
li {
  list-style-type: none;
}
#cart-content {
  width: 100%;
  height: 100%;
  margin: 0%;
  padding: 5px;
  background: rgba(200, 200, 200, 0.8);
  position: fixed;
  top: 0%;
  left: 0%;
  z-index: 100;
}
#exit-cart {
  position: fixed;
  top: 5%;
  right: 5%;
  text-transform: uppercase;
  font-weight: 800;
  background: white;
  z-index: 10;
}
.cart-pro-box {
  position: absolute;
  top: 17%;
  left: 50%;
  transform: translateX(-50%);
  background: rgb(191, 240, 117);

  width: 50%;
  height: 550px;
  overflow-y: auto;
}
.cart-pro-box ul {
  padding: 0 10px;
}

.cart-pro-box ul li {
  position: relative;
  top: 0%;
  right: 0;
  width: 130px;
  height: 160px;
  float: left;
  background: white;
  margin-left: 10px;
  text-align: center;
  box-sizing: border-box;
  margin: 20px 0px 10px 15px;
  padding: 10px;
  transition: all 0.5s ease;
  border-radius: 5px;
  box-shadow: 0 0 15px -5px black;
}
.cart-pro-box ul li img {
  width: 80px;
  height: 50px;
}
.cart-pro-box ul li p {
  margin: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: red;
}
.cart-pro-box ul li .tag {
  font-size: 12px;
  font-weight: 800;
  color: black;
  margin-right: 0px;
}
.cart-pro-box ul li .name {
  color: darkorange;
}
.cart-pro-box ul li .cart-del {
  position: absolute;
  top: -10px;
  right: -10px;
  height: 25px;
  width: 25px;
  line-height: 25px;
  z-index: 10;
  background: yellowgreen;
  font-size: 1px;
  font-weight: bold;
  border-radius: 30px;
  color: white;
}

.cart-pro-box ul li .cart-del:hover {
  background: white;
  cursor: pointer;
}
#pay-box {
  padding: 5px;

  position: relative;
  width: 50%;
  left: 50%;
  top: 5%;

  transform: translateX(-50%);
}
#pay-box .cast {
  font-size: 30px;
  color: red;
  margin: 0 20px;
  font-weight: 800;
}
#pay-box p {
  display: inline-block;
}
#buy-btn {
  float: right;
  margin-left: 100px;
  width: 80px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 20px;
  font-weight: 800;
  border-radius: 5px;
  transition: all 0.5s ease;
  background: white;
}
#buy-btn:hover {
  color: white;
  background: black;
  cursor: pointer;
}

.cart-pro-box::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 1px;
}
</style>
