export default [
    {
        path: '/signin',
        name: 'SignIn',
        component: () => import(/* webpackChunkName: "about" */ '@/app/views/SignIn.vue')
    }
]
