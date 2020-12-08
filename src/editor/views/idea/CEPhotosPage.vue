<template>
<div id="candidate-editor-title-page">
    <div>
        <h1 class="mb-4">Изображения</h1>
        <photo-uploader2
            @change="handleChange"
            type="candidates"
            :item-id="item.id"
            @photoLoaded="handlePhotoLoaded"
            @photoDeleted="handlePhotoDeleted"
            @mainPhotoSet="handleMainPhotoSet"
            :value="value"
        />
    </div>
</div>
</template>

<script>
    import {mapActions, mapGetters, mapState} from 'vuex';
    import PhotoUploader2 from '../../components/photo/PhotoUploader2.vue';
    import {showInfoMessage} from "../../my";

    export default {
        name: "CEPhotosPage",

        components: {PhotoUploader2},

        data(){
            return {
                section: 'photos',
                value: [], // current version of item part
            }
        },

        async mounted() {
            this.value  = this.item.relationships.photos;
        },

        computed: {
            ...mapGetters('ResumeEdit', ['item']),

            isSaved(){
                return this.value  === this.item.relationships.photos;
            },
        },

        methods: {
            ...mapActions('ResumeEdit', ['setItemData']),
            handleChange(){
                showInfoMessage('Сохранено');
            },

            handlePhotoLoaded(photo){
                this.value = [...this.value, photo];
                const field = 'photos';
                const value = this.value ;
                this.setItemData({
                    sectionSlug: this.section,
                    field,
                    value
                }).then(() => {
                    //showInfoMessage('Сохранено');
                }).catch(() => {
                        showInfoMessage('Произошла ошибка', 'error');
                    }
                );
            },

            handlePhotoDeleted(photo){
                this.value = this.value.filter( item => {
                    return item.id !== photo.id;
                })
                const field = 'photos';
                const value = this.value ;
                this.setItemData({sectionSlug: this.section, field, value});
            },

            handleMainPhotoSet(){
                showInfoMessage('Сохранено');
            }
        }
    }
</script>

<style scoped>
    h1{
        font-size: 30px;
    }
</style>
