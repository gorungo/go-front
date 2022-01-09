import {
    ADD_SECTIONS_DATA,
    SET_LOADING,
} from '../mutation-types';

import ideaAPI from '@/api/idea'

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
            if(state.loading) return
            commit(SET_LOADING, true)

            return new Promise((resolve, reject) => {
                state.sections.forEach( async section => {
                    const options = JSON.parse(JSON.stringify(section))
                    await dispatch('fetchLineSectionIdeas', options).then(res => {
                        if(res){
                            commit(ADD_SECTIONS_DATA, {
                                [section.section_name]: {
                                    data: res.data.data
                                },
                            })
                        }
                    }).catch( () => {
                    }).finally(() => {
                        resolve()
                        commit(SET_LOADING, false)
                    })
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
        [SET_LOADING](state, loading){
            state.loading = loading
        }
    },
    getters: {
        //
    },
}
