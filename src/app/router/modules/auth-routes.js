export default [
    {
        path: '/login',
        component: () => import(/* webpackChunkName: "auth" */ '@/app/views/auth/Login.vue'),
        children: [
            {
                path: '',
                name: 'Login',
                component: () => import(/* webpackChunkName: "auth" */ '@/app/components/auth/AuthTypeSelect'),
            },
            {
                path: 'email',
                name: 'LoginEmail',
                component: () => import(/* webpackChunkName: "auth" */ '@/app/components/auth/AuthLoginEmail'),
            },
            {
                path: 'phone',
                name: 'LoginPhone',
                component: () => import(/* webpackChunkName: "auth" */ '@/app/components/auth/AuthLoginPhone'),
            }
        ]
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "register" */ '@/app/views/auth/Register.vue')
    }
]
