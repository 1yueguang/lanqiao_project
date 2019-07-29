<template>
  <div>
    <search-view-component @getProInfo='pro_result=$event'></search-view-component>
    <cart-components></cart-components>
    <login-components></login-components>
    <pro-show-components :transmit="pro_result"></pro-show-components>
    <main-pro-view @getProInfo='pro_result=$event'></main-pro-view>
    <user-info-component></user-info-component>
    <order-history-component ></order-history-component>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductShow from "@/components/ProductShow.vue";
import MainProductView from "@/components/MainProductView.vue";
import CartView from "@/components/CartView.vue";
import UserInfoView from "@/components/UserInfo.vue";
import OrderHistory from "@/components/OrderHistory.vue";
import SearchView from '@/components/SearchView.vue'
import Login from "@/components/Login.vue";

export default {
  data: function() {
    return {
      pro_result:{},
    };
  },
  components: {
    'pro-show-components': ProductShow,
    'main-pro-view':MainProductView,
    'cart-components':CartView,
    'user-info-component':UserInfoView,
    'order-history-component':OrderHistory,
    'search-view-component':SearchView,
    'login-components':Login,
  },
  created: function() {
  },
  methods: {
    productInfo: function() {
      this.pageIsHidden = false;
    },
  }
};
</script>
<style>
[v-bloak] {
  display: none;
}
</style>
