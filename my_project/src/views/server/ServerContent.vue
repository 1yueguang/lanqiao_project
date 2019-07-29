<template>
  <div id="server-content">
    <div class="server-main-content" v-if="sel===1">
      <category-content></category-content>
    </div>
    <div class="serve-main-content" v-if="sel===2">
      <order-main-content></order-main-content>
    </div>
    <div class="serve-main-content" v-if="sel===3">
      <lack-content></lack-content>
    </div>
    <div class="serve-main-content" v-if="sel===4">
      <user-content></user-content>
    </div>
    
  </div>
</template>
,<script>
import orderMain from "@/views/adminorder/orderMain.vue";
import Lack from "@/views/adminproduct/Lack.vue";
import MainTable from "@/views/admin/MainTable.vue";
import CategoryDetails from "@/views/server/CategoryDetails.vue";
export default {
  
  components: {
    "order-main-content": orderMain,
    "lack-content": Lack,
    "user-content":MainTable,
    "category-content":CategoryDetails,
  },
  props: ["sel"],
  
};
</script>
<style>

#server-content {
  width: 100%;
  height: 100%;
  padding: 30px;
}
.server-main-content {
  width: 70%;
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translateX(-50%);

  text-align: right;
}
.el-table {
  margin-bottom: 20px;
  text-align: center !important;
  border-radius: 15px;
}

.el-dialog {
  text-align: left;
  background: #00fa9a !important;
}
.v-modal {
  z-index: -1 !important;
}
h2 {
  text-align: center;
  color: white;
}
/* .el-form {
  position: absolute;
  top: 60%;
  left: 50%;
  z-index: 10;
  transform: translate(-50%, -50%);
  background: greenyellow;
  text-align: left;
} */
::-webkit-scrollbar {
  width: 0px;
  background-color: aqua;
}

/* 滚动槽 */
::-webkit-scrollbar-track {
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
}
</style>

