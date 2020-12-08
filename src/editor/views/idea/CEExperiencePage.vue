<template>
<div id="candidate-editor-title-page">
    <div class="">
        <h1 class="mb-4">Опыт работы</h1>
        <experience-selector
            @change="handleChange"
            dusk="experience-selector"
            :value="value"
        />
    </div>
</div>
</template>

<script>
    import ExperienceSelector from "../../components/candidate/ExperienceSelector";
    import {mapActions, mapGetters, mapState} from 'vuex';
    import {showInfoMessage} from "../../my";

    export default {
        name: "CEExperiencePage",

        components: {ExperienceSelector},

        data(){
            return {
                section: 'experience',
                isRecruiter: false,
                value: null, // current version of item part
            }
        },

        async mounted() {
            this.value  = this.item.relationships.experience;
        },

        computed: {
            ...mapGetters('ResumeEdit', ['item']),

            isSaved(){
                return this.value  === this.item.relationships.experience;
            }
        },

        methods: {
            ...mapActions('ResumeEdit', ['setItemData']),

            handleChange(experience){
                this.value = experience;
                console.log(experience);

                const field = 'experience';
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
