<template>
  <div>
    <el-dialog title="商品类别" :visible.sync="content[0].dialogFormVisible">
      <el-form :model="content[0].form">
        <!-- <el-form-item label="类别编号" :label-width="content[0].formLabelWidth">
          <el-input v-model="content[0].form.categoryId" label-width="150px" autocomplete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="类别名称" :label-width="content[0].formLabelWidth">
          <el-input v-model="content[0].form.categoryName" label-width="150px" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类别排序" :label-width="content[0].formLabelWidth">
          <el-input v-model="content[0].form.categoryOrder" label-width="150px" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类别状态" :label-width="content[0].formLabelWidth">
          <el-select v-model="content[0].form.categoryStatus" placeholder="选择商品状态 1 有效 0 无效">
            <el-option label="0" value="0"></el-option>
            <el-option label="1" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="content[0].dialogFormVisible = false">取 消</el-button>
        <el-button
          v-if="content[0].createCat === false"
          type="danger"
          @click="content[0].dialogFormVisible = false;handleCreate(true)"
        >修 改</el-button>
        <el-button
          v-if="content[0].createCat"
          type="primary"
          @click="content[0].dialogFormVisible = false;handleCreate(false)"
        >创 建</el-button>
      </div>
    </el-dialog>
    <h2>商品类别</h2>
    <el-table
      :data="content[0].tableData.filter(data => !content[0].search || data.categoryName.toLowerCase().includes(content[0].search.toLowerCase()))"
      height="500px"
      style="width: 100%"
      :default-sort="{prop: 'date', order: 'descending'}"
    >
      <el-table-column prop="categoryId" align="center" label="类别编号" sortable width="320"></el-table-column>
      <el-table-column prop="categoryName" align="center" label="类别名称" sortable width="150"></el-table-column>
      <el-table-column prop="categoryOrder" align="center" label="类别排序" sortable width="120"></el-table-column>
      <el-table-column prop="categoryStatus" align="center" label="类别状态" sortable width="120"></el-table-column>
      <el-table-column align="center">
        <template slot="header" slot-scope="scope">
          <el-input v-model="content[0].search" size="small" placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button
      type="primary"
      @click="content[0].dialogFormVisible = true;content[0].createCat = true;content[0].form=[]"
    >添加类别</el-button>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      content: [
        {
          createCat: false,
          dialogTableVisible: false,
          dialogFormVisible: false,
          form: {
            categoryId: "",
            categoryName: "",
            categoryStatus: "",
            categoryOrder: 1
          },
          formLabelWidth: "80px",
          tableData: [],
          search: ""
        }
      ]
    };
  },
  created: function() {
    this.init();
  },
  methods: {
    handleEdit(index, row) {
      this.content[0].dialogFormVisible = true;
      this.content[0].createCat = false;
      this.content[0].form = row;
    },
    handleDelete(index, row) {
      this.$axios
        .get("http://127.0.0.1:8080/lanqiao_project/category/delById", {
          params: {
            categoryId: row.categoryId
          }
        })
        .then(response => {
          if (response.data.status === "200") {
            this.content[0].tableData.splice(index, 1);
            this.$message({
              message: "删除成功",
              type: "success"
            });
          } else {
            this.$message({
              message: "修改失败",
              type: "error"
            });
          }
        });
    },
    init() {
      this.$axios
        .get("http://127.0.0.1:8080/lanqiao_project/category/qryList")
        .then(response => {
          this.content[0].tableData = response.data.data;
        });
    },
    handleCreate(updata) {
      var url = updata
        ? "http://127.0.0.1:8080/lanqiao_project/category/update"
        : "http://127.0.0.1:8080/lanqiao_project/category/add";
      console.log(url);
      var params = this.$qs.stringify(this.content[0].form);

      this.$axios.post(url, params).then(response => {
        console.log(JSON.stringify(response));
        if (!updata && response.data.status === "200")
          this.content[0].tableData.push(this.content[0].form);
        var type = response.data.status === "200" ? "success" : "error";
        this.$message({
          message: response.data.message,
          type: type
        });
      });
    }
  }
};
</script>
