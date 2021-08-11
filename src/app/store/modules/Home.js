import {
    ADD_SECTIONS_DATA,
} from '../mutation-types';

import ideaAPI from '@/api/idea'
import Logger from "@/js/Logger";

export default {
    namespaced: true,
    state: {
        sectionsData: {},
        loading: false,
        sections: [
            {
                section_name: 'nearby', limit: 7, simple_resource: 1
            },
            {
                section_name: 'nature', limit: 7, simple_resource: 1, category_id: 2,
            },
            {
                section_name: 'art', limit: 7, simple_resource: 1, category_id: 7,
            }
        ]
    },
    actions: {
        async initializeStore({dispatch}){
            dispatch('fetchLineSectionsIdeas')
        },

        async fetchLineSectionsIdeas({dispatch, commit, state}){

            state.sections.forEach( section => {
                const options = JSON.parse(JSON.stringify(section))
                dispatch('fetchLineSectionIdeas', options).then(res => {
                    if(res){
                        commit(ADD_SECTIONS_DATA, {
                            [section.section_name]: {
                                data: res.data.data
                            },
                        })
                    }
                }).catch( () => {
                })
            })
        },
        async fetchLineSectionIdeas({}, options){
            return ideaAPI.getIdeas(options)
        }

    },
    mutations: {
        [ADD_SECTIONS_DATA](state, sectionData){
            state.sectionsData = {
                ...state.sectionsData,
                ...sectionData
            };
        },
    },
    getters: {
        //
    },
}
