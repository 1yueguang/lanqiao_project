<template>
  <div class="popup-page" :hidden="transmit.hidden!==false">
    <div class="product-info">
      <div class="exit-btn" @click="changHidden">
        <a>-</a>
      </div>
      <div class="img-left">
        <img :src="'http://127.0.0.1:8080/static/'+pro_info.productPhoto" alt>
      </div>
      <div class="info-right">
        <p>商品名称</p>
        <p class="pro-name pro-lab">{{pro_info.productName}}</p>
        <p>商品价格</p>
        <p class="pro-lab">
          <span class="pro-price">{{pro_info.productSmallPrice}}</span>元
        </p>
        <p>产品余量</p>
        <p class="surplus pro-lab">999+</p>
      </div>
      <div class="pay-num">购买数量</div>
      <div class="sel-num">
        <input class="buy-txt" v-model="pay_num" type="text">
        <a class="sel-btn" @click="changePayNum(1)">+</a>
        <a class="sel-btn" @click="changePayNum(-1)">-</a>
      </div>
      <div class="add" @click="buyProducts">
        <a>OK</a>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";
import { type } from 'os';
export default {
  data: function() {
    return {
      pay_num: 1,
      pro_info: {}
    };
  },
  props: {
    transmit: {
      pro_id: "",
      hidden: true
    }
  },
  watch: {
    transmit(newVla) {
      if (!newVla.hidden) {
        this.getProInfo(newVla.pro_id);
      }
    }
  },
  methods: {
    changHidden: function() {
      this.$set(this.transmit, "hidden", true);
      this.pay_num = 1;
    },
    changePayNum: function(num) {
      // console.log(this.pro_info.productSmallPrice);
      // console.log(this.pay_num);
      // console.log(this.pro_info.productSmallPrice * this.pay_num);
      if (this.pay_num > 1 || num > 0) {
        this.pro_info.productSmallPrice = (Number.parseFloat(this.pro_info.productSmallPrice) +
          (this.pro_info.productSmallPrice / this.pay_num) * num).toFixed(2);
        this.pay_num = Number.parseInt(this.pay_num) + num;
      }
      
    },
    getProInfo: function(id) {
      axios
        .get("http://127.0.0.1:8080/lanqiao_project/api/product/find", {
          params: {
            productId: id
          }
        })
        .then(response => {
          this.pro_info = response.data.data;
        });
    },
    buyProducts: function() {
      
      if (window.sessionStorage.getItem("userId")) {
        var that = this;
        axios
          .post(
            "http://127.0.0.1:8080/lanqiao_project/api/detail/join",
            qs.stringify({
              detailProductId: that.pro_info.productId,
              detailProductCount: that.pay_num,
              detailProductUnit: that.pro_info.productLargerUnit,
              detailProductPrice: that.pro_info.productSmallPrice,
              detailComment: new Date().toLocaleString(),
              detailUserId: window.sessionStorage.getItem("userId")
            })
          )
          .then(response => {
            var type = response.data.status === "200" ? "success" : "error";
            this.$message({
              message: response.data.message,
              type: type
            });
            if (response.data.status === "200") {
              var product = this.pro_info;
              product.pay_num = this.pay_num;
              console.log(this.pay_num);
              this.$store.dispatch("addProductNumFun", this.pay_num);
              this.changHidden();
            }
          });
      }else
      {
        this.$message({
              message: "用户未登陆!",
              type: 'error'
            });
      }
      
    } //21c0bc0a-d104-42b2-8f23-460b17fe406f
  }
};
</script>
<style scoped>
p,
a {
  user-select: none;
}
a:hover {
  cursor: pointer;
}

.exit-btn {
  position: absolute;
  right: 5px;
  top: 5px;
  width: 30px;
  height: 30px;
  border-radius: 50px;
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
  line-height: 30px;
  font-size: 20px;
  font-weight: bold;
  color: white;
}
.exit-btn:hover {
  background: #cccccc;
}
.popup-page {
  position: fixed;
  margin: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  z-index: 100;
}
.product-info {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 30px 20px;
  box-sizing: border-box;
  box-shadow: 0 0 50px -1px black;
  display: block;
}
.img-left {
  position: relative;
  padding: 0;
  display: inline-block;
  left: 0;
  top: -30px;
}
.img-left img {
  width: 120px;
  height: 160px;
}
.info-right {
  position: relative;
  top: 0px;
  width: 220px;
  margin-left: 20px;
  display: inline-block;
  text-align: left;
}
.info-right p {
  margin: 7px 0px;
  font-size: 14px;
}
.pay-num {
  position: relative;
  height: 30px;
  font-size: 25px;
  font-weight: 300;
  margin-bottom: 20px;
  margin-top: 10px;
  text-align: left;
}
.buy-txt {
  height: 35px;
  padding: 10px 10px;
  border: none;
  outline: none;
  font-size: 20px;
  background: #eeeeee;
  margin-right: 20px;
}
.sel-btn {
  display: inline-block;
  width: 25px;
  height: 25px;
  background: greenyellow;
  color: white;
  border-radius: 25px;
  text-align: center;
  line-height: 25px;
  font-weight: bold;
}
.sel-btn:hover {
  background: #cccccc;
}
.pro-lab {
  background: #eeeeee;
  height: 30px;
  padding: 5px 10px;
  line-height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.pro-name {
  font-weight: 800;
}
.pro-price {
  color: red;
  font-weight: 400;
  font-size: 25px;
}
.add {
  text-align: center;
  background: white;
  width: 100px;
  height: 40px;
  margin-top: 50px;
  line-height: 40px;
  box-shadow: 0 0 10px -5px black;
  border-radius: 5px;
}
.add:hover {
  box-shadow: 0 0 10px -1px black;
}
</style>
