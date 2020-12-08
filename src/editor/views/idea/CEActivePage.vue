<template>
<div id="candidate-editor-active-page">
    <div class="">
        <h1 class="mb-4">Публикация резюме</h1>
        <template v-if="readyToPublish">
            <div class="form-group custom-control custom-switch mt-4">
                <input
                    id="activeSwitch"
                    @change="handleChangeActive"
                    :disabled="!readyToPublish"
                    name="active" :true-value="1"
                    :false-value="0" :checked="readyToPublish ? valueActive : 0"
                    type="checkbox"
                    class="custom-control-input"
                >
                <label dusk="active" class="custom-control-label" for="activeSwitch">Резюме {{ valueActive === 1 ? ' активно': 'неактивно'}}</label>
            </div>
            <p class="text-muted">
                Вы можете управлять активностью резюме. Неактивное резюме не будет видно для другим пользователям
            </p>
        </template>
        <template v-if="!readyToPublish">
                <p v-if="isMobile">
                    Боковое меню с разделами открывается кнопкой
                    <span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 8V6H21V8H3Z" fill="var(--primary)"/>
                            <path d="M3 13H21V11H3V13Z" fill="var(--primary)"/>
                            <path d="M3 18H21V16H3V18Z" fill="var(--primary)"/>
                        </svg>
                    </span>
                    слева
                </p>
                <p>Для публикации резюме необходимо заполнить все секции
                    <svg width="20" height="20" viewBox="0 0 24 24" style="height: 20px; width: 20px;">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12ZM10 14.17L16.59 7.58002L18 9.00002L10 17L6 13L7.41 11.59L10 14.17Z" fill="var(--primary)"/>
                    </svg>
                    в разделе "Основное"</p>
                <p>Незаполненные секции помечаются
                    <svg viewBox="0 0 24 24" role="img" focusable="false" style="height: 18px; width: 18px; fill: var(--orange);">
                        <path data-v-606343ff="" d="m12 24c-6.63 0-12-5.37-12-12s5.37-12 12-12 12 5.37 12 12-5.37 12-12 12z"></path>
                        <path data-v-606343ff="" d="m12 16.13c.62 0 1.13.5 1.13 1.13s-.5 1.13-1.13 1.13-1.13-.5-1.13-1.13.5-1.13 1.13-1.13zm-.06-11.12c-.65.03-1.14.58-1.11 1.23l.38 7.41c.01.2.17.36.37.36h.83c.2 0 .36-.16.37-.36l.38-7.41c0-.03 0-.03 0-.06 0-.65-.52-1.17-1.17-1.17-.03 0-.03 0-.06 0z" fill="#fff"></path>
                    </svg>
                    восклицательным знаком
                </p>
                <p>Вы можете перемещаться между секциями, используя кнопки "Назад" и "Далее", либо выбрав необходимую секцию в боковом меню</p>
                <p>Чтобы быстро перейти к первой незаполненной секции, нажмите текст между кнопками "Назад" и "Далее"</p>

            <div class="card card-body">
                <small>Статус</small>
                <div>Резюме не готово к публикации, заполните все необходимые разделы</div>
            </div>
        </template>

    </div>
</div>
</template>

<script>
    import DatePicker from 'vue2-datepicker';
    import 'vue2-datepicker/index.css';
    import {mapActions, mapGetters, mapState} from 'vuex';
    import {showInfoMessage} from "../../my";

    export default {
        name: "CEActivePage",

        components: {
            DatePicker
        },

        data(){
            return {
                section: 'active',
                valueActive: '', // current version of item part,
                errors: null,
            }
        },

        async mounted() {
            this.valueActive  = this.item.attributes.active;
        },

        computed: {
            ...mapGetters('ResumeEdit', ['item', 'readyToPublish']),
            ...mapState('ResumeEdit', ['isMobile']),

            isSaved(){
                return this.valueActive === this.item.attributes.active && this.valueDeadline === this.item.attributes.deadline;
            }
        },

        methods: {
            ...mapActions('ResumeEdit', ['setItemData']),
            ...mapActions('City', ['fetchCities']),

            handleChangeActive(e){
                this.valueActive = e.target.checked ? 1 : 0;
                if(!this.isSaved){
                    const field = e.target.name;
                    const value = this.valueActive;
                    this.setItemData({sectionSlug: this.section, field, value}).then(() => {
                        //
                    }).catch(() => {
                            showInfoMessage('Произошла ошибка', 'error');
                        }
                    );
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
