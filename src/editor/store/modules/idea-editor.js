import {
    SET_ITEM,
    SET_ITEM_ID,
    UPDATE_ITEM_ATTRIBUTES_FIELD,
    UPDATE_ITEM_RELATIONSHIPS_FIELD,
    UPDATE_USER_PROFILE_FIELD,
    UPDATE_ITEM_META_FIELD,

    SET_ACTIVE_SECTION,
    ADD_EXPAND_SECTION,
    REMOVE_EXPAND_SECTION,
    SET_SECTION_EXAMPLES,
    SET_SECTIONS,

    SET_HAS_CHANGES,
    SET_LOADING,
    SET_IS_MOBILE,

    SET_PERSONALITIES,
    SET_COMPETENCIES,
    SET_SKILLS,
    SET_USER_COMPANIES,

    SET_INSTITUTES,
    SET_INSTITUTE_COURSES,
    SET_JOB_TYPES,
    SET_PUBLISHED,
    SET_PROGRESS

} from '../mutation-types';


import EditorSections from '../../modules/editor-sections';
import validateFn from '../../modules/validation/idea/validation';

import {sections} from '../../modules/idea-sections'
import ideaApi from '@/api/idea'

export default {
    namespaced: true,
    state: {
        itemId: null,
        item: null,
        itemMetaData: [],
        isRecruiter: false,
        isMobile: false,

        loading: false,
        autoSave: true,
        hasChanges: false,
        errors: {},

        // editor sections
        sections: [],
        expandedSections: [],
        lockNextParentSectionIfNotFilled: true,
        activeSection: null,
        sectionExamples: null,

    },
    actions: {
        // async fetchItem({commit, dispatch, state}){
        //     return ideaApi.getIdea();
        // },

        // async fetchSectionExamples({commit, state}){
        //     return ideaApi.getSectionExamples()
        // },

        // /**
        //  * Save all item
        //  * @returns {Promise<void>}
        //  */
        // async putItem({commit, dispatch, state}){
        //     return ideaApi.putIdea()
        // },
        //
        // async publish({commit, state}){
        //     return ideaApi.publish();
        // },
        //
        // async unPublish({commit, state}){
        //     return ideaApi.unPublish();
        // },

        async getSectionExamples(){
            return ideaApi.getSectionExamples()
        },


        setItemId({commit}, itemId){
            commit(SET_ITEM_ID, itemId);
        },

        setIsMobile({commit}, isMobile){
            commit(SET_IS_MOBILE, isMobile);
        },

        setActiveSection({commit, state}, section){
            if(section){
                const activeSectionParentIndex = EditorSections.getParentSectionIndex(state.sections, section);
                if(activeSectionParentIndex != null && state.sections[activeSectionParentIndex].status !== 'locked'){
                    commit(SET_ACTIVE_SECTION, section);
                }
            }else{
                commit(SET_ACTIVE_SECTION, section);
            }
        },

        setSections({commit}){
            commit(SET_SECTIONS, sections);
        },

        setItemData({commit, dispatch, state}, {sectionSlug, field, value}){
            switch (sectionSlug) {
                case 'active':
                case 'title':
                case 'city':
                    commit(UPDATE_ITEM_ATTRIBUTES_FIELD, {field, value});
                    break;

                case 'competencies':
                case 'photos':
                    commit(UPDATE_ITEM_RELATIONSHIPS_FIELD, {field, value});
                    break;

            }

            commit(SET_SECTIONS, EditorSections.validatedSections(state.sections, state.item, validateFn));
            commit(SET_HAS_CHANGES, true);

            dispatch('setProgress').then(() => {
                dispatch('updatePublished').then(() => {
                    if(state.autoSave){
                        // save to server
                        dispatch('putItem').then( () => {
                            //
                        }).catch ( () => {
                            //
                        });
                    }
                }).catch( () => {
                    //
                });
            })
        },

        setActiveSectionByUrlParam({commit, dispatch, state}, urlParam){
            let section = null;
            if(urlParam){
                section = EditorSections.findSectionBySlug(state.sections, urlParam);
            }
            if(!section){
                //section = EditorSections.firstNotFilledSection(state.sections);
            }
            const parentSection = EditorSections.getParentSection(state.sections, section);
            if(parentSection && parentSection.status !== 'locked'){
                commit(SET_ACTIVE_SECTION, section);
                dispatch('expandSectionParent', section);
            }else{
                commit(SET_ACTIVE_SECTION, section);
                dispatch('expandSectionParent', state.sections[0].sections[0]);
            }


        },

        expandSectionParent({commit, state}, section){
            if(section){
                const parentSection = EditorSections.getParentSection(state.sections, section);
                if(parentSection && state.expandedSections.indexOf(parentSection.slug) === -1 && parentSection.status !== 'locked'){
                    commit(ADD_EXPAND_SECTION, parentSection);
                }
            }
        },

        expandSectionParentBySectionSlug({commit, state}, slug){
            if(slug){
                const parentSection = EditorSections.getParentSectionBySlug(state.sections, slug);
                if(parentSection && state.expandedSections.indexOf(parentSection.slug) === -1 && parentSection.status !== 'locked'){
                    commit(ADD_EXPAND_SECTION, parentSection);
                }
            }
        },

        toggleExpandSection({commit, state}, section){
            if(section){
                if(state.expandedSections.indexOf(section.slug) > -1){
                    commit(REMOVE_EXPAND_SECTION, section);
                }else{
                    if(section.status !== 'locked'){
                        commit(ADD_EXPAND_SECTION, section);
                    }else{
                        //showInfoMessage('Предыдущая секция не заполнена','warning');
                    }
                }
            }
        },

        toFirstNotFilledSection({commit, dispatch, state}){
            const section = EditorSections.firstNotFilledSection(state.sections);
            if(section){
                commit(SET_ACTIVE_SECTION, section);
                dispatch('expandSectionParent', section);
            }
        },

        toPreviousSection({commit, state}){
            commit(SET_ACTIVE_SECTION, EditorSections.previousSection(state.sections, state.activeSection));
        },

        toNextSection({commit, state}){
            if(state.activeSection && (state.activeSection.status === 'ok' || state.activeSection.rules.indexOf('required') === -1)){
                commit(SET_ACTIVE_SECTION, EditorSections.nextSection(state.sections, state.activeSection));
            }else if(state.activeSection && state.activeSection.status === 'not-filled') {
                //showInfoMessage('Эта секция является обязательной для заполнения \n Нужно заполнить все секции из раздела "Основное"','warning');
            }else{
                commit(SET_ACTIVE_SECTION, state.sections[0].sections[0]);
            }

        },

        updatePublished({commit, state}){
            if(EditorSections.notFilledRequiredSectionsCount(state.sections) === 0){
                commit(SET_PUBLISHED, 1);
            } else{
                commit(SET_PUBLISHED, 0);
            }
        },

        setProgress({commit, state}){
            let progress = 0;
            const sc = EditorSections.totalSectionsCount(state.sections);
            if(sc > 0){
                progress = parseInt((sc - EditorSections.notFilledSectionsCount(state.sections)) / sc * 100);
            } else {
                progress = 0;
            }

            commit(SET_PROGRESS, progress);
        }


    },
    mutations: {
        [SET_ITEM](state, item){
            state.item = item;
        },

        [SET_PERSONALITIES](state, personalities){
            state.personalities = [...personalities];
        },

        [SET_COMPETENCIES](state, competencies){
            state.competencies = [...competencies];
        },

        [SET_SKILLS](state, skills){
            state.skills = [...skills];
        },

        [SET_ITEM_ID](state, itemId){
            state.itemId = itemId;
        },

        [UPDATE_ITEM_ATTRIBUTES_FIELD](state, {field, value}){
            window.App.Vue.set(state.item.attributes, field, value);
        },

        [UPDATE_ITEM_META_FIELD](state, {field, value}){
            window.App.Vue.set(state.item.meta, field, value);
        },

        [UPDATE_ITEM_RELATIONSHIPS_FIELD](state, {field, value}){
            window.App.Vue.set(state.item.relationships, field, value);
        },

        [UPDATE_USER_PROFILE_FIELD](state, {field, value}){
            window.App.Vue.set(state.item.relationships.user.relationships.profile.attributes, field, value);
        },

        [SET_ACTIVE_SECTION](state, section){
            state.activeSection = section;
        },

        [SET_SECTIONS](state, sections){
            state.sections = [...sections];
        },

        [SET_SECTION_EXAMPLES](state, sectionExamples){
            state.sectionExamples = sectionExamples;
        },

        [ADD_EXPAND_SECTION](state, section){
            state.expandedSections.push(section.slug);
        },

        [REMOVE_EXPAND_SECTION](state, section){
            state.expandedSections.splice(state.expandedSections.indexOf(section.slug), 1);
        },

        [SET_LOADING](state, loading){
            state.loading = loading;
        },

        [SET_PUBLISHED](state, value){
            window.App.Vue.set(state.item.attributes, 'published', value);
        },

        [SET_PROGRESS](state, value){
            window.App.Vue.set(state.item.attributes, 'percent', value);
        },

        [SET_HAS_CHANGES](state, hasChanges){
            state.hasChanges = hasChanges;
        },

        [SET_IS_MOBILE](state, isMobile){
            state.isMobile = isMobile;
        },


        [SET_INSTITUTES](state, institutes){
            state.institutes = [...institutes];
        },

        [SET_INSTITUTE_COURSES](state, instituteCourses){
            state.instituteCourses = [...instituteCourses];
        },

        [SET_JOB_TYPES](state, jobTypes){
            state.jobTypes = [...jobTypes];
        },

        [SET_USER_COMPANIES](state, companies){
            state.userCompanies = [...companies];
        },

    },
    getters: {
        item(state){
            return state.item;
        },

        itemId(state){
            return state.item;
        },

        loading(state){
            return state.loading;
        },

        // sections
        sections(state){
            return state.sections;
        },

        activeSection(state){
            return state.activeSection;
        },

        expandedSections(state){
            return state.expandedSections;
        },

        previousSection(state){
            return EditorSections.previousSection(state.sections, state.activeSection);
        },

        nextSection(state){
            return EditorSections.nextSection(state.sections, state.activeSection);
        },

        notFilledSectionsCount(state){
            return EditorSections.notFilledSectionsCount(state.sections);
        },

        notFilledRequiredSectionsCount(state){
            return EditorSections.notFilledRequiredSectionsCount(state.sections);
        },

        totalSectionsCount(state){
            return EditorSections.totalSectionsCount(state.sections);
        },

        requiredSectionsCount(state){
            return EditorSections.requiredSectionsCount(state.sections);
        },

        sectionExamples(state){
            return state.sectionExamples;
        },

        readyToPublish(state){
            return state.sections.length > 0 && EditorSections.notFilledRequiredSectionsCount(state.sections) === 0;
        },

        isRecruiter(state){
            return state.item ? state.item.attributes.recruiter_candidate === 1 : undefined;
        },


    },
}
