<template>
  <div>
    <el-dialog width="550px" title="用户添加" :visible.sync="registerVisible">
      <el-form
        :model="registerUser"
        :rules="rules"
        class="registerForm"
        ref="registerForm"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="userUserName">
          <el-input v-model="registerUser.userUserName" placeholder="请输入用户名" type="text"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="userPassword">
          <el-input v-model="registerUser.userPassword" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="userTelphone">
          <el-input v-model="registerUser.userTelphone" placeholder="请输入电话" type="text"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="userAddress">
          <el-input v-model="registerUser.userAddress" placeholder="请输入地址" type="text"></el-input>
        </el-form-item>

        <el-form-item label="商品名称" prop="userShopName">
          <el-input v-model="registerUser.userShopName" placeholder="请输入商品名称" type="text"></el-input>
        </el-form-item>

        <el-form-item label="备注" prop="userComment">
          <el-input v-model="registerUser.userComment" placeholder="请输入备注" type="text"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="userStatus">
          <el-select v-model="registerUser.userStatus" placeholder="状态">
            <el-option label="1" value="有效"></el-option>
            <el-option label="0" value="无效"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button class="submit_btn">取消</el-button>
        <el-button
          type="primary"
          class="submit_btn"
          @click="submitForm('registerForm');registerVisible=false;"
        >添加</el-button>
      </div>
    </el-dialog>
    <el-dialog width="550px" title="用户修改" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.userUserName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.userPassword"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.userTelphone"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.userAddress"></el-input>
        </el-form-item>
        <el-form-item label="商店名称">
          <el-input v-model="form.userShopName"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.userComment"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="edit()">提交</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </div>
    </el-dialog>
    <div>
      <h2>用户列表</h2>
      <!-- <el-input
        v-model="input11"
        placeholder="ID查询"
        style="width:300px;display:block-inline;float:left;"
      ></el-input>-->
      <!-- <el-input
        v-model="input1"
        size="small"
        placeholder="电话"
        style="width:250px;display:block-inline;float:left;"
      ></el-input>
      <el-input
        v-model="input2"
        size="small"
        placeholder="商店名称 可模糊"
        style="width:250px;display:block-inline;float:left;"
      ></el-input>-->
      <!-- <el-input
        v-model="input3"
        placeholder="当前页"
        style="width:300px;display:block-inline;float:left;"
      ></el-input>-->

      <!-- <el-button
        size="small"
        style="display:block-inline;float:left;"
        icon="el-icon-search"
        @click="search()"
      ></el-button>-->
    </div>
    <el-table
      :data="tableData"
      tooltip-effect="dark"
      style="width:98%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column prop="userUserName" align="center" label="用户名" width="140"></el-table-column>
      <el-table-column prop="userPassword" align="center" label="密码" width="140"></el-table-column>
      <el-table-column prop="userTelphone" align="center" label="电话" width="140"></el-table-column>
      <el-table-column prop="userAddress" align="center" label="地址" width="220"></el-table-column>
      <el-table-column prop="userShopName" align="center" label="商店名称" width="180"></el-table-column>
      <el-table-column prop="userComment" align="center" label="备注" width="170"></el-table-column>
      <el-table-column prop="userStatus" align="center" label="状态" width="120"></el-table-column>
      <el-table-column align="center" label="操作" width="180">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="small"
            width="80px"
            @keyup.native.enter="usrSearch"
            placeholder="输入关键字搜索"
          />
        </template>
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="dialogFormVisible=true;userId = tableData[scope.$index].userId;form = scope.row"
          >编辑</el-button>
          <el-button
            @click.native.prevent="del(scope.$index, tableData ,scope.row.userId)"
            size="mini"
            type="danger"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="position: relative;">
      <el-pagination
        @current-change="handleCurrentChange"
        background
        :page-size="8"
        layout="total,prev, pager, next,jumper"
        :total="mtotal"
        style="color:black"
      ></el-pagination>
      <el-button
        style="position: absolute;top: -5px;right: 10%;color:white;"
        type="primary"
        @click="registerVisible=true"
      >添加用户</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: "11",
      input: [],
      tableData: [],
      multipleSelection: [],
      input1: "",
      input2: "",
      dialogFormVisible: false,
      form: {
        userUserName: "",
        userPassword: "",
        userTelphone: "",
        userAddress: "",
        userShopName: "",
        userComment: ""
      },
      mtotal: 1,
      search: "",
      copyTab:[],

      registerVisible: false,
      registerUser: {
        userUserName: "",
        userPassword: "",
        userTelphone: "",
        userAddress: "",
        userShopName: "",
        userComment: "",
        userStatus: ""
      },
      rules: {
        userUserName: [
          { required: true, message: "用户名不能为空", trigger: "change" },
          { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" }
        ],
        userPassword: [
          { required: true, message: "密码不为空", trigger: "change" },
          { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" }
        ],
        userTelphone: [
          { required: true, message: "手机号不为空", trigger: "change" },
          {
            min: 11,
            max: 13,
            message: "长度在 11 到 13 个数字",
            trigger: "blur"
          }
        ],
        userAddress: [
          { required: true, message: "地址不为空", trigger: "change" },
          { min: 3, max: 60, message: "长度在 2 到 30 个字符", trigger: "blur" }
        ],
        userShopName: [
          { required: true, message: "商品名不为空", trigger: "change" },
          { min: 3, max: 60, message: "长度在 2 到 30 个字符", trigger: "blur" }
        ],
        userComment: [
          { required: true, message: "备注不为空", trigger: "change" },
          { min: 3, max: 60, message: "长度在 2 到 30 个字符", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.find();
  },
  watch: {
    search: function(newVla,oldVla) {
      if (newVla !== oldVla) {
        this.tableData = this.copyTab;
      }
    }
  },
  methods: {
    edit() {
      let that = this;
      console.log(that.userId);
      this.$axios
        .post(
          "http://127.0.0.1:8080/lanqiao_project/user/update",
          that.$qs.stringify({
            userId: that.userId,
            userUserName: that.form.userUserName,
            userPassword: that.form.userPassword,
            userTelphone: that.form.userTelphone,
            userAddress: that.form.userAddress,
            userShopName: that.form.userShopName,
            userComment: that.form.userComment
          })
        )
        .then(response => {
          let result = response.data;
          console.log(JSON.stringify(response));
          that.dialogFormVisible = false;
          if (result.status == 200) {
            this.$message({
              message: result.message,
              type: "success"
            });
          }
        });
    },
    del(index, rows, Id) {
      rows.splice(index, 1);
      var that = this;
      this.$axios
        .get("http://127.0.0.1:8080/lanqiao_project/user/del", {
          params: {
            uid: Id
          }
        })
        .then(res => {
          this.$message({
            message: "删除成功！",
            type: "success"
          });
        });
    },
    usrSearch() {
      var phone = /^\d{11,13}$/;
      var shop = /^[\u4e00-\u9fa5 | 0-9]{1,}/;
      this.input1 = phone.test(this.search) ? this.search : null;
      this.input2 = phone.test(this.search) ? null : this.search;
      var that = this;
      this.$axios
        .get("http://127.0.0.1:8080/lanqiao_project/user/list", {
          params: {
            telphone: that.input1,
            shopName: that.input2,
          }
        })
        .then(res => {
          that.tableData = res.data.data.list;
        });
      // if (that.input11 != "") {
      //   this.$axios
      //     .get("http://wxhwg.com:8080/mock/user/findById", {
      //       params: {
      //         uid: that.input11
      //       }
      //     })
      //     .then(res => {
      //       console.log(res.data.data);
      //       console.log(this.tableData);
      //       that.tableData = [1];
      //       that.tableData1 = res.data.data;
      //       console.log(that.tableData);
      //     });
      // }
      // if (that.input1 != "" || that.input2 != "" || that.input3 != "") {
      //   that.input11 = "";
      // }
      // if (
      //   that.input1 == "" &&
      //   that.input2 == "" &&
      //   that.input3 == "" &&
      //   that.input11 == ""
      // ) {
      //   that.find();
      // }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },
    find() {
      this.$axios.get("http://127.0.0.1:8080/lanqiao_project/user/list").then(res => {
        console.log(JSON.stringify(res));
        this.mtotal = res.data.data.total;
        this.tableData = res.data.data.list;
        this.copyTab = this.tableData;
      });
    },
    handleCurrentChange(val) {
      this.$axios
        .get("http://127.0.0.1:8080/lanqiao_project/user/list", {
          params: {
            pageNum: val
          }
        })
        .then(res => {
          this.mtotal = res.data.data.total;
          this.tableData = res.data.data.list;
        });
    },
    submitForm(formName) {
      var self = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = this.$qs.stringify({
            userUserName: self.registerUser.userUserName,
            userPassword: self.registerUser.userPassword,
            userTelphone: self.registerUser.userTelphone,
            userAddress: self.registerUser.userAddress,
            userShopName: self.registerUser.userShopName
          });
          console.log(JSON.stringify(params));
          this.$axios
            .post("http://127.0.0.1:8080/lanqiao_project/user/add", params)
            .then(res => {
              this.$message({
                message: "添加成功！",
                type: "success"
              });
              let result = res.data;
              console.log(result);
            });
        } else {
          console.log("ERROR");
        }
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
