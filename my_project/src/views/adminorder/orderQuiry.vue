<template>
  <div class="orderQuiry">
    <h2>商品订单</h2>
    <div class="orderindex">
      <el-table :data="list" style="width: 80%">
        <el-table-column prop="orderId" align="center" label="订单编号" width="180"></el-table-column>
        <el-table-column prop="user.userShopName" align="center" label="用户" width="180"></el-table-column>
        <el-table-column prop="orderDateTime" align="center" label="订单时间" width="180"></el-table-column>
        <el-table-column prop="orderTotalPrice" align="center" label="金额" width="120"></el-table-column>
        <el-table-column prop="orderIsSend" align="center" label="发货状态" width="120">
          <template slot-scope="scope">{{scope.row.orderIsSend?'已发货':'未发货'}}</template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="250px">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="small"
              @keyup.native.enter="orderSearch"
              placeholder="输入关键字搜索"
            />
          </template>
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click.native.prevent="send(scope.$index,scope.row)"
            >发货</el-button>
            <el-button
              type="danger"
              size="mini"
              @click.native.prevent="invalid(scope.$index,scope.row)"
            >作废</el-button>
            <el-button size="mini" @click="dialogFormVisible=true;quiry(scope.row);">订单详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        background
        :page-size="8"
        layout="total,prev, pager, next,jumper"
        :total="mtotal"
        style="color:black"
      ></el-pagination>
    </div>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form[0]" label-width="80px">
        <el-form-item label="订单编号">{{form[0]?form[0].detailOrderId:''}}</el-form-item>
        <el-form-item label="下单时间">{{form[0]?form[0].detailDateTime:''}}</el-form-item>
        <el-form-item label="订单状态">{{form[0] && form[0].detailStatus?'已完成':'未完成'}}</el-form-item>
        <el-table :data="form" height="200px" style="width: 100%">
          <el-table-column prop="product.productName" label="商品名称" width="130"></el-table-column>
          <el-table-column prop="product.productStandard" label="规格" width="80"></el-table-column>
          <el-table-column prop="product.productLargerUnit" label="单位" width="70"></el-table-column>
          <el-table-column prop="detailProductPrice" label="单价" width="70"></el-table-column>
          <el-table-column prop="detailProductCount" label="数量" width="70"></el-table-column>
          <el-table-column prop="detailTotalPrice" label="金额" width="70"></el-table-column>
          <el-table-column prop="product.productDateTime" label="商品日期" width="160"></el-table-column>
        </el-table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary">
          <a style="color:white" href="http://127.0.0.1:8080/lanqiao_project/order/export">打印</a>
        </el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "orderQuiry",
  data() {
    return {
      form: [],
      dialogFormVisible: false,
      list: [],
      pageNum: "1",
      pageSize: "8",
      orderid: "",
      mtotal: 100,
      input: "",
      activeIndex: "1",
      activeIndex2: "1",
      search: "",
      copyList: []
    };
  },
  props: {},
  created() {
    this.queryAll();
  },
  watch: {
    search: function(newVla, oldVla) {
      if (newVla !== oldVla) {
        this.list = this.copyList;
      }
    }
  },
  methods: {
    queryAll() {
      let params = this.$qs.stringify({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        orderId: this.input
      });
      this.$axios
        .post("http://127.0.0.1:8080/lanqiao_project/order/list", params)
        .then(result => {
          // console.log("order"+JSON.stringify(result));
          if (result.data.status == "200") {
            this.list = result.data.data.list;
            this.mtotal = result.data.data.total;
            this.copyList = this.list;
          }
        });
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.queryAll();
    },
    send(index, row, rows) {
      let dID = row.orderId;
      this.$axios
        .get("http://127.0.0.1:8080/lanqiao_project/order/send", {
          params: {
            orderid: dID
          }
        })
        .then(result => {
          var type = result.data.status == "200" ? "success" : "error";
          this.$message({
            message: result.data.message,
            type: type
          });
          if (result.data.status == "200") {
            this.$set(this.list[index], "orderIsSend", 1);
          }
        });
    },
    invalid(index, row) {
      let dID = row.orderId;
      this.$axios
        .get("http://127.0.0.1:8080/lanqiao_project/order/invalid", {
          params: {
            orderid: dID
          }
        })
        .then(result => {
          var type = result.data.status == "200" ? "success" : "error";
          this.$message({
            message: result.data.message,
            type: type
          });
          if (result.data.status == "200") {
            this.queryAll();
          }
        });
    },
    orderSearch() {
      var self = this;
      this.$axios
        .get("http://127.0.0.1:8080/lanqiao_project/order/qyrOderById", {
          params: {
            orderid: self.search
          }
        })
        .then(result => {
          if (result.data.status == "200") {
            console.log(2);
            this.copyList = this.list;
            this.list = [result.data.data];
          }
        });
    },
    quiry(row) {
      this.$axios
        .get("http://127.0.0.1:8080/lanqiao_project/order/detail", {
          params: {
            orderid: row.orderId
          }
        })
        .then(result => {
          console.log(JSON.stringify(result));
          if (result.data.status == "200") {
            this.form = result.data.data;
          }
          console.log(JSON.stringify(this.form));
        });
    }
  }
};
</script>
<style scoped>
.el-table {
  left: 50%;
  transform: translateX(-50%);
}
</style>

