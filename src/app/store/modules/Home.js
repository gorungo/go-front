import {
    APPEND_IDEA_SECTION,
} from '../mutation-types';

import ideaAPI from '@/api/idea'

export default {
    namespaced: true,
    state: {
        ideaSections: [],
        loading: false,
    },
    actions: {
        async fetchLineSectionsIdeas({dispatch}, sections = []){
            sections.forEach( section => {
                try {
                    dispatch('fetchLineSectionIdeas', section)
                } catch (e) {
                    //
                }
            })
        },
        async fetchLineSectionIdeas({sectionName, limit}){
            const options = { sectionName, limit }
            return ideaAPI.getIdeas(options);
        }

    },
    mutations: {
        [APPEND_IDEA_SECTION](state, sectionVsData){
            state.ideaSections = [...state.ideaSections, sectionVsData];
        },
    },
    getters: {
        //
    },
}
