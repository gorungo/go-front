<template>
<div id="candidate-editor-title-page">
    <div class="">
        <h1 class="mb-4">{{isRecruiter ? 'Расскажите о кандидате' : 'Расскажите о себе'}}</h1>
        <div class="form-group description mt-4">
            <label for="frm-description">{{isRecruiter ? 'Расскажите о кандидате' : 'Расскажите о себе: кто вы, чем занимаетесь, что умеете. Будьте искренними, ведь зачем что-то придумывать, если можно сказать правду!'}}</label>
            <textarea
                @change="handleChange"
                @keypress="handleInput"
                @blur="handleBlur"
                @input="handleInput"
                class="form-control"
                placeholder="Впервые хочу попробовать себя в роли официанта/бармена, хоть и был схожий опыт работы в ресторанном бизнесе в роли диджея, так что специфика ночной или стрессовой работы будет не в новинку. Получал высшее образование в Китае, где овладел навыками разговорного китайского и английского языков, уверен, что их будет достаточно для помощи в решении вопросов, возникающих у иностранных гостей. Из своих преимуществ хотел бы так же отметить ответственное отношение к работе и лёгкую обучаемость"
                name="description"
                id="frm-description"
                rows="6"
                :value="description"
            />
        </div>
        <div class="help-block">
            <small id="ce-title-input-help" class="form-text text-muted text-help">{{ helpText }}</small>
            <small class="form-text text-muted">{{ this.valueLength }}</small>
        </div>
    </div>
</div>
</template>

<script>
    import {showInfoMessage} from '../../my';
    import {mapActions, mapGetters, mapState} from 'vuex';

    export default {
        name: "CEDescriptionPage",

        data(){
            return {
                section: 'description',
                isRecruiter: false,
                description: null, // current version of item part
                valueLength: 0,
                minLength: 100,

                validation: {
                    'description' : {
                        minLength: 100,
                    }
                }
            }
        },

        async mounted() {
            this.description  = this.item.attributes.description;
            this.valueLength = this.description ? this.description.length : 0;
        },

        computed: {
            ...mapGetters('ResumeEdit', ['item']),

            isSaved(){
                return this.description  === this.item.attributes.description;
            },

            helpText() {
                if (this.valueLength >= 0 && this.valueLength <= this.minLength) {
                    return `Минимальная длина текста ${this.minLength} символов`;
                }
                if (this.valueLength > 300) {
                    return `Отлично, ваша история будет по душе работодателям!`;
                }
                return 'Вы хорошо справляетесь! Расскажите еще что-нибудь'
            },

        },

        methods: {
            ...mapActions('ResumeEdit', ['setItemData']),

            handleChange(e){
                this.description = e.target.value;
                if(!this.isSaved){
                    const field = e.target.name;
                    const value = e.target.value;
                    this.setItemData({sectionSlug: this.section, field, value});
                }

            },

            handleInput(e) {
                this.description = e.target.value;
                this.valueLength = this.description.length;
            },

            check(elName){
                let errors = [];
                if(this.validation && this.validation.hasOwnProperty(elName)){
                    if(this.validation[elName] && this.validation[elName].hasOwnProperty('minLength')){
                        if(this[elName].length < this.validation[elName].minLength){
                            errors.push({
                                [elName]:'minLength'
                            })
                        }
                    }
                    if(this[elName] && this.validation[elName].hasOwnProperty('maxLength')){
                        if(this[elName].length > this.validation[elName].maxLength){
                            errors.push({
                                [elName]:'maxLength'
                            })
                        }
                    }

                }
                return errors;
            },

            handleBlur(e) {
                const elId = e.target.id;
                const elName = e.target.name;
                if(this.check(elName).length > 0){
                    const el = document.getElementById(elId);
                    el.classList.add("input-alert");
                    setTimeout(() => {
                        const el = document.getElementById(elId);
                        el.classList.remove("input-alert");
                    }, 3000)
                }else{
                    const el = document.getElementById(elId);
                    el.classList.remove("input-alert");
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    h1{
        font-size: 30px;
    }
    .help-block {
        display: flex;
        justify-content: space-between;
    }
    .input-alert{
        border-color: red;
    }
</style>
