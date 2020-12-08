<template>
    <div id="candidate-editor-youtube-page">
        <div class="">
            <h1 class="mb-4">Youtube</h1>
            <p>
                Ссылка на ваше видео с резюме на Youtube
            </p>
            <div class="form-group description">
            <input
                @change="handleChange"
                type="url"
                class="form-control"
                placeholder="https://www.youtube.com/watch?v=xxxxx"
                name="youtube"
                id="frm_youtube"
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
    name: "CEYoutubePage",

    data(){
        return {
            section: 'youtube',
            isRecruiter: false,
            value: null, // current version of item part
        }
    },

    async mounted() {
        this.value  = this.item.attributes.youtube;
    },

    computed: {
        ...mapGetters('ResumeEdit', ['item']),

        isSaved(){
            return this.value === this.item.attributes.youtube;
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
