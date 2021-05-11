import {
  SET_IS_MOBILE,
  SET_LOCALE,
  SET_TOKEN,
  SET_USER
} from '../mutation-types'

import {currentLocale} from '@/js/locale'
import {register, login, logout, me} from "@/api/auth";
import {setUserPassword} from "@/api/account";

export default {
  namespaced: true,
  state: {
    // authorised user
    user: null,
    token: null,
    locale: null,
    isMobile: false,
  },
  actions: {
    async initialiseStore({dispatch, commit, state}) {

      // set locale
      const locale = currentLocale()
      localStorage.setItem('locale', locale)
      commit(SET_LOCALE, locale)

      // check token
      if (localStorage.getItem('token')) {
        await dispatch('attempt', localStorage.getItem('token'))
      }
      if (state.token) {
        await dispatch('attempt', state.token)
      }
    },

    setUser({commit}, user) {
      commit(SET_USER, user);
    },

    setLocale({commit}, locale) {
      commit(SET_LOCALE, locale)
    },

    async signIn({dispatch}, credentials) {
      let resp = await login(credentials)
      return dispatch('attempt', resp.data.token)
    },

    async register({dispatch}, credentials) {
      let resp = await register(credentials)
      return dispatch('attempt', resp.data.token)
    },

    async attempt({commit, state}, token) {
      if (token) {
        commit(SET_TOKEN, token)
      }

      if (state.token) {
        try {
          let resp = await me()
          commit(SET_USER, resp.data)
          return true
        } catch (e) {
          commit(SET_USER, null)
          commit(SET_TOKEN, null)
          return false
        }
      }
    },

    async logout({commit}, credentials) {
      await logout(credentials)
      commit(SET_USER, null)
      commit(SET_TOKEN, null)
    },

    setUserPassword({state}, {oldPassword, password, passwordConfirm}) {
      return setUserPassword(state.user.id, {oldPassword, password, passwordConfirm})
    },

    setIsMobile({commit}, isMobile) {
      commit(SET_IS_MOBILE, isMobile)
    },
  },
  mutations: {
    [SET_USER](state, user) {
      state.user = user
    },
    [SET_TOKEN](state, token) {
      state.token = token
    },
    [SET_LOCALE](state, locale) {
      state.locale = locale
    },
    [SET_IS_MOBILE](state, isMobile) {
      state.isMobile = isMobile
    },
  },
  getters: {
    authenticated(state) {
      return state.user !== null && state.token !== null;
    },
    user(state) {
      return state.user;
    },
  },
}
