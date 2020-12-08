<template>
<div id="candidate-editor-recruiter-profile-page"  class="py-2">
    <div v-if="isRecruiter && candidateProfile">
        <h1>О кандидате</h1>
        <div class="form-group mt-4">
            <div class="">
                <div class="form-group email">
                    <label for="frm_email">Email кандидата<span title="Обязательное поле" class="required-star">*</span></label>
                    <input @change="handleChange" id="frm_email" name="email" class="form-control" placeholder="user@example.com" type="text" maxlength="100" :value="candidateProfile.attributes.email" />
                </div>
                <hr/>
                <div class="form-group user_first_name">
                    <label for="frm_first_name">Имя кандидата<span title="Обязательное поле" class="required-star">*</span></label>
                    <input @change="handleChange" id="frm_first_name" name="first_name" class="form-control" placeholder="Александр" type="text" maxlength="100" :value="candidateProfile.attributes.first_name" />
                </div>
                <div class="form-group user_last_name">
                    <label for="frm_last_name">Фамилия кандидата<span title="Обязательное поле" class="required-star">*</span></label>
                    <input @change="handleChange" id="frm_last_name" name="last_name" class="form-control" placeholder="Петров" type="text" maxlength="100" :value="candidateProfile.attributes.last_name" />
                </div>
                <div class="form-group b_date">
                    <div>
                        <label>Дата рождения кандидата</label>
                    </div>
                    <date-picker v-model="candidateProfile.attributes.b_date" id="frm_b_date" name="b_date" format="DD/MM/YYYY" value-type="YYYY-MM-DD" lang="ru" @change="handleDateChange" placeholder="Укажиите дату"></date-picker>
                </div>
                <div class="form-group phone">
                    <label for="frm_phone">Номер телефона для связи с кандидатом</label>
                    <input @change="handleChange" id="frm_phone" :value="candidateProfile.attributes.phone" class="form-control" v-mask="'+7(###)###-##-##'"  maxlength="17" placeholder="+7(ХХХ)ХХХ-ХХ-ХХ" type="text" name="phone" required />
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        Загрузка
    </div>
</div>
</template>

<script>
    import DatePicker from 'vue2-datepicker';
    import 'vue2-datepicker/index.css';
    import {showInfoMessage} from '../../my';
    import {mapActions, mapGetters, mapState} from 'vuex';

    export default {
        name: "CERecruiterProfilePage",

        components: {DatePicker},

        data(){
            return {
                section: 'recruiter-profile',
                candidateProfile: null,
                loading: false,
            }
        },

        async mounted() {
            this.candidateProfile  = this.item.relationships.candidateProfile;
        },

        computed: {
            ...mapGetters('ResumeEdit', ['item', 'isRecruiter']),

            isSaved(){
                return this.candidateProfile  === this.item.relationships.candidateProfile;
            },

            formattedDate(){
                return new Date(this.candidateProfile.attributes.b_date).toLocaleDateString();
            }
        },

        methods: {
            ...mapActions('ResumeEdit', ['setItemData']),

            handleChange(e){
                this.$set(this.candidateProfile.attributes, e.target.name, e.target.value);
                const field = 'candidateProfile';
                const value = this.candidateProfile;
                if(!this.loading){
                    this.loading = true;
                    this.setItemData({sectionSlug: this.section, field, value}).then(() => {
                        this.loading = false;
                    });
                }

            },

            handleDateChange(date){
                this.$set(this.candidateProfile.attributes, 'b_date', date);
                const field = 'candidateProfile';
                const value = this.candidateProfile;
                if(!this.loading){
                    this.loading = true;
                    this.setItemData({sectionSlug: this.section, field, value}).then(() => {
                        this.loading = false;
                    });
                }
            }
        }
    }
</script>

<style scoped>
    h1{
        font-size: 32px;
    }
</style>
