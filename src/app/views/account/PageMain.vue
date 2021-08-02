<template>
  <div id="PageProfileMain">
    <div v-if="userProfile" class="card card-body box-shadow">
      <account-profile-photo
          :profile="userProfile"
          :user="user"
          @change="handlePhotoChange"
      />
      <hr>
      <div class="form-group">
        <label for="name" class="form-group__label">{{$t('account.labelName')}}</label>
        <input id="name" type="text" class="form-group__input form-control" name="name" @change="handleFormChange" :value="userProfile.attributes.name" required>
      </div>
      <div class="form-group">
        <label for="username" class="form-group__label">{{$t('account.labelUserName')}}</label>
        <input id="username" type="text" class="form-group__input form-control" name="username"  @change="handleFormChange" :value="user.attributes.name" required>
      </div>
      <div class="form-group">
        <label for="email" class="form-group__label">{{$t('account.labelEmail')}}</label>
        <input id="email" type="text" class="form-group__input form-control" @change="handleFormChange" :value="user.attributes.email" name="email">
      </div>
      <div class="form-group">
        <label for="site" class="form-group__label">{{$t('account.labelSite')}}</label>
        <input id="site" type="text" class="form-group__input form-control" @change="handleFormChange" :value="userProfile.attributes.site" name="site">
      </div>
      <div class="form-group">
        <label for="phone" class="form-group__label">{{$t('account.labelPhone')}}</label>
        <input id="phone" type="text" class="form-group__input form-control"  @change="handleFormChange" :value="userProfile.attributes.phone" name="phone">
      </div>
      <div class="form-group">
        <label for="description" class="form-group__label">{{$t('account.labelDescription')}}</label>
        <input id="description" maxlength="200" type="text"  @change="handleFormChange" class="form-group__input form-control" :value="userProfile.attributes.description" name="description">
      </div>
      <div class="form-group">
        <label for="sex" class="form-group__label">{{$t('account.labelSex')}}</label>
        <select id="sex" class="form-group__input form-control" name="sex"  @change="handleFormChange" :value="userProfile.attributes.sex"  required>
          <option value="0">{{$t('account.labelSexNotSelected')}}</option>
          <option value="1">{{$t('account.labelSexMale')}}</option>
          <option value="2">{{$t('account.labelSexFemale')}}</option>
        </select>
      </div>
    </div>
    <loading v-if="loading"/>
  </div>
</template>

<script>
import Loading from "@/app/components/app/Loading"
import {mapActions, mapState} from "vuex"
import AccountProfilePhoto from "@/app/components/account/AccountProfilePhoto";
import {showNotify} from "@/js/notification";

export default {
  name: "PageProfileMain",
  components: {AccountProfilePhoto, Loading},

  data(){
    return {
      value: [],
      loading: true,
    }
  },
  async mounted() {
    if(!this.userProfile){
      await this.fetchUserProfile()
    }
    this.loading = false
  },
  metaInfo() {
    return {
      title: this.$t('meta.titles.AccountMain'),
    }
  },
  computed: {
    ...mapState('AccountProfile', ['userProfile']),
    ...mapState('Auth', ['user'])
  },
  methods: {
    ...mapActions('AccountProfile', [
      'fetchUserProfile',
      'setUserProfileField',
      'setActiveUserField'
    ]),


    handleFormChange(e){
      if(e.target.name === 'username'){
        this.setActiveUserField({
          field: 'name',
          value: e.target.value,
        }).then(()=>{
          showNotify({
            title: this.$t('text.notification'),
            message: this.$t('actionResults.saveSuccess'),
            type: 'success',
            showClose: true,
          })
        })
        return
      }
      if(e.target.name === 'email'){
        this.setActiveUserField({
          field: 'email',
          value: e.target.value,
        }).then(()=>{
          showNotify({
            title: this.$t('text.notification'),
            message: this.$t('actionResults.saveSuccess'),
            type: 'success',
            showClose: true,
          })
        })
        return
      }
      this.setUserProfileField({
        field: e.target.name,
        value: e.target.value,
      }).then(()=>{
        showNotify({
          title: this.$t('text.notification'),
          message: this.$t('actionResults.saveSuccess'),
          type: 'success',
          showClose: true,
        })
      })
    },
    handlePhotoChange(newPhotoPath){
      this.setUserProfileField({
        field: 'image_url',
        value: newPhotoPath,
      })
      this.setActiveUserField({
        field: 'image_url',
        value: newPhotoPath,
      })
    }
  }

}

</script>

<style lang="scss">

.account{
}
</style>
