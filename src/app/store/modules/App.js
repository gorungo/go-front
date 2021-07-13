import {
  SET_PAGE_TITLE,
  SET_IS_MOBILE,
  SET_LOCALE,
  SET_PREV_ROUTE,
  SET_CONFIG,
} from '../mutation-types'

import {currentLocale} from '@/js/locale'
import {getAppConfig} from "@/api/config";
import Logger from "@/js/Logger";

export default {
  namespaced: true,
  state: {
    // app config
    config: {},
    // app locale
    locale: null,
    // mobile mode
    isMobile: false,
    // app page title
    pageTitle: '',
    // app previews route
    prevRoute: null,
  },
  actions: {
    async initialiseStore({commit, dispatch}) {
      const locale = currentLocale()
      localStorage.setItem('locale', locale)
      commit(SET_LOCALE, locale)

      try {
        await dispatch('getConfig')
        await dispatch('Auth/initialiseStore', {},{root:true})
      } catch (e) {
        Logger.log(e)
      }
    },

    setLocale({commit}, locale) {
      commit(SET_LOCALE, locale)
    },

    setPageTitle({commit}, title){
      commit(SET_PAGE_TITLE, title)
    },

    setIsMobile({commit}, isMobile) {
      commit(SET_IS_MOBILE, isMobile)
    },

    setPrevRoute({commit}, route) {
      commit(SET_PREV_ROUTE, route)
    },

    async getConfig({commit}) {
      await getAppConfig().then( res => {
        commit(SET_CONFIG, res.data.config)
      })

    },

  },
  mutations: {

    [SET_LOCALE](state, locale) {
      state.locale = locale
    },
    [SET_IS_MOBILE](state, isMobile) {
      state.isMobile = isMobile
    },
    [SET_PAGE_TITLE](state, title) {
      state.pageTitle = title
      document.title = title
    },
    [SET_PREV_ROUTE](state, route) {
      state.prevRoute = route
    },
    [SET_CONFIG](state, config) {
      state.config = config
    },
  },
  getters: {
   //
  },
}
