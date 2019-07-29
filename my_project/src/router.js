import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import ServerHome from './views/server/ServerHome.vue'
import AdminLogin from '@/views/admin/AdminLogin.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: AdminLogin
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/serve',
      name: 'ServerHome',
      component: ServerHome,
    },
  ]
})
