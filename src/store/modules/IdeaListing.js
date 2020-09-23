import {
    SET_IDEAS_DATA,
    APPEND_IDEAS,
    SET_LOADING,
    SET_TOTAL_PAGES_COUNT,
    SET_PAGE
} from '../mutation-types';

import ideaAPI from '@/api/idea'

export default {
    namespaced: true,
    state: {
        ideasData: null,
        ideas: [],
        loading: false,
        page: 0,
        totalPagesCount: 0,
    },
    actions: {

        async fetchIdeas({commit}, options = {}){
            return new Promise( (resolve, reject) => {
                commit(SET_LOADING, true)
                ideaAPI.getIdeas(options).then( res => {
                    commit(SET_LOADING, false)
                    resolve(res)
                }).catch( e => {
                    commit(SET_LOADING, false)
                    reject(e)
                })
            });

        },

        async loadAndAppendNextPage({commit, dispatch, state}){
            if (!state.loading && (state.page === 0 || state.page < state.totalPagesCount)) {
                // load next page content
                return dispatch('fetchIdeas',{page: state.page + 1}).then((res) => {
                    commit(APPEND_IDEAS, res.data.data)
                    commit(SET_IDEAS_DATA, res.data)
                    commit(SET_PAGE, state.page + 1)
                    commit(SET_TOTAL_PAGES_COUNT, res.data.meta.total)
                }).catch((e) => {
                    if (process.env.NODE_ENV === 'development') {
                        console.log(e);
                    }
                });
            }
        }

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

        [APPEND_IDEAS](state, data){
            state.ideas = [...state.ideas, ...data];
        },

        [SET_LOADING](state, data){
            state.loading = data;
        },

        [SET_PAGE](state, data){
            state.page = data;
        },

        [SET_TOTAL_PAGES_COUNT](state, data){
            state.totalPagesCount = data;
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
