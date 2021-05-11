export default [
    {
        path: '/editor/403',
        component: () => import(/* webpackChunkName: "e-403-page" */ '@/app/views/error/E403Page.vue'),
        name: 'e403',
    },
    {
        path: '/editor/404',
        component: () => import(/* webpackChunkName: "e-404-page" */ '@/app/views/error/E404Page.vue'),
        name: 'e404',
    }
]
