export default [
  {
    path: '/profile',
    component: () => import(/* webpackChunkName: "profile" */ '@/app/components/profile/Profile'),
    children: [
      {
        path: 'main',
        name: 'profileMain',
        component: () => import(/* webpackChunkName: "profile-main" */ '@/app/views/profile/PageProfileMain'),
      },
      {
        path: 'password',
        name: 'profilePassword',
        component: () => import(/* webpackChunkName: "profile-password" */ '@/app/views/profile/PageProfilePassword'),
      },
    ]
  },
]

