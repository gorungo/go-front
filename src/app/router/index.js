import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import AuthRoutes from './modules/auth-routes'
import ErrorRoutes from './modules/error-routes'
import IdeasRoutes from './modules/ideas-routes'
import OfficeRoutes from './modules/office-routes'
import AccountRoutes from './modules/account-routes'
import StaticRoutes from './modules/static-routes'

Vue.use(VueRouter)

  const baseRoutes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
]

const routes = baseRoutes.concat([
  ...AuthRoutes,
  ...ErrorRoutes,
  ...AccountRoutes,
  ...IdeasRoutes,
  ...OfficeRoutes,
  ...StaticRoutes,
])

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router
