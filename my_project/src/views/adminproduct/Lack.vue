<template>
  <div>
    <h2>商品列表</h2>
    <el-table style="width: 90%" height="500px" :data="queryList">
      <el-table-column align="center" label="商品编号" prop="productId" width="320px"></el-table-column>
      <el-table-column align="center" label="商品名称" prop="productName" width="200px"></el-table-column>
      <el-table-column align="center" label="状态" prop="productStatus" width="120px">
        <template slot-scope="scope">{{scope.row.productStatus?'有效':'无效'}}</template>
      </el-table-column>
      <el-table-column align="center" label="是否在销" prop="productIsSale" width="120px">
        <template slot-scope="scope">{{scope.row.productIsSale?'在销':'未销'}}</template>
      </el-table-column>
      <el-table-column align="center" label="是否缺货" prop="productIsLack" width="120px">
        <template slot-scope="scope">{{scope.row.productIsLack > 0?'正常':'缺货'}}</template>
      </el-table-column>
      <el-table-column align="center" width="280px">
        <template slot="header" slot-scope="scope" width="280px">
          <el-input
            v-model="search"
            size="small"
            width="80px"
            @keyup.native.enter="proSearch"
            placeholder="输入关键字搜索"
          />
        </template>
        <template slot-scope="scope" width="280px">
          <el-button type="warning" size="mini" @click="lack(scope.$index,scope.row)">缺货</el-button>
          <el-button type="warning" size="mini" @click=" nolack(scope.$index, scope.row)">上架</el-button>
          <el-button
            type="warning"
            size="mini"
            @click="dialogFormVisible = true;pro_create = false"
          >修改</el-button>
          <el-button type="danger" size="mini" @click="dropproduct(scope.$index, scope.row)">删除</el-button>
          <!-- 修改商品 -->
          <!-- 修改商品弹窗 -->
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-dialog class="lack-dialog" width="550px" title="商品修改" :visible.sync="dialogFormVisible">
        <el-form ref="form" :model="form" label-width="100px">
          <!-- <el-form-item label="产品序列号">
            <el-input v-model="form.productCode"></el-input>
          </el-form-item>-->
          <el-form-item label="商品名称">
            <el-input v-model="form.productName"></el-input>
          </el-form-item>
          <el-form-item label="规格">
            <el-input v-model="form.productStandard"></el-input>
          </el-form-item>
          <el-form-item label="单位">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="件" value="件"></el-option>
              <el-option label="盒" value="盒"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="品牌名称">
            <el-input v-model="form.productBrandId"></el-input>
          </el-form-item>
          <el-form-item label="图片名称">
            <el-input v-model="form.productPhoto"></el-input>
          </el-form-item>
          <el-form-item label="是否在销">
            <!-- <el-input v-model="form.productIsSale"></el-input> -->
            <el-select v-model="form.region" placeholder="1 是 0 否">
              <el-option label="1" value="件"></el-option>
              <el-option label="10" value="盒"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否缺货">
            <el-input v-model="form.productIsLack"></el-input>
          </el-form-item>
          <el-form-item label="状态 ">
            <el-input v-model="form.productStatus"></el-input>
          </el-form-item>
          <el-form-item label="排序">
            <el-input v-model="form.productOrder"></el-input>
          </el-form-item>
          <el-form-item label="大单位规格">
            <el-input v-model="form.productLargerStandard"></el-input>
          </el-form-item>
          <el-form-item label="建议零售价">
            <el-input v-model="form.productSuggestPrice"></el-input>
          </el-form-item>
          <el-upload
            class="upload-demo"
            drag
            action="http://127.0.0.1:8080/lanqiao_project/common/upload"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button
            type="primary"
            v-if="pro_create === true"
            @click="grounding();dialogFormVisible = false;"
          >确 定</el-button>
          <el-button
            type="danger"
            v-if="pro_create === false"
            @click="updateProduct();dialogFormVisible = false;"
          >修 改</el-button>
        </div>
      </el-dialog>
    </div>
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
        style="position: absolute;top: -5px;right: 10%;"
        type="primary"
        @click="pro_create=true;dialogFormVisible = true;form={}"
      >添加商品</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "alack",
  data() {
    return {
      mtotal: 0,
      pageNum: "",
      pageSize: "",
      categoryId: "",
      productName: "",
      isLack: "",
      queryList: [],
      id: "",
      search: "",
      pro_create: true,
      dialogFormVisible: false,
      form: {
        productCode: "",
        productName: "",
        productStandard: "",
        productSmallUnit: "",
        productSmallPrice: "",
        productLargerUnit: "",
        productLargerPrice: "",
        productCategoryId: "",
        productBrandId: "",
        productPhoto: "",
        productIsSale: "",
        productIsLack: "",
        productStatus: "",
        productOrder: "",
        productLargerStandard: "",
        productSuggestPrice: ""
      },
      copyQueryList: [],
    };
  },
  
  watch: {
    search: function(newVla, oldVla) {
      if (newVla !== oldVla) {
        this.queryList = this.copyQueryList;
      }
    }
  },
  created() {
    this.query();
  },
  methods: {
    // 查询所有商品
    query() {
      this.$axios
        .get("http://127.0.0.1:8080/lanqiao_project/product/list", {
          params: {
            pageNum: 1,
            pageSize: 8,
            categoryId: "",
            productName: "",
            isLack: ""
          }
        })
        .then(respose => {
          // console.log(JSON.stringify(respose));
          let result = respose.data;
          this.mtotal = respose.data.data.total;
          if (result.status == "200") {
            this.queryList = result.data.list;
            this.copyQueryList = this.queryList;
          }
        })
        .catch(error => {
        });
    },
    //缺货设置
    lack(index, row) {
      let self = this;
      this.$axios
        .get("http://127.0.0.1:8080/lanqiao_project/product/lack", {
          params: { id: row.productId }
        })
        .then(response => {
          let result = response.data;
          if (result.status == "200") {
            this.$set(this.queryList[index], "productIsLack", 0);
          }
        })
        .catch(error => {});
    },
    // 重新上货
    nolack(index, row) {
      this.$axios
        .get("http://127.0.0.1:8080/lanqiao_project/product/noLack", {
          params: { id: row.productId }
        })
        .then(response => {
          let result = response.data;
          if (result.status == "200") {
            this.$set(this.queryList[index], "productIsLack", 1);
          }
        })
        .catch(error => {
          alert(error);
        });
    },
    handleCurrentChange(val) {
      this.$axios
        .get("http://127.0.0.1:8080/lanqiao_project/product/list", {
          params: {
            pageNum: val,
            pageSize: 8,
            categoryId: "",
            productName: "",
            isLack: ""
          }
        })
        .then(respose => {
          let result = respose.data;
          if (result.status == "200") {
            this.queryList = result.data.list;
          }
        })
        .catch(error => {
          alert(error);
        });
    },
    // 搜索商品
    proSearch() {
      var self = this;
      var proRegex = /^\w{8}(-\w{4}){3}-\w{12}$/;
      var nameRegex = /^[\u4e00-\u9fa5 | 0-9a-zA-Z]+$/;
      var name = nameRegex.test(self.search) ? self.search : null;
      var proId = proRegex.test(self.search) ? self.search : null;
      var catId = null;
      if (proId != null) {
        this.$axios
          .get("http://127.0.0.1:8080/lanqiao_project/product/find", {
            params: {
              productId: self.search
            }
          })
          .then(response => {
            console.log(JSON.stringify(response));
            let result = response.data;
            if (result.status === "200") {
              
              this.queryList = [result.data || {}];
              if (result.data) {
                catId = "";
              }
              // console.log(JSON.stringify(response));
            }
          })
          .catch(error => {
            alert(error);
          });
      }
      if (name != null || catId != null) {
        this.$axios
          .get("http://127.0.0.1:8080/lanqiao_project/product/list", {
            params: {
              pageNum: 1,
              pageSize: 10,
              categoryId: catId,
              productName: name,
              isLack: ""
            }
          })
          .then(response => {
            let result = response.data;
            console.log(JSON.stringify(response));
            if (result.status == "200") {
              this.queryList = result.data.list;
            }
          })
          
      }
    },
    // 删除商品
    dropproduct(index, row) {
      // console.log(row.productId);
      this.$axios
        .get("http://127.0.0.1:8080/lanqiao_project/product/drop", {
          params: {
            productId: row.productId
          }
        })
        .then(respose => {
          let result = respose.data;
          if (result.status == "200") {
            alert(result.message);
          }
        })
        .catch(error => {
          alert(error);
        });
    },
    // 修改商品
    updateProduct() {
      let params = this.$qs.stringify(this.form);
      this.$axios
        .post("http://127.0.0.1:8080/lanqiao_project/product/update", params)
        .then(respose => {
          // console.log(JSON.stringify(respose));
          let result = respose.data;
          if (result.status == "200") {
            alert(result.message);
          } else if (result.status == "404") {
            this.alert(error);
          }
        })
        .catch(error => {});
    },
    grounding() {
      let params = this.$qs.stringify(this.form);
      this.$axios
        .post("http://127.0.0.1:8080/lanqiao_project/product/add", params)
        .then(respose => {
          // console.log(JSON.stringify(respose));
          var type = respose.data.status === "200" ? "success" : "error";
          this.$message({
            message: respose.data.message,
            type: type
          });
        });
    }
  }
};
</script>
<style scoped>
.lack-dialog {
  height: 90%;
  border-radius: 100px;
}
.el-table {
  left: 50%;
  transform: translateX(-50%);
}
</style>


