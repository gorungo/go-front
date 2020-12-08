<template>
<div id="candidate-editor-title-page">
    <div class="">
        <h1 class="mb-4">Образование</h1>
        <p>Расскажите о вашем основном и дополнительном образовании: где обучались, какие курсы /классы закончили?</p>
        <div class="form-group description">
            <textarea
                @change="handleChange"
                class="form-control"
                placeholder="По образованию я – технолог пищевой промышленности. Окончил вуз по специальности «Технология продукции общественного питания». Во время учебы поработал помощником бармена. Эта профессия понравилась, и я закончил курсы барменов. Сейчас ищу работу в ресторанном бизнесе."
                name="education"
                id="frm_description"
                rows="6"
                :value="value"
            />
        </div>
    </div>
</div>
</template>

<script>
    import {showInfoMessage} from '../../my';
    import {mapActions, mapGetters, mapState} from 'vuex';

    export default {
        name: "CEEducationPage",

        data(){
            return {
                section: 'education',
                isRecruiter: false,
                value: null, // current version of item part
            }
        },

        async mounted() {
            this.value  = this.item.attributes.education;
        },

        computed: {
            ...mapGetters('ResumeEdit', ['item']),

            isSaved(){
                return this.value  === this.item.attributes.education;
            }
        },

        methods: {
            ...mapActions('ResumeEdit', ['setItemData']),

            handleChange(e){
                this.value = e.target.value;
                if(!this.isSaved){
                    const field = e.target.name;
                    const value = e.target.value;
                    this.setItemData({sectionSlug: this.section, field, value});
                }

            }
        }
    }
</script>

<style scoped>
    h1{
        font-size: 30px;
    }
</style>
