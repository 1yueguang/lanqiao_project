<template>
  <div id="order-view">
    {{this.$route.params.id}}
    <el-form ref="form" :model="list" label-width="80px">
      <el-form-item label="订单编号">{{list[0].detailOrderId || ''}}</el-form-item>
      <el-form-item label="下单时间">{{list[0].detailDateTime}}</el-form-item>
      <el-form-item label="订单状态">{{list[0].detailStatus}}</el-form-item>
      <el-form-item label="其他操作">
        <el-button type="primary">
          <a href="http://www.wxhwg.com:8080/mock/order/export">打印</a>
        </el-button>
      </el-form-item>
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="product.productName" label="商品名称" width="180"></el-table-column>
        <el-table-column prop="product.productStandard" label="规格" width="180"></el-table-column>
        <el-table-column prop="product.productLargerUnit" label="单位" width="180"></el-table-column>
        <el-table-column prop="detailProductPrice" label="单价" width="180"></el-table-column>
        <el-table-column prop="detailProductCount" label="数量" width="180"></el-table-column>
        <el-table-column prop="detailTotalPrice" label="金额"></el-table-column>
        <el-table-column prop="product.productDateTime" label="商品日期"></el-table-column>
      </el-table>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: []
    };
  },
  created: function() {
    this.quiry();
  },
  methods: {
    quiry() {
      this.$axios
        .get("http://www.wxhwg.com:8080/mock/order/detail", {
          params: {
            orderid: this.$route.query.Id.orderId
          }
        })
        .then(result => {
          if (result.data.status == "200") {
            this.list = result.data.data;
            console.log(result.data.data);
            for (let v = 0; v <= this.list.length; v++) {
              if (this.list[v]) {
                if (this.list[v].detailStatus) {
                  this.list[v].detailStatus = "未完成";
                } else {
                  this.list[v].detailStatus = "已完成";
                }
              }
            }
          }
        });
    },
    print() {}
  }
};
</script>
<style scoped>

</style>
>
#order-view {
  width: 100%;
  height: 700px;
}
.el-form {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1226px;
  background: white;
  padding: 30px;
  border-radius: 10px;
  transform: translate(-50%, -50%);
}
.el-input {
  width: 350px;
}
</style>
