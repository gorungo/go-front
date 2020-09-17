import {
    SET_IDEAS_DATA,
} from '../mutation-types';

import ideaAPI from '@/api/idea'

export default {
    namespaced: true,
    state: {
        ideasData: null,
    },
    actions: {

        async fetchIdeas({commit}){
            return new Promise( (resolve, reject) => {
                ideaAPI.getIdeas().then( res => {
                    commit(SET_IDEAS_DATA, res.data);
                    resolve(res)
                }).catch( e => {
                    reject(e);
                })
            });

        },

        // save({commit}){
        //
        // },
        //
        // approveIdea({commit}, idea){
        //
        // },
        //
        // refuseIdea({commit}, idea){
        //
        // }
    },
    mutations: {
        [SET_IDEAS_DATA](state, data){
            state.ideasData = data;
        },
    },
    getters: {
        ideas(state){
            if(state.ideasData && state.ideasData.data && state.ideasData.data.length > 0){
                return state.ideasData.data
            }else{
                return [];
            }
        }
    },
}
