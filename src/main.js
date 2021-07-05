import Vue from 'vue'
import App from './app/App.vue'
import VueGtag from "vue-gtag"
import VueMeta from 'vue-meta'
import router from './app/router'
import store from './app/store'
import {currentLocale} from '@/js/locale'
import {handleNewPosition} from "@/js/location"
import {isMobile} from "@/js/go"

import { DropdownMenu, Select, Dialog, Popover, Dropdown, DropdownItem, Notification} from 'element-ui'

Vue.use(Dialog)
Vue.use(Popover)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Select)
Vue.component(Notification.name, Notification)
Vue.prototype.$notify = Notification;

require('./app/store/subscribers')

import VueI18n from 'vue-i18n'
import VueLazyload from 'vue-lazyload'
import messages from "@/localization/messages"

import '@/assets/scss/app.scss'
import 'element-ui/lib/theme-chalk/index.css'
import './registerServiceWorker'

Vue.use(VueGtag, {
  config: { id: process.env.VUE_APP_GOOGLE_ANALYTICS_ID }
}, router)

Vue.use(VueI18n)
Vue.use(VueMeta)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'images/icons/lazy.svg',
  loading: 'images/icons/lazy.svg',
  attempt: 1
})
const i18n = new VueI18n({
  locale: currentLocale(),
  messages
})

//Vue.use(ElementUI);
Vue.config.productionTip = false

let data = {
  isMobile: isMobile()
}


store.dispatch('App/initialiseStore').then(() => {
  Vue.directive('scroll', {
    inserted: function (el, binding) {
      let f = function (evt) {
        if (binding.value(evt, el)) {
          window.removeEventListener('scroll', f)
        }
      }
      window.addEventListener('scroll', f)
    },
    unbind: function (el) {
      document.removeEventListener('click', el.__vueClickOutside__)
      el.__vueClickOutside__ = null
    }
  })

  Vue.directive('click-outside', {
    inserted: function(el, binding, vNode){
      // Provided expression must evaluate to a function.
      if (typeof binding.value !== 'function') {
        const compName = vNode.context.name
        let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`
        if (compName) {
          warn += `Found in component '${compName}'`
        }

        console.warn(warn)
      }
      // Define Handler and cache it on the element
      const bubble = binding.modifiers.bubble
      const handler = (e) => {
        if (bubble || (!el.contains(e.target) && el !== e.target)) {
          binding.value(e)
        }
      }
      el.__vueClickOutside__ = handler

      // add Event Listeners
      document.addEventListener('click', handler)
    }
  })
  window.App = new Vue({
    i18n,
    router,
    store,
    render: h => h(App),
    data

  }).$mount('#app')
}).then( () => {
  store.dispatch('Filters/initialiseStore')
  store.dispatch('App/setIsMobile', isMobile())
  if(isMobile()){
    ScreenOrientation.lock("portrait");
  }
})

let onResize = () => {
  if(window.innerWidth > process.env.VUE_APP_MOBILE_BREAKPOINT){
    data.isMobile = false
    return
  }
  data.isMobile = true
}

window.addEventListener('resize', onResize, true);

navigator.geolocation.watchPosition(handleNewPosition)

router.beforeEach(async(to, from, next) => {

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // этот путь требует авторизации, проверяем залогинен ли
    // пользователь, и если нет, перенаправляем на страницу логина
    if (!store.state.Auth.user) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  }

  await store.dispatch('App/setPrevRoute', from)
  await store.dispatch('Filters/setFilters', to.query)
  await store.dispatch('Filters/initialiseActivePlace', to.query.place_id)

  if(to.name === 'IdeaList'){
    await store.dispatch('IdeaListing/updateIdeas')
  }
  if(to.name === 'Home'){
    await store.dispatch('Filters/setActivePlace', null)
    await store.dispatch('Filters/setFilter', {
      'date_from': null,
      'date_to': null,
      'category_id': null,
    })
    await store.dispatch('CategorySelector/setActiveCategory', null)
  }
  await store.dispatch('App/setPageTitle', 'Gorungo - ' + window.App.$t('titles.Home'))

  next()
});










