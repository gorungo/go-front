<template>
    <div id="candidate-editor-title-page">
        <div class="">
            <h1 class="mb-4">Ваши мечты</h1>
            <p>Расскажите, о чём вы мечтаете</p>
            <div class="form-group description">
            <textarea
                @change="handleChange"
                class="form-control"
                placeholder="Мечтаю отправиться в кругосветное путешествие, чтобы посмотреть новые города и страны, и то, как там работают люди на баре. Мечтаю достичь таких высот в профессии, чтобы иметь возможность поработать в Мишленовском ресторане!"
                name="dreams"
                id="frm_dreams"
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
    name: "CEDreamsPage",

    data(){
        return {
            section: 'dreams',
            isRecruiter: false,
            value: null, // current version of item part
        }
    },

    async mounted() {
        this.value  = this.item.attributes.dreams;
    },

    computed: {
        ...mapGetters('ResumeEdit', ['item']),

        isSaved(){
            return this.value === this.item.attributes.dreams;
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
