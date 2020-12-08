import {
    SET_IDEA,
    SET_LOADING
} from '../mutation-types';

import ideaAPI from '@/api/idea'

export default {
    namespaced: true,
    state: {
        idea: null,
        loading: false,
    },
    actions: {
        async fetchIdea({commit}, ideaHid, options = {}){
            return new Promise( (resolve, reject) => {
                commit(SET_LOADING, true)
                ideaAPI.getIdea(ideaHid, options).then( res => {
                    commit(SET_IDEA, res.data.data)
                    commit(SET_LOADING, false)
                    resolve(res)
                }).catch( e => {
                    commit(SET_LOADING, false)
                    reject(e)
                })
            });
        },
        clearIdea({commit}){
            commit(SET_IDEA, null)
        }
    },
    mutations: {
        [SET_IDEA](state, data){
            state.idea = data;
        },

        [SET_LOADING](state, data){
            state.loading = data;
        },
    },
    getters: {
        //
    },
}
