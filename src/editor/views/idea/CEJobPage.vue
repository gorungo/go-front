<template>
<div id="candidate-editor-job-page"  class="py-2">
    <div v-if="isRecruiter && userCompanies">
        <h1>Вакансия</h1>
        <div class="mt-4">
            <div class="">
                <p>
                    Укажите заведение, в которое добавляете кандидата
                </p>
                <label>Заведение <span title="Обязательное поле" class="required-star">*</span></label>
                <div id="company-selector">
                    <multiselect
                        v-model="company"
                        placeholder="Выберите заведение"
                        track-by="id"
                        id="frm_company"
                        :custom-label="customLabel"
                        :options="userCompanies"
                        :multiple="false"
                        @input="handleCompanyChange(company)"
                        selectedLabel="Выбрано"
                        selectLabel="Нажмите ввод для выбора"
                        deselectLabel="Нажмите ввод чтобы удалить"
                    >
                    </multiselect>
                </div>
            </div>
            <div class="mt-4" v-if="company">
                <hr/>
                <p>
                    Выберите вакансию
                </p>
                <label>Вакансия <span title="Обязательное поле" class="required-star">*</span></label>
                <div id="job-selector">
                    <multiselect
                        v-model="job"
                        placeholder="Выберите вакансию"
                        track-by="id"
                        id="frm_job"
                        :custom-label="customLabel"
                        :options="company.relationships.jobs"
                        :multiple="false"
                        @input="handleJobChange"
                        selectedLabel="Выбрано"
                        selectLabel="Нажмите ввод для выбора"
                        deselectLabel="Нажмите ввод чтобы удалить"
                    >
                    </multiselect>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    import Multiselect from 'vue-multiselect';
    import DatePicker from 'vue2-datepicker';
    import 'vue2-datepicker/index.css';
    import {showInfoMessage} from '../../my';
    import {mapActions, mapGetters, mapState} from 'vuex';

    export default {
        name: "CEJobPage",

        components: {DatePicker, Multiselect},

        data(){
            return {
                section: 'job',
                candidateProfile: null,
                company: null,
                job: null,
            }
        },

        async mounted() {
            this.candidateProfile  = this.item.relationships.candidateProfile;

            this.company = this.userCompanies.find(item => {
                return item.id === this.candidateProfile.attributes.company_id;
            })
            if(this.company){
                this.job = this.company.relationships.jobs.find(item => {
                    return item.id === this.candidateProfile.attributes.job_id;
                })
            }
        },

        watch: {
            userCompanies(companies){
                this.company = companies.find(item => {
                    return item.id === this.candidateProfile.attributes.company_id;
                })
                if(this.company){
                    this.job = this.company.relationships.jobs.find(item => {
                        return item.id === this.candidateProfile.attributes.job_id;
                    })
                }
            }
        },

        computed: {
            ...mapGetters('ResumeEdit', ['item', 'isRecruiter']),
            ...mapState('ResumeEdit', ['userCompanies']),

            isSaved(){
                return this.candidateProfile  === this.item.relationships.candidateProfile;
            }
        },

        methods: {
            ...mapActions('ResumeEdit', ['setItemData']),

            handleCompanyChange(){
                this.$set(this.candidateProfile.attributes, 'company_id', this.company ? this.company.id : null);
                const field = 'candidateProfile';
                const value = this.candidateProfile;
                this.setItemData({sectionSlug: this.section, field, value});
                this.job = null;
                console.log(this.candidateProfile.attributes);
            },

            handleJobChange(job){
                this.$set(this.candidateProfile.attributes, 'job_id', job ? job.id : null);
                const field = 'candidateProfile';
                const value = this.candidateProfile;
                this.setItemData({sectionSlug: this.section, field, value});
            },

            customLabel(option) {
                if(option.attributes !== undefined) {
                    return option.attributes.title;
                } else if (option.title !== undefined) {
                    return option.title;
                }
            },
        }
    }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
    h1{
        font-size: 32px;
    }
</style>
