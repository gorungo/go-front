import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import authRoutes from './modules/auth-routes'
import errorRoutes from './modules/error-routes'
import ideasRoutes from './modules/ideas-routes'
import officeRoutes from './modules/office-routes'
import accountRoutes from './modules/account-routes'

Vue.use(VueRouter)

  const baseRoutes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
]

const routes = baseRoutes.concat([
  ...authRoutes,
  ...errorRoutes,
  ...accountRoutes,
  ...ideasRoutes,
  ...officeRoutes,
])

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router
