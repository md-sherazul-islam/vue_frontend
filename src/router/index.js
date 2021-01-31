import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue')

  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  // {
  //   path: '/login',
  //   name: '/Login',
  //   component: () => import('../views/Login.vue')
  // },
  {
    path: '/products',
    name: 'Products',
    component: () => import('../views/Products.vue'),
    beforeEnter: (to, from, next) => {
      if(store.getters['auth/authenticated'] == null){
        return next({
          name: 'Login'
        })
      }
      console.log(store.getters)

      next()
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
