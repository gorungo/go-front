import {
    SET_USER,
    SET_TOKEN,
    SET_LOCALE,
    SET_ACTIVE_PLACE,
    SET_GPS_POSITION,
    SET_IS_MOBILE
} from '../mutation-types'

import {currentLocale} from '@/js/locale'
import {getPlace, savePlace} from "@/api/osm";
import {login, logout, me} from "@/api/auth";
import {setUserPassword} from "@/api/account";

export default {
    namespaced: true,
    state: {
        // authorised user
        user: null,
        token: null,
        locale: null,
        activePlace: null,
        locationMode: 'nearby',
        gpsPosition: null,
        isMobile: false,
    },
    actions: {
        async initialiseStore({dispatch, commit, state}) {

            // set locale
            const locale = currentLocale()
            localStorage.setItem('locale', locale)
            commit(SET_LOCALE, locale)

            // check token
            if(localStorage.getItem('token')){
                await dispatch('attempt', localStorage.getItem('token'))
            }
            if(state.token){
                await dispatch('attempt', state.token)
            }

            // gps position
            if(localStorage.getItem('gpsPosition')){
                dispatch('setGpsPosition', JSON.parse(localStorage.getItem('gpsPosition')))
            }
        },

        setUser({commit}, user){
            commit(SET_USER, user);
        },

        setLocale({commit}, locale){
            commit(SET_LOCALE, locale)
        },

        setActivePlace({commit}, place){
            if(place !== null){
                savePlace(place)
            }
            commit(SET_ACTIVE_PLACE, place)
        },

        initialiseActivePlace({dispatch, state}, place_id){
            if(!state.activePlace){
                if(place_id){
                    getPlace(place_id).then( resp => {
                        dispatch('setActivePlace', resp.data)
                    })
                }else{
                    dispatch('setActivePlace', null)
                }
            }
        },

        setGpsPosition({commit}, gpsPosition){
            commit(SET_GPS_POSITION, gpsPosition)
        },

        async signIn({dispatch}, credentials){
            let resp = await login(credentials)
            return dispatch('attempt', resp.data.token)
        },

        async attempt({commit, state}, token){
            if(token){
                commit(SET_TOKEN, token)
            }

            if(state.token){
                try{
                    let resp = await me()
                    commit(SET_USER, resp.data)
                    return true
                }catch(e){
                    commit(SET_USER, null)
                    commit(SET_TOKEN, null)
                    return false
                }
            }
        },

        async logout({commit}, credentials){
            await logout(credentials)
            commit(SET_USER, null)
            commit(SET_TOKEN, null)
        },

        setUserPassword({state}, {oldPassword, password, passwordConfirm}){
            return setUserPassword(state.user.id, {oldPassword, password, passwordConfirm})
        },

        setIsMobile({commit}, isMobile){
            commit(SET_IS_MOBILE, isMobile)
        },


    },
    mutations: {
        [SET_USER](state, user){
            state.user = user
        },
        [SET_TOKEN](state, token){
            state.token = token
        },
        [SET_LOCALE](state, locale){
            state.locale = locale
        },
        [SET_ACTIVE_PLACE](state, place){
            state.activePlace = place
        },
        [SET_ACTIVE_PLACE](state, place){
            state.activePlace = place
        },
        [SET_GPS_POSITION](state, gpsPosition){
            state.gpsPosition = gpsPosition
        },
        [SET_IS_MOBILE](state, isMobile){
            state.isMobile = isMobile
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
