import {SET_CATEGORIES, SET_ACTIVE_CATEGORY} from '../mutation-types';

import categoryAPI from '@/api/category'


export default {
  namespaced: true,
  state: {
    categories: [],
    activeCategory: null,
  },
  actions: {
    async fetchCategories({commit}, options = {}) {
      return categoryAPI.getCategories(options).then( res => {
        commit(SET_CATEGORIES, res.data.data)
      })
    },

    setActiveCategory({commit}, category){
      commit(SET_ACTIVE_CATEGORY, category)
    },

    setActiveCategoryById({commit, state}, categoryId){
      const category = state.categories.find(item => {
        return item.id === categoryId
      })
      commit(SET_ACTIVE_CATEGORY, category ?? null)
    }
  },
  mutations: {
    [SET_CATEGORIES](state, categories) {
      state.categories = categories;
    },
    [SET_ACTIVE_CATEGORY](state, category) {
      state.activeCategory = category;
    },
  },
  getters: {
    //
  },
}
