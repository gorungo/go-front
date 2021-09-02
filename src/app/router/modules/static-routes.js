export default [
    {
        path: '/info/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../../views/static/AboutPage.vue')
    },
    {
        path: '/info/confidential',
        name: 'Confidential',
        component: () => import(/* webpackChunkName: "confidential" */ '../../views/static/ConfidentialPage.vue')
    },
    {
        path: '/pages/eco-travel-rules',
        name: 'PagesEcoTravelRules',
        component: () => import(/* webpackChunkName: "pages" */ '../../views/static/pages/EcoTravelPage.vue')
    },
]
