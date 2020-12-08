import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/editor/idea/:id/title',
    name: 'EditorIdeaTitlePage',
    component: () => import(/* webpackChunkName: "editor-idea-title-page" */ '../views/idea/IETitlePage.vue'),
  },
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router
