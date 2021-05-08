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
        path: 'booking-info',
        name: 'AccountBookingInfo',
        component: () => import(/* webpackChunkName: "account-booking-info" */ '@/app/views/account/PageBookingInfo'),
      },
      {
        path: 'password',
        name: 'AccountPassword',
        component: () => import(/* webpackChunkName: "account-password" */ '@/app/views/account/PagePassword'),
      },
    ]
  },
]

