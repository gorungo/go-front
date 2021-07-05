import {
  SET_PAGE_TITLE,
  SET_IS_MOBILE,
  SET_LOCALE,
  SET_PREV_ROUTE,
} from '../mutation-types'

import {currentLocale} from '@/js/locale'

export default {
  namespaced: true,
  state: {
    locale: null,
    isMobile: false,
    pageTitle: '',
    prevRoute: null,
  },
  actions: {
    async initialiseStore({commit, dispatch}) {
      const locale = currentLocale()
      localStorage.setItem('locale', locale)
      commit(SET_LOCALE, locale)

      await dispatch('Auth/initialiseStore', {},{root:true})
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
  },
  getters: {
   //
  },
}
