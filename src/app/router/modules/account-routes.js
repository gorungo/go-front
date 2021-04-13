export default [
  {
    path: '/account',
    name: 'account',
    component: () => import(/* webpackChunkName: "account" */ '@/app/components/account/Account'),
    children: [
      {
        path: 'main',
        name: 'accountMain',
        component: () => import(/* webpackChunkName: "account-main" */ '@/app/views/account/PageMain'),
      },
      {
        path: 'password',
        name: 'accountPassword',
        component: () => import(/* webpackChunkName: "account-password" */ '@/app/views/account/PagePassword'),
      },
    ]
  },
]

