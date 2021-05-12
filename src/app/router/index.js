import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import authRoutes from './modules/auth-routes'
import errorRoutes from './modules/error-routes'
import ideasRoutes from './modules/ideas-routes'
import officeRoutes from './modules/office-routes'
import accountRoutes from './modules/account-routes'
import staticRoutes from './modules/static-routes'

Vue.use(VueRouter)

  const baseRoutes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
]

const routes = baseRoutes.concat([
  ...authRoutes,
  ...errorRoutes,
  ...accountRoutes,
  ...ideasRoutes,
  ...officeRoutes,
  ...staticRoutes,
])

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router
