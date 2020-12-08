<template>
<div id="candidate-editor-title-page">
    <div class="">
        <h1 class="mb-4">Как с вами связаться</h1>
        <div>
            <user-phone
                @change="handlePhoneChange"
                :profile="item.relationships.profile"
                :errors="errors"
            />
        </div>
        <small class="text-muted">Этот номер телефона связан с профилем пользователя</small>
        <hr class="my-5"/>
        <div class="form-group">
            <label for="frm_contacts">Дополнительная информация (необязательно)</label>
            <textarea
                :value="valueContacts"
                @change="handleContactsChange"
                class="form-control"
                placeholder="Например: не звоните вечером"
                maxlength="255"
                type="text"
                name="contacts"
                id="frm_contacts"
                rows="3"
            />
        </div>
    </div>
</div>
</template>

<script>
    import UserPhone from '../../components/UserPhone.vue';
    import {mapActions, mapGetters, mapState} from 'vuex';
    import {showInfoMessage} from "../../my";

    export default {
        name: "CEContactsPage",

        components: {
            UserPhone
        },

        data(){
            return {
                section: 'contacts',
                valueContacts: '', // current version of item part,
                errors: null,
            }
        },

        mounted() {
            this.valueContacts  = this.item.attributes.contacts;
        },

        computed: {
            ...mapGetters('ResumeEdit', ['item']),

            isSaved(){
                return this.valueContacts === this.item.attributes.contacts;
            }
        },

        methods: {
            ...mapActions('ResumeEdit', ['setItemData']),

            handleContactsChange(e){
                this.valueContacts = e.target.value;
                if(!this.isSaved){
                    const field = e.target.name;
                    const value = e.target.value;
                    this.setItemData({sectionSlug: this.section, field, value}).then(() => {
                        //showInfoMessage('Сохранено');
                    }).catch(() => {
                            showInfoMessage('Произошла ошибка', 'error');
                        }
                    );
                }
            },

            handlePhoneChange(e){
                const field = e.target.name;
                const value = e.target.value;
                this.setItemData({sectionSlug: 'profile', field, value});
            }
        }
    }
</script>

<style scoped>
    h1{
        font-size: 30px;
    }
</style>
