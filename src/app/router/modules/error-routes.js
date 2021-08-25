export default [
  {
    path: '/404',
    name: 's404',
    component: () => import(/* webpackChunkName: "e-404-page" */ '@/app/views/error/E404Page.vue'),
  }, {
    path: '*',
    name: 'e404',
    redirect: '/404'
  }
]
