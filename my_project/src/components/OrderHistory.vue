<template>
  <div id="order-btn" @click="showOrder">
    <i class="el-icon-tickets"></i>
    <div id="order-content">
      <el-table :data="tableData" height="300px;" style="width: 100%">
        <el-table-column prop="orderId" label="订单编号" width="100"></el-table-column>
        <el-table-column prop="orderUserId" label="用户编号" width="170"></el-table-column>
        <el-table-column prop="orderDateTime" label="订单日期" width="100"></el-table-column>
        <el-table-column prop="orderIsSend" label="发货" width="50">
            <template slot-scope="scope">
                {{scope.row.orderIsSend?'已发货':'未发货'}}
            </template>
        </el-table-column>
        <el-table-column prop="orderIsValid" label="姓名" width="60"></el-table-column>
        <el-table-column prop="orderTotalPrice" label="订单消费" width="80"></el-table-column>
        <el-table-column prop="orderStatus" label="订单状态" width="80">
            <template slot-scope="scope">
                {{scope.row.orderStatus?'有效':'无效'}}
            </template>
        </el-table-column>
        <el-table-column prop="orderComment" label="订单内容" width="100"></el-table-column>
        <el-table-column prop="user" label="地址" width="100"></el-table-column>
        
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      window.sessionStorage.getItem("userId") &&
        this.$axios
          .get("http://127.0.0.1:8080/lanqiao_project/api/order/selectHistory", {
            params: {
              userId: window.sessionStorage.getItem("userId")
            }
          })
          .then(response => {
            this.tableData = response.data.data;
          });
    },
    showOrder() {
      if (document.getElementById("order-content").style.width == "560px")
        document.getElementById("order-content").style.width = "0px";
      else {
        document.getElementById("order-content").style.width = "560px";
        this.init();
      }
    }
  }
};
</script>
<style scoped>
.el-icon-tickets {
  line-height: 40px;
  font-size: 20px;
  font-weight: 400;
}
#order-btn {
  position: fixed;
  bottom: 18%;
  right: 55px;
  width: 40px;
  height: 40px;
  text-align: center;
  border-radius: 10px;
  background: white;
  box-shadow: 0 0 20px -5px black;
  transition: all 0.5s ease;
}
#order-btn:hover {
  background: black;
  color: white;
  cursor: pointer;
}
#order-content {
  position: absolute;
  right: 0%;
  bottom: 30px;
  width: 0px;
  transition: all 0.5s ease;
}
</style>
