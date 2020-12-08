<template>
    <editor-layout
        ref="editorLayout"
        :has-examples="hasExamples"
        @toMobileMode="handleToMobileMode"
        @sidebarVisibility="handleSidebarVisibility"
    >
        <template #aside>
            <editor-sidebar
                :title="sidebarTitle"
                :sections="sections"
                :activeSection="activeSection"
                :expandedSections="expandedSections"
                @setActiveSection="handleSetActiveSection"
                @toggleExpandSection="handleToggleExpandSection"
                :links="links"
            />
        </template>
        <template #default-title>
            {{ mainHeaderTitle }}
        </template>
        <template>
            <router-view v-if="item"/>
            <editor-loading v-else/>
            <div class="eb" @click="handleShowExamplesModalClick" :class="{ebh: !hasExamples}">
                <button type="button" class="wlymrds">
                    <div class="hgs47m">
                        <div class="ni9axhe">
                            <div class="yl6" style="width: 34px; height: 34px; background: rgb(0, 132, 137); color: rgb(255, 255, 255);">
                                <svg viewBox="0 0 18 18" role="img" focusable="false" style="height: 20px; width: 20px; display: block; fill: rgb(255, 255, 255);">
                                    <path d="m17 9c0-4.42-3.58-8-8-8s-8 3.58-8 8 3.58 8 8 8 8-3.58 8-8m1 0c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9m-9-5.25c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25m0 4.25c.55 0 1 .45 1 1v5c0 .55-.45 1-1 1s-1-.45-1-1v-5c0-.55.45-1 1-1" fill-rule="evenodd"></path>
                                </svg>
                            </div>
                        </div>
                        <div class="ejfg4u">
                            <div class="w4q4qv">Советы</div>
                        </div>
                    </div>
                </button>
            </div>
        </template>

        <template v-slot:examples>
            <div v-if="hasExamples" v-html="sectionExamples"></div>
        </template>
        <template #footer>
            <editor-footer
                title=""
                :activeSection="activeSection"
                :totalSectionsCount="totalSectionsCount"
                :requiredSectionsCount="requiredSectionsCount"
                :notFilledSectionsCount="notFilledSectionsCount"
                :notFilledRequiredSectionsCount="notFilledRequiredSectionsCount"
                :previousSection="previousSection"
                :nextSection="nextSection"
                @toPreviousSection="handleToPreviousSection"
                @toNextSection="handleToNextSection"
                @toFirstNotFilledSection="handleToFirstNotFilledSection"
            />
        </template>
    </editor-layout>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex';
import EditorLayout from './EditorLayout'
import EditorSidebar from "./EditorSidebar";
import EditorFooter from "./EditorFooter";
import EditorLoading from "./EditorLoading";

export default {
    name: "Editor",
    components: {
        EditorLoading,
        EditorFooter,
        EditorSidebar,
        EditorLayout,
    },

    // props: {
    //     superuser: Boolean,
    //     hasDraft: Boolean,
    //     isRecruiter: Boolean,
    //     propItemId: Number,
    //     courseStudies: Array,
    //     jobTypes: Array,
    // },

    data() {
        return {
            loading: false,
        }
    },

    created() {
        document.addEventListener('keydown', this.doCommand);
    },
    destroyed() {
        window.removeEventListener('keypress', this.doCommand);
    },

    async mounted() {
        const sectionRouteName = this.$route.name;
        try{
            await this.fetchData();
            if(this.isRecruiter){
                await this.fetchUserCompanies();
            }
            this.setActiveSectionByUrlParam(sectionRouteName);
            this.expandSectionParentBySectionSlug(sectionRouteName);
            await this.fetchSectionExamples();
        } catch (e) {
            console.log(e);
        }

    },

    watch: {
        activeSection(section) {
            if (section && this.$route.name !== section.slug) {
                this.$router.push({name: section.slug, params: {id: this.$route.params.id}});
                this.fetchSectionExamples();
            }

            if(section == null){
                this.$router.push({name: 'active', params: {id: this.$route.params.id}})
            }
        },

        readyToPublish(ready){
            if(this.item !== null && this.sections.length > 0){
                if (ready){
                    this.publish().then(() => {
                        if(!this.isRecruiter){
                            this.showPublishedModal();
                            this.expandSectionParentBySectionSlug('photos');
                        }
                    }).catch(() => {

                    });
                } else {
                    this.unPublish().then(() => {
                        if(!this.isRecruiter) {
                            this.showUnPublishedModal();
                        }
                    });
                }
            }
        }
    },

    computed: {
        sidebarTitle() {
            return 'Создание резюме';
        },
        mainHeaderTitle() {
            return this.activeSection ? this.activeSection.title : '';
        },
        hasExamples() {
            return this.sectionExamples != null;
        },

        links(){
            if(this.isRecruiter){
                return [
                    {
                        title: 'Кадидаты',
                        url: '/crm/candidates'
                    },
                ];
            } else {
                return [
                    {
                        title: 'Мои резюме',
                        url: '/profile/resumes'
                    },
                ];
            }

        },


        ...mapState('ResumeEdit', ['isRecruiter', 'isMobile']),
        ...mapGetters('ResumeEdit', [
            'sections',
            'itemId',
            'item',
            'activeSection',
            'expandedSections',
            'totalSectionsCount',
            'requiredSectionsCount',
            'notFilledSectionsCount',
            'notFilledRequiredSectionsCount',
            'nextSection',
            'previousSection',
            'sectionExamples',
            'readyToPublish',
            'isRecruiter',

        ]),
    },

    methods: {
        ...mapActions('ResumeEdit', [
            'fetchItem',
            'fetchUserCompanies',
            'fetchSectionExamples',
            'setItemId',
            'setLoading',
            'setActiveSection',
            'setActiveSectionByUrlParam',
            'toggleExpandSection',
            'expandSectionParent',
            'expandSectionParentBySectionSlug',
            'toPreviousSection',
            'toNextSection',
            'toFirstNotFilledSection',
            'publish',
            'unPublish',
            'setIsMobile'
        ]),

        handleSetActiveSection(section) {
            this.setActiveSection(section);
            if(this.isMobile){
                this.hideSidebar();
            }
        },

        handleToggleExpandSection(section) {
            this.toggleExpandSection(section);
        },

        handleToPreviousSection() {
            this.toPreviousSection();
        },

        handleToNextSection() {
            this.toNextSection();
        },

        handleToFirstNotFilledSection() {
            this.toFirstNotFilledSection();
        },

        async fetchData() {
            const itemId = this.$route.params.id;
            if (itemId) {
                this.setItemId(itemId);
                if (this.item == null) {
                    try {
                        this.loading = true;
                        await this.fetchItem();
                    } catch (e) {
                        if (this.item == null) {
                            //showInfoMessage('Ошибка при загрузке данных', 'error');
                        }
                    }
                    this.loading = false;
                }
            }
        },

        doCommand(e) {
            let keyCode = e.keyCode;

            if(document.activeElement.nodeName === 'BODY'){
                if (keyCode === 37) {
                    // left arrow
                    this.handleToPreviousSection();
                } else if (keyCode === 39) {
                    // right arrow
                    this.handleToNextSection();
                }
            }

        },

        handleToMobileMode(isMobile){
            this.setIsMobile(isMobile);
        },

        hideSidebar(){
            this.$refs.candidateEditorLayout.hideSidebar();
        },

        handleShowExamplesModalClick(){
            this.$refs.examplesModal.show();
        },

        showPublishedModal(){
            this.$refs.publishedModal.show();
        },

        showUnPublishedModal(){
            this.$refs.unPublishedModal.show();
        }


    }

}
</script>

<style scoped>
    .bg-info-gray{
        background-color: #f9f9f9;
    }
</style>
