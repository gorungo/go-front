<template>
<div id="candidate-editor-title-page">
    <div class="">
        <h1 class="mb-4">Ваш город</h1>
        <p>В каком городе вы ищите работу?</p>
        <select
            v-if="cities.length"
            id="ce-city"
            class="form-control"
            name="city_id"
            :value="value"
            @change="handleChange"
        >
            <option value="0" disabled>Выберите город</option>
            <option
                v-for="city in cities"
                :value="city.id"
            >{{city.title}}</option>
        </select>
        <div v-else>Загрузка</div>
    </div>
</div>
</template>

<script>
    import {mapActions, mapGetters, mapState} from 'vuex';
    import {showInfoMessage} from "../../my";

    export default {
        name: "CECityPage",

        data(){
            return {
                section: 'city',
                value: '', // current version of item part,
                errors: null,
            }
        },

        async mounted() {
            await this.fetchCities();
            this.value = this.item.attributes.city_id;
        },

        computed: {
            ...mapGetters('ResumeEdit', ['item']),
            ...mapGetters('City', ['cities']),

            isSaved(){
                return this.value === this.item.attributes.city_id;
            }
        },

        methods: {
            ...mapActions('ResumeEdit', ['setItemData']),
            ...mapActions('City', ['fetchCities']),

            handleChange(e){
                this.value = e.target.value;
                if(!this.isSaved){
                    const field = e.target.name;
                    const value = parseInt(e.target.value);
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
    .ba{
        border-width: 2px;
        cursor: pointer;
    }
    .bac{
        display: flex;
        justify-content: space-between;
    }
    .bab{
        border-color: var(--gray-dark);
        background-color: var(--light);
    }
</style>
