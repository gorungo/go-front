export default [
    {
        path: '/office/ideas',
        name: 'OfficeIdeasList',
        component: () => import(/* webpackChunkName: "office-ideas-list" */ '@/app/views/office/PageOfficeIdeasList.vue')
    },
]
