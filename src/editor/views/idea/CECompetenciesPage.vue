<template>
<div id="candidate-editor-competencies-page">
    <div class="">
        <h1 class="mb-4">Ваши компетенции (совокупности качеств)</h1>
        <p>Из приведенного списка выберите те совокупности качеств, которыми вы обладаете</p>
        <multiselect v-model="value" tag-placeholder="Добавить компетенцию"
                     @input="handleChange"
                     placeholder="Поиск и добавление" label="title" track-by="id"
                     :options="sortedCompetencies" :multiple="true" :taggable="true"
        ></multiselect>
    </div>
</div>
</template>

<script>
    import {mapActions, mapGetters, mapState} from 'vuex';
    import Multiselect from 'vue-multiselect';
    import {showInfoMessage} from "../../my";

    export default {
        name: "CECompetenciesPage",

        components: {Multiselect},

        data(){
            return {
                section: 'competencies',
                isRecruiter: false,
                value: null, // current version of item part
            }
        },

        async mounted() {
            this.value  = this.item.relationships.competencies;
        },

        computed: {
            ...mapGetters('ResumeEdit', ['item']),
            ...mapState('ResumeEdit', ['competencies']),

            isSaved(){
                return this.value  === this.item.relationships.competencies;
            },

            sortedCompetencies: function() {
                return this.competencies.sort((a, b) => {return (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : -1;});
            },
        },

        methods: {
            ...mapActions('ResumeEdit', ['setItemData']),

            handleChange(competencies){
                this.value = competencies;

                const field = 'competencies';
                const value = this.value ;
                this.setItemData({sectionSlug: this.section, field, value});


            }
        }
    }
</script>

<style scoped>
    h1{
        font-size: 30px;
    }
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
