import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui'
import {currentLocale} from '@/js/locale'

require('./store/subscriber');

import VueI18n from 'vue-i18n'
import messages from "@/localization/messages"

import '@/assets/scss/app.scss'
import 'element-ui/lib/theme-chalk/index.css'

axios.defaults.baseUrl = window.location.protocol + '//' + window.location.hostname + '/api/v' +  store.state.apiVersion
axios.defaults.headers.common['HTTP_CONTENT_LANGUAGE'] = currentLocale();

store.dispatch('App/initialiseStore').then(() => {
  Vue.use(VueI18n);
  const i18n = new VueI18n({
    locale: store.state.locale,
    messages
  })

  Vue.use(ElementUI);
  Vue.config.productionTip = false

  new Vue({
    i18n,
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})


