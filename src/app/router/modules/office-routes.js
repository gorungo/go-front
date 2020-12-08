export default [
    {
        path: '/ideas',
        name: 'IdeaList',
        component: () => import(/* webpackChunkName: "idea-list" */ '@/app/views/idea/PageIdeaList.vue')
    },
    {
        path: '/ideas/:ideaHid',
        name: 'IdeaDetails',
        component: () => import(/* webpackChunkName: "idea-details" */ '@/app/views/idea/PageIdeaDetails.vue')
    },
]
