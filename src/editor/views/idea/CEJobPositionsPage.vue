<template>
<div id="candidate-editor-title-page">
    <div class="">
        <h1 class="mb-4">Специализации</h1>
        <p>
            Укажите, какие специализации могут быть вам интересны. Вы можете выбрать до 5-и специализаций
        </p>
        <job-position-selector
            @change="handleChange"
            :allJobPositions="item.meta.allJobPositions"
            :value="value"
        />
    </div>
</div>
</template>

<script>
    import JobPositionSelector from '../../components/JobPositionSelector.vue';
    import {mapActions, mapGetters, mapState} from 'vuex';
    import {showInfoMessage} from "../../my";

    export default {
        name: "CEJobPositionsPage",

        components: {JobPositionSelector},

        data(){
            return {
                section: 'job-positions',
                value: '', // current version of item part,
                errors: null,
            }
        },

        mounted() {
            this.value  = [...this.item.relationships.jobPositions];
        },

        computed: {
            ...mapGetters('ResumeEdit', ['item']),

            isSaved(){
                return this.value === this.item.relationships.jobPositions;
            }
        },

        methods: {
            ...mapActions('ResumeEdit', ['setItemData']),

            handleChange(jobPositions){
                if(!this.isSaved){
                    const field = 'jobPositions';
                    const value = jobPositions;
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
