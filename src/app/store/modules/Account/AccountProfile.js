import {
    SET_USER_PROFILE,
} from '@/app/store/mutation-types';

import accountAPI from '@/api/account'

export default {
    namespaced: true,
    state: {
        userProfile: null,
    },
    actions: {
        fetchUserProfile({commit, rootState}, params = {}){
            params.include = 'user'
            accountAPI.fetchUserProfile(rootState.Auth.user?.attributes.profile_hid, params).then( res => {
                commit(SET_USER_PROFILE, res.data.data);
            }).catch(() => {
                //
            })
        },
        setUserProfileField({commit, state}, {field, value}){
            let userProfile = {...state.userProfile}
            userProfile.attributes[field] = value
            commit(SET_USER_PROFILE, userProfile)
            return accountAPI.patchProfile(userProfile.hid, userProfile).catch(() => {
                //
            })
        },
        async setActiveUserField({dispatch, rootState}, {field, value}){
            let user = {...rootState.Auth.user}
            user.attributes[field] = value
            await dispatch("App/setUser", user, { root: true })
            accountAPI.patchUser(rootState.Auth.user.hid, rootState.Auth.user).catch(() => {
                //
            })
        },

    },
    mutations: {
        [SET_USER_PROFILE](state, userProfile){
            state.userProfile = userProfile;
        },
    },
}
