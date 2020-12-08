<template>
<div id="candidate-edit-personal-qualities-page">
    <div class="">
        <h1 class="mb-4">Ваши личные качества</h1>
        <p>Из приведенного списка выберите те качества, которыми вы обладаете</p>
        <multiselect v-model="value" tag-placeholder="Добавить качество"
                     @input="handleChange"
                     placeholder="Поиск и добавление" label="title" track-by="id"
                     :options="sortedPersonalities" :multiple="true" :taggable="true"
        ></multiselect>
    </div>
</div>
</template>

<script>
    import {mapActions, mapGetters, mapState} from 'vuex';
    import Multiselect from 'vue-multiselect';
    import {showInfoMessage} from "../../my";

    export default {
        name: "CEPersonalQualitiesPage",

        components: {Multiselect},

        data(){
            return {
                section: 'personal-qualities',
                isRecruiter: false,
                value: null, // current version of item part
            }
        },

        async mounted() {
            this.value  = this.item.relationships.personalities;
        },

        computed: {
            ...mapGetters('ResumeEdit', ['item']),
            ...mapState('ResumeEdit', ['personalities']),

            isSaved(){
                return this.value  === this.item.relationships.personalities;
            },

            sortedPersonalities: function() {
                return this.personalities.sort((a, b) => {return (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : -1;});
            },
        },

        methods: {
            ...mapActions('ResumeEdit', ['setItemData']),

            handleChange(personalities){
                this.value = personalities;

                const field = 'personalities';
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
