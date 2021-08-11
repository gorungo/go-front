export default [
    {
        path: '/office/ideas',
        name: 'OfficeIdeasList',
        component: () => import(/* webpackChunkName: "office" */ '@/app/views/office/PageOfficeIdeasList.vue')
    },
]
