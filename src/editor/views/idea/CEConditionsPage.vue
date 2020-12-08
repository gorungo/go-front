<template>
<div id="candidate-editor-conditions-page">
    <div class="">
        <h1 class="mb-4">Ожидания от работы</h1>
        <p>Чего вы ожидаете от будущей работы, и какие условия труда вас бы устроили?</p>
        <div class="form-group description">
            <textarea
                @change="handleChange"
                class="form-control"
                placeholder="Для меня важно- сменный график 3/3; могу работать только в вечернее время; своевременная выплата зароботной платы; рассматриваю район от центра до луговой; возможность карьерного роста и корпоративного обучения"
                name="conditions"
                id="frm_description"
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
        name: "CEConditionsPage",

        data(){
            return {
                section: 'conditions',
                isRecruiter: false,
                value: null, // current version of item part
            }
        },

        async mounted() {
            this.value  = this.item.attributes.conditions;
        },

        computed: {
            ...mapGetters('ResumeEdit', ['item']),

            isSaved(){
                return this.value  === this.item.attributes.conditions;
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
