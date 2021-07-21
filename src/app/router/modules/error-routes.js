export default [
  {
        path: '*',
        component: () => import(/* webpackChunkName: "e-404-page" */ '@/app/views/error/E404Page.vue'),
        name: 'e404',
    }
]
