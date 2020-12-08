<template>
<div id="candidate-editor-achievements-page">
    <div class="">
        <h1 class="mb-4">Ваши достижения</h1>
        <p>Расскажите о ваших профессиональных и/или личных достижениях</p>
        <div class="form-group description">
            <textarea
                @change="handleChange"
                class="form-control"
                placeholder="В моей жизни профессиональные и личные достижения тесно связаны друг с другом. Успешно отбиваю запару на бизнес-ланчах! Никогда не роняю тарелок! Уверенно ношу флют на подносе! Выношу эспрессо за 5 секунд! Очень вынослив(а) так как имею КМС по плаванию! За полтора года прошел(ла) путь от официанта до менеджера по персоналу! После прохождения тренинга «Увеличение продаж» через месяц повысил средний чек на 15%!"
                name="achievements"
                id="frm_achievements"
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
        name: "CEAchievementsPage",

        data(){
            return {
                section: 'achievements',
                isRecruiter: false,
                value: null, // current version of item part
            }
        },

        async mounted() {
            this.value  = this.item.attributes.achievements;
        },

        computed: {
            ...mapGetters('ResumeEdit', ['item']),

            isSaved(){
                return this.value  === this.item.attributes.achievements;
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
