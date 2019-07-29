<template>
  <div id="main-content">
    <div class="list-nav">
      <ul>
        <li v-for="item in nav_lists" :key="item.categoryId">
          <a
            @click="srcollToNow($event)"
            v-if="item.categoryOrder"
            :name="item.categoryId"
          >{{item.categoryName}}</a>
        </li>
      </ul>
    </div>
    <div
      class="main-container"
      @click="$emit('getProInfo',getResult($event))"
      v-for="item in nav_lists"
      :key="item.categoryId"
    >
      <pro-view-component v-if="item.categoryOrder" :item="item"></pro-view-component>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Vue from "vue";
import CategoryProView from "@/components/main_view/CategoryProView";

export default {
  data: function() {
    return {
      nav_lists: []
    };
  },
  components: {
    "pro-view-component": CategoryProView
  },
  created: function() {
    this.init();
  },
  methods: {
    init: function() {
      axios
        .get("http://127.0.0.1:8080/lanqiao_project/api/category/list")
        .then(response => {
          JSON.stringify(response);
          this.nav_lists = response.data.data;
        });
    },
    srcollToNow: function(e) {
      document
        .getElementById(e.target.getAttribute("name"))
        .scrollIntoView(true);
    },
    getResult: function(e) {
      var result = {
        hidden: true,
        pro_id: ""
      };
      result.hidden = e.target.parentNode.getAttribute("class") === "need" ? false : true;
      result.pro_id = e.target.parentNode.id;
      console.log(result);
      return result;
    }
  }
};
</script>
<style>
* {
  user-select: none;
}
p {
  margin: 0;
}
body {
  background: #eeeeee;
  margin: 0;
  padding: 0;
}

div {
  box-sizing: border-box;
}

.header {
  height: 200px;
}

.main-container {
  width: 1226px;
  padding: 20px;
  position: relative;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 100px;
  background: #fff;
}

ul li {
  list-style-type: none;
}

a {
  text-decoration: none;
}

a:hover {
  cursor: pointer;
}

.list-nav {
  position: fixed;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  background: white;
  width: 145px;
  box-shadow: 0 0 15px -5px black;
  padding: 5px;
  border-radius: 20px;
  z-index: 10;
  clear: both;
}

.list-nav ul {
  padding: 0;
}

.list-nav ul li {
  margin-bottom: 15px;
  text-align: center;
}

.list-nav ul li a {
  color: white;
  display: block;
  font-size: 18px;
  font-weight: 600;
  text-shadow: 1px 1px 10px black;
  transition: all 0.3s ease;
}

.list-nav ul li a:hover {
  color: greenyellow;
  transform: scale(1.2);
}

.box-hd {
  position: relative;
  width: 100%;
  height: 50px;
  margin-bottom: 50px;
}

.box-hd h2 {
  font-size: 20px;
  font-weight: 400;
  height: 55px;
  line-height: 55px;
  color: black;
  text-align: left;
}

.product-show ul {
  height: 950px;
  margin-bottom: 30px;
  padding: 5px;
}

.brick-item {
  position: relative;
  float: left;
  width: 200px;
  padding: 5px;
  margin-left: 30px;
  margin-bottom: 14px;
  background: white;
  padding: 0;
  transition: all 0.2s linear;
  box-shadow: 1px 1px 20px -5px black;
  border-radius: 10px;
  text-align: center;
}

.figure {
  width: 100%;
  padding: 18px 0 10px 0;
  margin: 0;
  text-align: center;
}

.figure img {
  margin-top: 10px;
  height: 140px;
  width: 150px;
  border-radius: 10px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  display: block;
}

.title {
  margin: 5px 0;
  width: 100%;
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.price {
  margin: 10px 0;
  text-align: center;
  color: #ff6700;
  font-size: 20px;
}

.flag {
  position: absolute;
  top: 0;
  left: 50%;
  z-index: 2;
  width: 64px;
  height: 20px;
  margin-left: -32px;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  color: #fff;
}

.flag-new {
  background-color: red;
  z-index: 5;
}

.brick-item .need {
  width: 100%;
  background: greenyellow;
  margin-top: 10px;
  text-align: center;
  height: 35px;
  line-height: 35px;
  border-radius: 10px;
  box-shadow: 0px 0px 5px -2px black;
}

.brick-item .need a {
  color: #fff;
  cursor: pointer;
}

.brick-item .need a:hover {
  color: #ff6700;
}

.page-nav {
  width: auto;
  position: relative;
  margin-bottom: 80px;
}

.page-num {
  float: left;
}

.page-num input {
  border: none;
  background: #eeeeee;
  width: 50px;
  height: 30px;
  text-align: center;
  border-radius: 10px;
  outline: none;
  margin-right: 20px;
  color: red;
  font-size: 22px;
  font-weight: bold;
}

.sel-page {
  float: right;
}

.sel-page a {
  display: inline-block;
  width: 80px;
  line-height: 30px;
  height: 30px;
  background: #eeeeee;
  text-align: center;
  border-radius: 10%;
  margin-right: 20px;
  color: black;
}

.sel-page a:hover {
  cursor: pointer;
  background: black;
  color: white;
}

.hidden_list {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  padding: 5px;
  background: white;
  transform: rotateY(-180deg);
  z-index: 10;
}
</style>

