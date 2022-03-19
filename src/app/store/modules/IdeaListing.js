import {
  APPEND_IDEAS,
  SET_COVER_SIZE,
  SET_IDEAS,
  SET_IDEAS_DATA,
  SET_LOADING,
  SET_PAGE,
  SET_TOTAL_PAGES_COUNT
} from '../mutation-types';

import ideaAPI from '@/api/idea'
import Logger from "@/js/Logger";


export default {
  namespaced: true,
  state: {
    ideas: [],
    loading: false,
    page: 1,
    totalPagesCount: 1,
    coverSize: {
      height: 350,
      width: 466,
    }
  },
  actions: {

    async fetchIdeas({commit, rootState, state}, params = {}) {
      return new Promise((resolve, reject) => {
        commit(SET_LOADING, true)
        const params = {
          page: 1,
          simple_resource: 1,
          ...rootState.Filters.filters,
          ...params
        }

        ideaAPI.getIdeas(params).then(res => {
          commit(SET_LOADING, false)
          if(res.data.data){
            if(params.page > 1){
              commit(APPEND_IDEAS, res.data.data)
            } else {
              commit(SET_IDEAS, res.data.data)
            }

            if(res.data.meta?.last_page){
              commit(SET_TOTAL_PAGES_COUNT, res.data.meta.last_page)
            }
          }
          resolve(res)
        }).catch(e => {
          commit(SET_LOADING, false)
          reject(e)
        })
      });

    },

    async loadMore({commit, dispatch, state, rootState}) {
      if (!state.loading && (state.page === 0 || state.page < state.totalPagesCount)) {
        // load next page content
        const params = {
          page: state.page + 1,
          simple_resource: 1,
          ...rootState.Filters.filters
        }
        return dispatch('fetchIdeas', params).then((res) => {
          if(res.data.data){
            commit(SET_PAGE, state.page + 1)
          }
          return res.data.data
        }).catch(e => {
          Logger.log(e)
        });
      }
    },

    setCoverSize({commit}, size) {
      commit(SET_COVER_SIZE, size)
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
    [SET_IDEAS_DATA](state, data) {
      state.ideasData = data;
    },

    [APPEND_IDEAS](state, data) {
      state.ideas = [...state.ideas, ...data];
    },

    [SET_IDEAS](state, data) {
      state.ideas = [...data];
    },

    [SET_LOADING](state, data) {
      state.loading = data;
    },

    [SET_PAGE](state, data) {
      state.page = data;
    },

    [SET_TOTAL_PAGES_COUNT](state, data) {
      state.totalPagesCount = data;
    },

    [SET_COVER_SIZE](state, size) {
      state.coverSize = size;
    },
  },
  getters: {
    ideas(state) {
      if (state.ideasData && state.ideasData.data && state.ideasData.data.length > 0) {
        return state.ideasData.data
      } else {
        return [];
      }
    },
    isLastPage(state){
      return state.page >= state.totalPagesCount
    }
  },
}
