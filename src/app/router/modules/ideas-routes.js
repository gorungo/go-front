export default [
    {
        path: '/go',
        name: 'IdeaList',
        component: () => import(/* webpackChunkName: "idea-list" */ '@/app/views/idea/PageIdeaList.vue')
    },
    {
        path: '/go/:ideaHid',
        name: 'IdeaDetails',
        component: () => import(/* webpackChunkName: "idea-details" */ '@/app/views/idea/PageIdeaDetails.vue')
    },

  // old path
    {
        path: '/ideas/:ideaHid',
        redirect: { name: 'IdeaDetails' }
    },

]
