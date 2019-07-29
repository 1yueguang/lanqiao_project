<template>
  <div :class="item.categoryName" :id="item.categoryId">
    <div class="box-hd">
      <h2>{{item.categoryName}}</h2>
    </div>
    <div class="product-show">
      <ul >
        <pro-list-component v-for="i of sub_list" :key="i.productId" :item="i"></pro-list-component>
      </ul>
    </div>
    <div class="page-nav">
      <div class="page-num">
        <input type="text" v-model="page_num">
        <div class="sel-page">
          <a @click="changePage(0)" class="shift">Go</a>
        </div>
      </div>
      <div class="sel-page">
        <a @click="changePage(-1)" class="pre-page">上一页</a>
        <a @click="changePage(1)" class="next-page">下一页</a>
      </div>
    </div>
  </div>
</template>
<script>
import CatViewContent from "@/components/main_view/CatViewContent.vue";
import axios from "axios";
export default {
  data: function() {
    return {
      page_num: 1,
      sub_list: []
    };
  },
  components: {
    "pro-list-component": CatViewContent
  },
  props: ["item"],
  created: function() {
    this.productShow(this.item.categoryId);
  },
  methods: {
    productShow: function(cat_id) {
      axios
        .get("http://127.0.0.1:8080/lanqiao_project/api/product/selectByCatrgory", {
          params: {
            categoryId: cat_id,
            pageNum: this.page_num,
            pageSize: 15
          }
        })
        .then(response => {
          // console.log(JSON.stringify(response));
          this.sub_list = response.data.data.list;
        });
    },
    changePage: function(num) {
      
      if (this.page_num > 1 || num >= 0) {
        this.page_num =Number.parseInt(this.page_num)+num;
        this.productShow(this.item.categoryId);
      }
    }
  }
};
</script>
