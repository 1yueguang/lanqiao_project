<template>
  <div>
    <div class="search-box">
      <input type="text" class="search-txt" v-model="search_txt" placeholder="Search...">
      <a href="#" @mousedown="startSearch" class="search"></a>
    </div>
    <div style="position:relative;">
      <div id="search-exit" @click="exit_view = true" v-show="!exit_view">
        <i class="el-icon-close"></i>
      </div>

      <div id="search-view" @click="$emit('getProInfo',getResult($event))"  v-show="!exit_view">
        <div class="product-show">
          <ul>
            <pro-list-component v-for="i of list" :key="i.productId" :item="i"></pro-list-component>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CatViewContent from "@/components/main_view/CatViewContent.vue";

export default {
  data: function() {
    return {
      exit_view: true,
      search_txt: "",
      list: {}
    };
  },
  components: {
    "pro-list-component": CatViewContent
  },
  methods: {
    startSearch: function() {
      var self = this;
      console.log(this.search_txt);
      if (this.search_txt !== "") {
        this.exit_view = false;
        this.$axios
          .get("http://127.0.0.1:8080/lanqiao_project/api/product/search", {
            params: {
              name: self.search_txt
            }
          })
          .then(repsonse => {
            this.list = repsonse.data.data;
            this.search_txt = "";
          });
      }
    },
    changePage: function(num) {
      if (this.page_num > 1 || num >= 0) {
        this.page_num = Number.parseInt(this.page_num) + num;
        this.productShow(this.item.categoryId);
      }
    },
    getResult: function(e) {
      var result = {
        hidden: true,
        pro_id: ""
      };
      result.hidden =
        e.target.parentNode.getAttribute("class") === "need" ? false : true;
      result.pro_id = e.target.parentNode.id;
      console.log(result);
      return result;
    }
  }
};
</script>
<style scoped>
.search-box {
  position: fixed;
  top: 5%;
  right: 3%;
  width: 55px;
  height: 35px;
  z-index: 10;
}
.search-txt {
  position: absolute;
  top: 0;
  right: 0;
  height: 35px;
  width: 55px;
  border: none;
  outline: none;
  background: white;
  box-shadow: 0 0 20px black, 0 0 20px -5px black;
  color: #000;
  transition: all 0.5s linear;
  border-radius: 35px;
  padding: 0 20px 0 20px;
  z-index: 5;
  opacity: 0;
}

.search-box input:focus {
  width: 150px;
  opacity: 1;
}
.search-box input:focus ~ .search {
  z-index: 999;
  background: black;
}
.search {
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 55px;
  height: 55px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.5);
  transition: all 0.5s linear;
}
::placeholder {
  color: black;
}
.search::before {
  content: "";
  width: 10px;
  height: 2px;
  position: absolute;
  top: 66%;
  left: 58%;
  background: black;
  transform: rotate(45deg);
  transition: all 0.5s ease;
}
.search::after {
  content: "";
  width: 20px;
  height: 20px;
  position: absolute;
  border-radius: 20px;
  border: 2px solid black;
  top: 25%;
  left: 25%;
  transition: all 0.5s ease;
}

.search-box input:focus ~ .search::before {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  width: 25px;
  background: white;
}

.search-box input:focus ~ .search::after {
  top: 50%;
  left: 50%;
  width: 25px;
  height: 2px;
  border: none;
  background: white;
  border-radius: 0%;
  transform: translate(-50%, -50%) rotate(-45deg);
}
#search-view {
  position: fixed;
  width: 960px;
  height:600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #48D1CC;
  border-radius: 10px;
  overflow-y: scroll;
  z-index: 10;
}
#search-exit {
  position: fixed;
  top: 4%;
  right: 290px;
  z-index: 10;
  font-size: 25px;
  color: white;
  width: 30px;
  height: 30px;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
}
.el-icon-close::before {
  line-height: 30px;
  height: 30px;
}
#search-exit i:hover {
  cursor: pointer;
}
</style>

