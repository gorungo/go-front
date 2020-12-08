<template>
<div id="candidate-editor-deadline-page">
    <h1 class="mb-4">Срок публикации резюме</h1>
    <p>
        Установите дату, до которой ваше резюме будут видеть другие пользователи
    </p>
    <div class="form-group localised_deadline mt-4">
        <label>Действительно до </label>
        <date-picker
            @change="handleChangeDeadline"
            :value="valueDeadline"
            valueType="format" format="DD.MM.YYYY"
            lang="ru"
            name="localised_deadline"
            placeholder="Укажите дату"
            aria-label="Укажите дату действительно до"
        />
    </div>
</div>
</template>

<script>
    import DatePicker from 'vue2-datepicker';
    import 'vue2-datepicker/index.css';
    import {mapActions, mapGetters, mapState} from 'vuex';
    import {showInfoMessage} from "../../my";

    export default {
        name: "CEDeadlinePage",

        components: {
            DatePicker
        },

        data(){
            return {
                section: 'deadline',
                valueActive: '', // current version of item part,
                valueDeadline: '', // current version of item part,
                errors: null,
            }
        },

        async mounted() {
            this.valueDeadline  = this.item.attributes.localised_deadline;
        },

        computed: {
            ...mapGetters('ResumeEdit', ['item', 'readyToPublish']),
            ...mapState('ResumeEdit', ['isMobile']),

            isSaved(){
                return this.valueDeadline === this.item.attributes.deadline;
            }
        },

        methods: {
            ...mapActions('ResumeEdit', ['setItemData']),
            ...mapActions('City', ['fetchCities']),

            handleChangeDeadline(localisedDate){
                this.valueDeadline = localisedDate;
                if(!this.isSaved){
                    const field = 'localised_deadline';
                    const value = this.valueDeadline ;
                    this.setItemData({sectionSlug: this.section, field, value});
                }
            },
        }
    }
</script>

<style scoped>
    h1{
        font-size: 30px;
    }
</style>
