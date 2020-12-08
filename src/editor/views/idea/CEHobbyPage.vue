<template>
<div id="candidate-editor-hobby-page">
    <div class="">
        <h1 class="mb-4">Ваше хобби</h1>
        <p>Расскажите о вашем/ваших увлечениях</p>
        <div class="form-group description">
            <textarea
                @change="handleChange"
                class="form-control"
                placeholder="Я увлекаюсь компьютерными играми, изучаю испанский язык, а также мне нравится готовить новые блюда или напитки и проводить дегустации в кругу друзей."
                name="hobby"
                id="frm_hobby"
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
        name: "CEHobbyPage",

        data(){
            return {
                section: 'hobby',
                isRecruiter: false,
                value: null, // current version of item part
            }
        },

        async mounted() {
            this.value  = this.item.attributes.hobby;
        },

        computed: {
            ...mapGetters('ResumeEdit', ['item']),

            isSaved(){
                return this.value  === this.item.attributes.hobby;
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
