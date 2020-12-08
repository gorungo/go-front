<template>
    <div id="candidate-editor-profile-page" class="py-2">
        <div v-if="!isRecruiter && profile">
            <h1>Личная информация</h1>
            <div class="form-group mt-4">
                <div class="">
                    <div class="form-group user_first_name">
                        <label for="frm_first_name"
                            >Имя<span
                                title="Обязательное поле"
                                class="required-star"
                                >*</span
                            ></label
                        >
                        <input
                            @change="handleChange"
                            id="frm_first_name"
                            name="first_name"
                            class="form-control"
                            placeholder="Александр"
                            type="text"
                            maxlength="100"
                            :value="profile.attributes.first_name"
                        />
                    </div>
                    <div class="form-group user_last_name">
                        <label for="frm_last_name"
                            >Фамилия<span
                                title="Обязательное поле"
                                class="required-star"
                                >*</span
                            ></label
                        >
                        <input
                            @change="handleChange"
                            id="frm_last_name"
                            name="last_name"
                            class="form-control"
                            placeholder="Петров"
                            type="text"
                            maxlength="100"
                            :value="profile.attributes.last_name"
                        />
                    </div>
                    <div class="form-group b_date">
                        <div>
                            <label>Дата рождения</label>
                        </div>
                        <date-picker
                            v-model="profile.attributes.b_date"
                            id="frm_b_date"
                            name="b_date"
                            format="DD/MM/YYYY"
                            value-type="YYYY-MM-DD"
                            lang="ru"
                            @change="handleDateChange"
                            placeholder="ДД/ММ/ГГГГ"
                        ></date-picker>
                    </div>
                </div>
            </div>
            <hr />
            <profile-meta-selector
                @change="handleMetaChange"
                :item-meta="meta"
                :all-meta="item.meta.allMeta"
            />
            <im-student-selector
                @isStudentChange="handleIsStudentChange"
                @change="handleImStudentChange"
                @cityChange="handleCityChange"
                :value="item.relationships.candidateStudentMeta"
                :cities="cities"
                :job-types="jobTypes"
                :institute-courses="instituteCourses"
                :institutes="institutes"
                :isRecruiter="isRecruiter"
                :isStudent="item.attributes.isStudent"
            />
        </div>
        <div v-else>Загрузка</div>
    </div>
</template>

<script>
import ProfileMetaSelector from "../../components/candidate/ProfileMetaSelector";
import ImStudentSelector from "../../components/candidate/ImStudentSelector";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
    name: "CEProfilePage",

    components: { DatePicker, ProfileMetaSelector, ImStudentSelector },

    data() {
        return {
            section: "profile",
            profile: null,
            loading: false,
            meta: null, // current version of item part
            valueStudent: null // candidateStudentMeta
        };
    },

    mounted() {
        this.fetchCities();
        this.fetchInstituteCourses();
        this.fetchJobTypes();
        this.fetchInstitutes(this.item.relationships.candidateStudentMeta.attributes.city_id);
        this.profile = this.item.relationships.user.relationships.profile;
        this.meta = this.item.relationships.meta;
    },

    computed: {
        ...mapState("ResumeEdit", ["item", "isRecruiter"]),
        ...mapState("City", ["cities"]),
        ...mapState("ResumeEdit", [
            "institutes",
            "instituteCourses",
            "jobTypes"
        ]),

        isSaved() {
            return (
                this.profile === this.item.relationships.user.relationships.profile
            );
        }
    },

    methods: {
        ...mapActions("ResumeEdit", [
            "setItemData",
            "fetchInstitutes",
            "fetchInstituteCourses",
            "fetchJobTypes"
        ]),
        ...mapActions("City", ["fetchCities"]),

        handleChange(e) {
            this.$set(this.profile.attributes, e.target.name, e.target.value);
            const field = e.target.name;
            const value = e.target.value;
            if (!this.loading) {
                this.loading = true;
                this.setItemData({
                    sectionSlug: this.section,
                    field,
                    value
                }).then(() => {
                    this.loading = false;
                });
            }
        },

        handleMetaChange(meta) {
            this.meta = meta;
            const field = 'meta';
            const value = this.meta;
            this.setItemData({sectionSlug: 'profile-meta', field, value});
        },

        handleDateChange(date) {
            this.$set(this.profile.attributes, "b_date", date);
            const field = "b_date";
            const value = date;
            if (!this.loading) {
                this.loading = true;
                this.setItemData({
                    sectionSlug: this.section,
                    field,
                    value
                }).then(() => {
                    this.loading = false;
                });
            }
        },

        handleImStudentChange(value) {
            const field = "candidateStudentMeta";
            this.setItemData({
                sectionSlug: "candidateStudentMeta",
                field,
                value
            });
        },

        handleIsStudentChange(value) {
            const field = "isStudent";
            this.setItemData({ sectionSlug: "isStudent", field, value });
        },

        handleCityChange(cityId) {
            this.fetchInstitutes(cityId);
        }
    }
};
</script>

<style scoped>
h1 {
    font-size: 32px;
}
</style>
