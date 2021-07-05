export default [
    {
        path: '/login',
        component: () => import(/* webpackChunkName: "login" */ '@/app/views/auth/Login.vue'),
        children: [
            {
                path: '',
                name: 'Login',
                component: () => import(/* webpackChunkName: "account-main" */ '@/app/components/auth/AuthTypeSelect'),
            },
            {
                path: 'email',
                name: 'LoginEmail',
                component: () => import(/* webpackChunkName: "account-main" */ '@/app/components/auth/AuthLoginEmail'),
            },
            {
                path: 'phone',
                name: 'LoginPhone',
                component: () => import(/* webpackChunkName: "account-main" */ '@/app/components/auth/AuthLoginPhone'),
            }
        ]
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "register" */ '@/app/views/auth/Register.vue')
    }
]
