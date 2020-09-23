import {
    SET_USER,
    SET_TOKEN,
    SET_LOCALE,
} from '../mutation-types'

import axios from '@/axios'
import {currentLocale} from '@/js/locale'


export default {
    namespaced: true,
    state: {
        // authorised user
        user: null,
        token: null,
        locale: null,
    },
    actions: {
        initialiseStore({dispatch, commit, state}) {

            // set locale
            const locale = currentLocale()
            localStorage.setItem('locale', locale)
            commit(SET_LOCALE, locale)

            // check token
            if(localStorage.getItem('token')){
                dispatch('attempt', localStorage.getItem('token'))
            }
            if(state.token){
                dispatch('attempt', state.token)
            }
        },

        setUser({commit}, user){
            commit(SET_USER, user);
        },

        setLocale({commit}, locale){
            commit(SET_LOCALE, locale);
        },

        async signIn({dispatch}, credentials){
            let resp = await axios.post('auth/login', credentials);
            return dispatch('attempt', resp.data.token);
        },

        async attempt({commit, state}, token){
            if(token){
                commit(SET_TOKEN, token);
            }

            if(state.token){
                try{
                    let resp = await axios.post('auth/me');
                    commit(SET_USER, resp.data);
                }catch(e){
                    commit(SET_USER, null);
                    commit(SET_TOKEN, null);
                }
            }
        }

    },
    mutations: {
        [SET_USER](state, user){
            state.user = user;
        },
        [SET_TOKEN](state, token){
            state.token = token;
        },
        [SET_LOCALE](state, locale){
            state.locale = locale;
        },
    },
    getters: {
        authenticated(state){
            return state.user !== null && state.token !== null;
        },
        user(state){
            return state.user;
        },
        apiVersion(state){
            return state.apiVersion;
        },

    },
}
