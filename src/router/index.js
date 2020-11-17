import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter (to, from, next) {
      store.dispatch('Filters/setFilters', to.query)
      next()
    },
  },
  {
    path: '/ideas',
    name: 'IdeaList',
    beforeEnter (to, from, next) {
      store.dispatch('Filters/setFilters', to.query)
      next()
    },
    component: () => import(/* webpackChunkName: "idea-list" */ '../views/idea/PageIdeaList.vue')
  },
  {
    path: '/ideas/:ideaHid',
    name: 'IdeaDetails',
    component: () => import(/* webpackChunkName: "idea-details" */ '../views/idea/PageIdeaDetails.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import(/* webpackChunkName: "about" */ '../views/SignIn.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router
