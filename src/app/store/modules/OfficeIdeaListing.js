import {
  APPEND_IDEAS,
  SET_IDEAS_DATA,
  SET_LOADING,
  SET_PAGE,
  SET_TOTAL_PAGES_COUNT,
  SET_USER_IDEAS,
} from '../mutation-types';

import ideaAPI from '@/api/idea'


export default {
  namespaced: true,
  state: {
    userIdeas: [],
    loading: false,
    page: 1,
  },
  actions: {

    async fetchUserIdeas({commit, rootState}, options = {}) {
      const user = rootState.App.user
      commit(SET_LOADING, true)
      return ideaAPI.getIdeasOfUser(user.hid, options).then( res => {
        commit(SET_LOADING, false)
        commit(SET_USER_IDEAS, res.data.data)
      }).catch( () => {
        commit(SET_LOADING, false)
      })

    },

    async createEmptyIdea({rootState}, options = {}) {
      return ideaAPI.createAndGetEmptyIdea(rootState.App.user.hid, options)
    },

    async deleteIdea({commit, dispatch}, idea, options = {}) {
      commit(SET_LOADING, true)
      return ideaAPI.deleteIdea(idea.hid, options).then( () => {
        commit(SET_LOADING, false)
        dispatch('fetchUserIdeas')
      }).catch( () => {
        commit(SET_LOADING, false)
      })

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
    [SET_IDEAS_DATA](state, data) {
      state.ideasData = data;
    },

    [APPEND_IDEAS](state, data) {
      state.ideas = [...state.ideas, ...data];
    },

    [SET_USER_IDEAS](state, data) {
      state.userIdeas = data;
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

  },
  getters: {
    ideas(state) {
      if (state.ideasData && state.ideasData.data && state.ideasData.data.length > 0) {
        return state.ideasData.data
      } else {
        return [];
      }
    }
  },
}
