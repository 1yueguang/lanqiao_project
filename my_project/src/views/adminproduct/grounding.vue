<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="产品序列号">
        <el-input v-model="form.productCode"></el-input>
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input v-model="form.productName"></el-input>
      </el-form-item>
      <el-form-item label="规格">
        <el-input v-model="form.productStandard"></el-input>
      </el-form-item>
      <el-form-item label="小单位">
        <el-input v-model="form.productSmallUnit"></el-input>
      </el-form-item>
      <el-form-item label="小单位价格">
        <el-input v-model="form.productSmallPrice"></el-input>
      </el-form-item>
      <el-form-item label="大单位">
        <el-input v-model="form.productLargerUnit"></el-input>
      </el-form-item>
      <el-form-item label="大单位价格">
        <el-input v-model="form.productLargerPrice"></el-input>
      </el-form-item>
      <el-form-item label="类别编号">
        <el-input v-model="form.productCategoryId"></el-input>
      </el-form-item>
      <el-form-item label="品牌或者品牌编号">
        <el-input v-model="form.productBrandId"></el-input>
      </el-form-item>
      <el-form-item label="图片名称">
        <el-input v-model="form.productPhoto"></el-input>
      </el-form-item>
      <el-form-item label="是否在销">
        <el-input v-model="form.productIsSale"></el-input>
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
        name="image-file"
        :on-success="submitPhoto"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <el-form-item>
        <el-button type="primary" @click="grounding()">上架</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "grounding",
  data() {
    return {
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
      }
    };
  },
  methods: {
    grounding() {
      let params = this.$qs.stringify(this.form);
      this.$axios
        .post("http://wxhwg.com:8080/mock/product/add", params)
        .then(respose => {
          console.log(JSON.stringify(respose.data.status));
          console.log(1);
          var type = respose.data.status === "200" ? "success" : "error";
          this.$message({
            message: result.data.message,
            type: type
          });
        })
        .catch(error => {});
    },
    submitPhoto(respose) {
      this.form.productPhoto = respose.data;
      alert(respose.data);
    }
  }
};
</script>
<style scoped>
* {
  margin: 20px;
}
</style>


