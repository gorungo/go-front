<template>
<div id="ce-start-page"  class="py-2">
    <div class="">
        <h1>Редактирование резюме</h1>
        <template v-if="item">
            <p v-if="item.attributes.published">
                Опубликовано
            </p>
        </template>

    </div>
</div>
</template>

<script>
    import {mapActions, mapGetters, mapState} from 'vuex';

    export default {
        name: "CEStartPage",

        data(){
            return {
                //
            }
        },

        async mounted() {
        },

        computed: {
            ...mapGetters('ResumeEdit', ['item']),
        },

        methods: {

        }
    }
</script>

<style scoped>
    h1{
        font-size: 30px;
    }
</style>
