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
        async fetchLineSectionIdeas({commit}, section){
            const options = { sectionName: section.name, limit: section.limit }
            return ideaAPI.getIdeas(options).then( res => {
                commit(APPEND_IDEA_SECTION, {section: section, data: res.data.data})
            }).catch((e) => {
                if (process.env.NODE_ENV === 'development') {
                    console.log(e);
                }
            });
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
