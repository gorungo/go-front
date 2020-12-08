<template>
    <div id="candidate-editor-title-page" class="py-2">
        <div class="">
            <h1>Заголовок резюме</h1>
            <template>
                <div class="form-group mt-4">
                    <label for="ce-title-input">Введите заголовок резюме</label>
                    <textarea @change="handleChange" minlength="10" maxlength="100" @keypress="handleInput"
                              class="form-control"
                              placeholder="Работаю в ресторанном бизнесе около 15 лет. Проходил обучение в Москве"
                              name="title" id="ce-title-input" aria-describedby="ce-title-input-help" rows="3"
                              :value="value"></textarea>
                </div>
                <div class="help-block" v-if="value">
                    <small id="ce-title-input-help" class="form-text text-muted text-help">{{ helpText }}</small>
                    <small class="form-text text-muted">{{ this.value.length }}/{{ this.maxLength }}</small>
                </div>
            </template>

        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
    name: "IETitlePage",

    data() {
        return {
            section: 'title',
            value: null, // current version of item part
            valueLength: 0,
            minLength: 10,
            maxLength: 100,
        }
    },

    async mounted() {
        this.value = this.item.attributes.title ? this.item.attributes.title : null;
        this.valueLength = this.value ? this.value.length : 0;
    },

    computed: {
        ...mapGetters('ResumeEdit', ['item']),

        isSaved() {
            return this.value === this.item.attributes.title;
        },

        valid() {
            return this.valueLength >= this.minLength && this.valueLength <= this.maxLength;
        },

        helpText() {
            if (this.valueLength > 0 && this.valueLength <= this.minLength) {
                return `Минимальная длина текста ${this.minLength} символов`;
            }
            if (this.valueLength > this.maxLength) {
                return `Минимальная длина текста ${this.minLength} символов`;
            }
            return 'Например, ищу работу уборщиком'
        }
    },

    methods: {
        ...mapActions('ResumeEdit', ['setItemData']),

        handleChange(e) {
            this.value = e.target.value;
            this.valueLength = e.target.value.length;
            if (!this.isSaved) {
                const field = e.target.name;
                const value = e.target.value;
                try{
                    this.setItemData({sectionSlug: this.section, field, value});
                } catch (e){
                  //
                }
            }

        },

        handleInput(e) {
            this.value = e.target.value;
            this.valueLength = this.value.length;
        },
    }
}
</script>

<style scoped lang="scss">
h1 {
    font-size: 32px;
}

.help-block {
    display: flex;
    justify-content: space-between;
}
</style>
