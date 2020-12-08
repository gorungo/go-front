<template>
    <div id="candidate-editor-title-page">
        <div class="">
            <h1 class="mb-4">Требования к будущей работе</h1>
            <p>
                Укажите некоторые данные о себе. Они помогу более точно находить для вас подходящие вакансии
            </p>
            <meta-selector
                @change="handleChange"
                :item-meta="value"
                :all-meta="item.meta.allMeta"
            />
        </div>
    </div>
</template>

<script>
import MetaSelector from "../../components/candidate/MetaSelector";
import ImStudentSelector from "../../components/candidate/ImStudentSelector";
import {mapActions, mapState} from 'vuex';

export default {
    name: "CEParametersPage",
    components: {ImStudentSelector, MetaSelector},

    data() {
        return {
            section: 'parameters',
            value: null, // current version of item part
            valueStudent: null, // candidateStudentMeta
        }
    },

    async mounted() {

        this.value = this.item.relationships.meta;
        this.valueStudent = this.item.relationships.candidateStudentMeta;
    },

    computed: {
        ...mapState('ResumeEdit', ['item', 'isRecruiter']),
        ...mapState('City', ['cities']),
        ...mapState('ResumeEdit', [
            'institutes', 'instituteCourses', 'jobTypes'
        ]),

        isSaved() {
            return this.value === this.item.relationships.meta;
        }
    },

    methods: {
        ...mapActions('ResumeEdit', [
            'setItemData', 'fetchInstitutes', 'fetchInstituteCourses',  'fetchJobTypes'
        ]),
        ...mapActions('City', ['fetchCities']),

        handleChange(meta) {
            this.value = meta;
            const field = 'meta';
            const value = this.value;
            this.setItemData({sectionSlug: this.section, field, value});
        },

    }
}
</script>

<style scoped>
h1 {
    font-size: 30px;
}
</style>
