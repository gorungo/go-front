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
        async fetchIdea({commit}, ideaHid, options){
            options = {include: 'futureDates,ideaPrice,ideaItineraries,photos'}
            commit(SET_LOADING, true)
            return ideaAPI.getIdea(ideaHid, options).then( res => {
                    commit(SET_IDEA, res.data.data)
                }).finally( () => {
                    commit(SET_LOADING, false)
                })
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
