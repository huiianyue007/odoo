import Vue from 'vue'
import Router from 'vue-router'
import Index from 'components/index'
import User from 'components/user'
import Custom from 'components/custom'
import Customer from 'components/customer'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/custom',
      name: 'custom',
      component: Custom
    },
    {
      path: '/customer',
      name: 'customer',
      component: Customer
    }
  ]
})
