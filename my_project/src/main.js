import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import Login from '@/components/Login.vue'

import ElementUI from "element-ui"
import axios from "axios";
import qs from 'qs'

axios.defaults.withCredentials = true;
Vue.use(ElementUI);
import 'element-ui/lib/theme-chalk/index.css'
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;
Vue.config.productionTip = false
// Vue.component("login-components", Login);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
