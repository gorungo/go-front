import {
  SET_PAGE_TITLE,
  SET_IS_MOBILE,
  SET_LOCALE,
  SET_TOKEN,
  SET_USER,
  SET_PREV_ROUTE,
  SET_PHONE_VERIFICATION,
} from '../mutation-types'

import {currentLocale} from '@/js/locale'
import {
  register,
  login,
  logout,
  me,
  sendVerificationCode,
  checkVerificationCode,
  getActiveVerification
} from "@/api/auth";
import {setUserPassword} from "@/api/account";

export default {
  namespaced: true,
  state: {
    // authorised user
    user: null,
    token: null,
    locale: null,
    isMobile: false,
    pageTitle: '',
    prevRoute: null,
    // verification info after phone login attempt
    phoneVerification: null,
    // ,phoneVerification: {
    //   id: 2,
    //   attributes: {
    //     attempts: 0,
    //     code: 677030,
    //     exp_date: "2021-06-24 06:43:30"
    //   }
    // },

  },
  actions: {
    async initialiseStore({dispatch, commit, state}) {

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

    async signInByToken({dispatch, commit}, token) {
      return dispatch('attempt', token)
    },

    async register({dispatch}, credentials) {
      let resp = await register(credentials)
      return dispatch('attempt', resp.data.token)
    },

    async attempt({commit, state}, token) {
      if (token) {
        await commit(SET_TOKEN, token)
      }

      if (state.token) {
        try {
          let resp = await me()
          await commit(SET_USER, resp.data)
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

    setPrevRoute({commit}, route) {
      commit(SET_PREV_ROUTE, route)
    },

    async sendVerificationCode({commit}, data){
      return await sendVerificationCode(data).then( res => {
        commit(SET_PHONE_VERIFICATION, res.data.phone_verification)
      })
    },

    clearPhoneVerification({commit}){
      commit(SET_PHONE_VERIFICATION, null)
    },

    checkVerificationCode({commit}, data){
      return checkVerificationCode(data)
    },

    getActiveVerification({commit}, data){
      getActiveVerification(data).then( res => {
        commit(SET_PHONE_VERIFICATION, res.data.phone_verification)
      })
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
    [SET_PAGE_TITLE](state, title) {
      state.pageTitle = title
      document.title = title
    },
    [SET_PREV_ROUTE](state, route) {
      state.prevRoute = route
    },
    [SET_PHONE_VERIFICATION](state, phoneVerification) {
      state.phoneVerification = phoneVerification
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
