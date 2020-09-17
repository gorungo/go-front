import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import {currentLocale} from '@/js/locale'

require('./store/subscriber');

import VueI18n from 'vue-i18n'
import messages from "@/localization/messages"

import '@/assets/scss/app.scss'
import 'element-ui/lib/theme-chalk/index.css'


Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: currentLocale(),
  messages
})

Vue.use(ElementUI);
Vue.config.productionTip = false

store.dispatch('App/initialiseStore').then(() => {

  new Vue({
    i18n,
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})


