import {
    SET_PROFILE,
} from '../mutation-types';

import profileAPI from '@/api/profile'

export default {
    namespaced: true,
    state: {
        profile: null,
    },
    actions: {
        fetchProfile({commit, rootState}, params = {}){
            profileAPI.fetchProfile(rootState.App.user.attributes.profile_hid, params).then( res => {
                commit(SET_PROFILE, res.data.data);
            }).catch(() => {
                //
            })
        },
    },
    mutations: {
        [SET_PROFILE](state, profile){
            state.profile = profile;
        },
    },
}
