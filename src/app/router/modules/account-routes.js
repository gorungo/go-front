export default [
  {
    path: '/account',
    name: 'Account',
    component: () => import(/* webpackChunkName: "account" */ '@/app/components/account/Account'),
    children: [
      {
        path: 'main',
        name: 'AccountMain',
        component: () => import(/* webpackChunkName: "account-main" */ '@/app/views/account/PageMain'),
      },
      {
        path: 'password',
        name: 'AccountPassword',
        component: () => import(/* webpackChunkName: "account-password" */ '@/app/views/account/PagePassword'),
      },
    ]
  },
]

