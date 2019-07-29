<template>
  <li class="brick-item" :style="{transform:rotate}" @click="changeContent($event)">
    <div class="figure">
      <a>
        <img :src="'http://127.0.0.1:8080/static/'+item.productPhoto" alt>
      </a>
    </div>
    <h3 class="title">
      <a>{{item.productName}}</a>
    </h3>
    <p>
      <span class="price">{{item.productSmallPrice}}</span>元
    </p>
    <div class="flag flag-new">热卖</div>
    <div class="need" :id="item.productId">
      <a>加入购物车</a>
    </div>

    <div class="hidden_list" :hidden="listHidden">
      <p class="pro-tag">编号</p>
      <p>{{product.productId}}</p>
      <p class="pro-tag">编码</p>
      <p>{{product.productCode}}</p>
      <p class="pro-tag">商标</p>
      <p>{{product.productBrandId || 'null'}}</p>
      <p class="pro-tag">时间</p>
      <p>{{product.productDateTime}}</p>
      <p class="pro-tag">推荐价格</p>
      <p>{{product.productSuggestPrice}}元</p>
    </div>
  </li>
</template>
<script>
export default {
  data: function() {
    return {
      listHidden: true,
      rotate: "rotateY(0deg)",
      product:{},
    };
  },
  props: ["item"],
  methods: {
    changeContent: function(e) {
      if (e.target.parentNode.getAttribute("class") !== "need") {
        var that = this;
        this.listHidden = !this.listHidden;
        this.rotate = this.listHidden ? "rotateY(0deg)" : "rotateY(180deg)";
        this.$axios.get('http://127.0.0.1:8080/lanqiao_project/api/product/find',{
          params:{
            productId:that.item.productId,
          }
        }).then(response => {
          // console.log(JSON.stringify(response));
          this.product = response.data.data;
        });
      }
    },
  }
};
</script>
<style>

.hidden_list
{
  border-radius: 10px;
  
}
.hidden_list .pro-tag
{
  margin: 5px;
  
  font-size: 13px;
  font-weight: 1000;
  background:none;
}
.hidden_list p
{
  margin: 0px;
  font-size: 15px;
  background:orange; 
}
</style>
