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

} from './mutation_types';


import EditorSections from '../../modules/EditorSections';
import validateCandidateFn from '../../modules/ValidateCandidate';
import validateRecruiterCandidateFn from '../../modules/ValidateRecruiterCandidate';

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
        async fetchItem({commit, dispatch, state}){
            return new Promise(async (resolve, reject) => {
                if(state.itemId !== null){
                    try{
                        commit(SET_LOADING, true);
                        const res = await axios.get(`/ideas/${state.itemId}`);
                        commit(SET_LOADING, false);

                        if (res.status === 200 && res.data.data !== undefined) {
                            commit(SET_ITEM, res.data.data);
                            dispatch('setSections').then(() => {
                                commit(SET_SECTIONS, EditorSections.validatedSections(state.sections, state.item, state.item.attributes.recruiter_candidate === 1 ? validateRecruiterCandidateFn : validateCandidateFn));
                            });
                            dispatch('fetchItemMetaData');
                            resolve(res);
                        }
                    }catch(e){
                        reject(e);
                    }
                }
                reject();
            })
        },

        async fetchSectionExamples({commit, state}){
            return new Promise(async (resolve, reject) => {
                if(state.activeSection != null){
                    try{
                        commit(SET_LOADING, true);
                        const res = await axios.get(`/ideas/sectionExamples/${state.activeSection.slug}`, {
                            params: {
                                isRecruiter: state.item.attributes.candidate_recruiter,
                            }
                        });
                        commit(SET_LOADING, false);
                        if (res.status === 200 && res.data !== undefined && res.data.body !== undefined) {
                            commit(SET_SECTION_EXAMPLES, res.data.body);
                            resolve(res);
                        }
                    }catch(e){
                        reject(e);
                    }
                }
                reject();
            })
        },

        /**
         * Save all item
         * @returns {Promise<void>}
         */
        async putItem({commit, dispatch, state}){
            return new Promise(async (resolve, reject) => {
                if(state.itemId != null){
                    try{
                        commit(SET_LOADING, true);
                        const resp = await axios.patch(`/ideas/${state.itemId}`, state.item);
                        commit(SET_LOADING, false);
                        if (resp.status === 200 || resp.status === 201) {
                            if(resp.data.data.id !== null ){
                                commit(SET_ITEM, resp.data.data);
                                commit(SET_HAS_CHANGES, false);
                                resolve(resp.data.data);
                            }
                        }
                    }catch(e){
                        reject(e);
                    }
                }
                reject();
            });
        },

        async publish({commit, state}){
            return new Promise(async (resolve, reject) => {
                if(state.itemId != null && state.item.attributes.published === 0){
                    try{
                        commit(SET_LOADING, true);
                        const resp = await axios.patch(`/candidates/${state.itemId}/publish`, state.item);
                        commit(SET_LOADING, false);
                        if (resp.status === 204) {
                            commit(SET_PUBLISHED, 1);
                            resolve();
                        }
                    }catch(e){
                        reject(e);
                    }
                }
                reject();
            });
        },

        async unPublish({commit, state}){
            return new Promise(async (resolve, reject) => {
                if(state.itemId != null  && state.item.attributes.published === 1){
                    try{
                        commit(SET_LOADING, true);
                        const resp = await axios.patch(`/candidates/${state.itemId}/unPublish`, state.item);
                        commit(SET_LOADING, false);
                        if (resp.status === 204) {
                            commit(SET_PUBLISHED, 0);
                            resolve();
                        }
                    }catch(e){
                        reject(e);
                    }
                }
                reject();
            });
        },

        async fetchInstitutes({commit, dispatch, state}, cityId){
            return new Promise(async (resolve, reject) => {
                if(state.itemId !== null){
                    try{
                        commit(SET_LOADING, true);
                        const res = await axios.get(`/institutes`, {
                            params: { cityId }
                        });
                        commit(SET_LOADING, false);
                        if (res.status === 200 && res.data.data !== undefined) {
                            commit(SET_INSTITUTES, res.data.data);
                            resolve(res);
                        }
                    }catch(e){
                        reject(e);
                    }
                }
                reject();
            })
        },

        async fetchJobTypes({commit}){
            return new Promise(async (resolve, reject) => {
                try{
                    commit(SET_LOADING, true);
                    const res = await axios.get(`/api/jobTypes`);
                    commit(SET_LOADING, false);
                    if (res.status === 200 && res.data.data !== undefined) {
                        commit(SET_JOB_TYPES, res.data.data);
                        resolve(res);
                    }
                }catch(e){
                    reject(e);
                }
            })
        },

        async fetchInstituteCourses({commit}){
            return new Promise(async (resolve, reject) => {
                try{
                    commit(SET_LOADING, true);
                    const res = await axios.get(`/api/instituteCourses`);
                    commit(SET_LOADING, false);
                    if (res.status === 200 && res.data.data !== undefined) {
                        commit(SET_INSTITUTE_COURSES, res.data.data);
                        resolve(res);
                    }
                }catch(e){
                    reject(e);
                }
            })
        },

        async fetchUserCompanies({commit, rootState}){
            return new Promise(async (resolve, reject) => {
                try{
                    commit(SET_LOADING, true);
                    const res = await axios.get(`/api/users/${rootState.Auth.activeUser.id}/companies`, {
                        params: {
                            active: 1,
                            include: 'jobs', // 'relationships devided by , '
                        }
                    });
                    commit(SET_LOADING, false);
                    if (res.status === 200 && res.data.data !== undefined) {
                        commit(SET_USER_COMPANIES, res.data.data);
                        resolve(res);
                    }
                }catch(e){
                    reject(e);
                }
            })
        },

        setItemId({commit}, itemId){
            commit(SET_ITEM_ID, itemId);
        },

        setIsMobile({commit}, isMobile){
            commit(SET_IS_MOBILE, isMobile);
        },

        setLoading({commit}, loading){
            commit(SET_LOADING, loading);
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

        setSections({commit, state}){
            let sections = [
                // {
                //     title: 'Активность',
                //     slug: 'active',
                //     status: 'not-filled',
                //     rules: ['active'],
                //     sections: [],
                // },
                {
                    title: 'Основное',
                    slug: 'main',
                    status: 'not-filled',
                    lockIfNotFilledPrevious: false,
                    sections: [
                        {
                            title: 'Срок публикации',
                            slug: 'deadline',
                            status: 'not-filled',
                            rules: ['required'],
                        },
                        {
                            title: 'Контакты',
                            slug: 'contacts',
                            status: 'not-filled',
                            rules: ['required'],
                        },
                        {
                            title: 'Профиль',
                            slug: 'profile',
                            status: 'not-filled',
                            rules: ['required'],
                        },
                        {
                            title: 'Параметры',
                            slug: 'parameters',
                            status: 'not-filled',
                            rules: ['required'],
                        },
                        {
                            title: 'Город',
                            slug: 'city',
                            status: 'not-filled',
                            rules: ['required'],
                        },
                        {
                            title: 'Специализации',
                            slug: 'job-positions',
                            status: 'not-filled',
                            rules: ['required'],
                        },
                        {
                            title: 'Заголовок',
                            slug: 'title',
                            status: 'not-filled',
                            rules: ['required'],
                        },
                        {
                            title: 'О себе',
                            slug: 'description',
                            status: 'not-filled',
                            rules: ['required'],
                        },
                    ],
                },
                {
                    title: 'Подробнее',
                    slug: 'more',
                    status: 'not-filled',
                    lockIfNotFilledPrevious: true,
                    sections: [
                        {
                            title: 'Изображения',
                            slug: 'photos',
                            status: 'not-filled',
                            rules: [],
                        },
                        {
                            title: 'Опыт работы',
                            slug: 'experience',
                            status: 'not-filled',
                            rules: [],
                        },
                        {
                            title: 'Образование',
                            slug: 'education',
                            status: 'not-filled',
                            rules: [],
                        },
                        {
                            title: 'Достижения',
                            slug: 'achievements',
                            status: 'not-filled',
                            rules: [],
                        },
                        {
                            title: 'Ожидания',
                            slug: 'conditions',
                            status: 'not-filled',
                            rules: [],
                        },
                        {
                            title: 'Мечты',
                            slug: 'dreams',
                            status: 'not-filled',
                            rules: [],
                        },
                        {
                            title: 'Хобби',
                            slug: 'hobby',
                            status: 'not-filled',
                            rules: [],
                        },
                        {
                            title: 'Личные качества',
                            slug: 'personal-qualities',
                            status: 'not-filled',
                            rules: [],
                        },
                        {
                            title: 'Компетенции',
                            slug: 'competencies',
                            status: 'not-filled',
                            rules: [],
                        },
                        {
                            title: 'Видео-резюме',
                            slug: 'youtube',
                            status: 'not-filled',
                            rules: [],
                        },
                    ],
                },

            ];
            let recruiterSections = [
                {
                    title: 'Основное',
                    slug: 'main',
                    status: 'not-filled',
                    lockIfNotFilledPrevious: false,
                    sections: [
                        {
                            title: 'Профиль кандидата',
                            slug: 'recruiter-profile',
                            status: 'not-filled',
                            rules: ['required'],
                        },

                        {
                            title: 'Город',
                            slug: 'city',
                            status: 'not-filled',
                            rules: ['required'],
                        },
                        {
                            title: 'Специализации',
                            slug: 'job-positions',
                            status: 'not-filled',
                            rules: ['required'],
                        },
                        {
                            title: 'Вакансия',
                            slug: 'job',
                            status: 'not-filled',
                            rules: ['required'],
                        },
                        {
                            title: 'Заголовок',
                            slug: 'title',
                            status: 'not-filled',
                            rules: ['required'],
                        },
                        {
                            title: 'О себе',
                            slug: 'description',
                            status: 'not-filled',
                            rules: ['required'],
                        },
                    ],
                },
                {
                    title: 'Подробнее',
                    slug: 'more',
                    status: 'not-filled',
                    lockIfNotFilledPrevious: true,
                    sections: [
                        {
                            title: 'Изображения',
                            slug: 'photos',
                            status: 'not-filled',
                            rules: [],
                        },
                        {
                            title: 'Параметры',
                            slug: 'parameters',
                            status: 'not-filled',
                            rules: [],
                        },
                        {
                            title: 'Образование',
                            slug: 'education',
                            status: 'not-filled',
                            rules: [],
                        },
                        {
                            title: 'Опыт работы',
                            slug: 'experience',
                            status: 'not-filled',
                            rules: [],
                        },
                        {
                            title: 'Достижения',
                            slug: 'achievements',
                            status: 'not-filled',
                            rules: [],
                        },
                        {
                            title: 'Ожидания',
                            slug: 'conditions',
                            status: 'not-filled',
                            rules: [],
                        },
                        {
                            title: 'Мечты',
                            slug: 'dreams',
                            status: 'not-filled',
                            rules: [],
                        },
                        {
                            title: 'Хобби',
                            slug: 'hobby',
                            status: 'not-filled',
                            rules: [],
                        },
                        {
                            title: 'Личные качества',
                            slug: 'personal-qualities',
                            status: 'not-filled',
                            rules: [],
                        },
                        {
                            title: 'Компетенции',
                            slug: 'competencies',
                            status: 'not-filled',
                            rules: [],
                        },
                        {
                            title: 'Видео-резюме',
                            slug: 'youtube',
                            status: 'not-filled',
                            rules: [],
                        },
                    ],
                },

            ];
            commit(SET_SECTIONS, state.item.attributes.recruiter_candidate === 0 ? sections : recruiterSections);
        },

        setItemData({commit, dispatch, state}, {sectionSlug, field, value}){
            switch (sectionSlug) {
                case 'active':
                case 'title':
                case 'deadline':
                case 'description':
                case 'education':
                case 'hobby':
                case 'dreams':
                case 'conditions':
                case 'youtube':
                case 'achievements':
                case 'contacts':
                case 'isStudent':
                case 'city':
                    commit(UPDATE_ITEM_ATTRIBUTES_FIELD, {field, value});
                    break;

                case 'competencies':
                case 'personal-qualities':
                case 'experience':
                case 'parameters':
                case 'profile-meta':
                case 'job':
                case 'recruiter-profile':
                case 'candidateStudentMeta':
                case 'candidateProfile':
                case 'photos':
                    commit(UPDATE_ITEM_RELATIONSHIPS_FIELD, {field, value});
                    break;

                case 'job-positions':
                    commit(UPDATE_ITEM_RELATIONSHIPS_FIELD, {field, value});
                    dispatch('fetchItemMetaData');
                    break;

                case 'profile':
                    commit(UPDATE_USER_PROFILE_FIELD, {field, value});
                    break;

            }

            commit(SET_SECTIONS, EditorSections.validatedSections(state.sections, state.item, state.item.attributes.recruiter_candidate === 1 ? validateRecruiterCandidateFn : validateCandidateFn));
            commit(SET_HAS_CHANGES, true);

            dispatch('setProgress').then(() => {
                dispatch('updatePublished').then(() => {
                    if(state.autoSave){
                        // save to server
                        dispatch('putItem').then( res => {
                            showInfoMessage('Успешно сохранено');
                        }).catch ( e => {
                            showInfoMessage('Не сохранено');
                        });
                    }
                }).catch( e => {

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
                        showInfoMessage('Предыдущая секция не заполнена','warning');
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
                showInfoMessage('Эта секция является обязательной для заполнения \n Нужно заполнить все секции из раздела "Основное"','warning');
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
            Vue.set(state.item.attributes, field, value);
        },

        [UPDATE_ITEM_META_FIELD](state, {field, value}){
            Vue.set(state.item.meta, field, value);
        },

        [UPDATE_ITEM_RELATIONSHIPS_FIELD](state, {field, value}){
            Vue.set(state.item.relationships, field, value);
        },

        [UPDATE_USER_PROFILE_FIELD](state, {field, value}){
            Vue.set(state.item.relationships.user.relationships.profile.attributes, field, value);
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
            Vue.set(state.item.attributes, 'published', value);
        },

        [SET_PROGRESS](state, value){
            Vue.set(state.item.attributes, 'percent', value);
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
