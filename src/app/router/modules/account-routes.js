export default [
  {
    path: '/account',
    name: 'Account',
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: "account" */ '@/app/components/account/Account'),
    children: [
      {
        path: 'main',
        name: 'AccountMain',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "account" */ '@/app/views/account/PageMain'),
      },
      {
        path: 'booking-info',
        name: 'AccountBookingInfo',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "account" */ '@/app/views/account/PageBookingInfo'),
      },
      {
        path: 'password',
        name: 'AccountPassword',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "account" */ '@/app/views/account/PagePassword'),
      },
    ]
  },
]

