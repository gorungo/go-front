<template>
  <div id="PageProfileMain">
    <div v-if="userProfile" class="card">
      <account-profile-photo
          :profile="userProfile"
          :user="user"
          @change="handlePhotoChange"
      />
      <hr>
      <div class="form-group row align-items-center">
        <label for="name" class="col-4 col-form-label text-right">{{$t('account.labelName')}}</label>
        <div class="col-8">
          <input id="name" type="text" class="form-control" name="name" @change="handleFormChange" :value="userProfile.attributes.name" required autofocus>
        </div>
      </div>
      <div class="form-group row align-items-center">
        <label for="username" class="col-4 col-form-label text-right">{{$t('account.labelUserName')}}</label>
        <div class="col-8">
          <input id="username" type="text" class="form-control" name="username"  @change="handleFormChange" :value="user.attributes.name" required>
        </div>
      </div>
      <div class="form-group row align-items-center">
        <label for="email" class="col-4 col-form-label text-right">{{$t('account.labelEmail')}}</label>
        <div class="col-8">
          <input id="email" type="text" class="form-control" @change="handleFormChange" :value="user.attributes.email" name="email">
        </div>
      </div>
      <div class="form-group row align-items-center">
        <label for="site" class="col-4 col-form-label text-right">{{$t('account.labelSite')}}</label>
        <div class="col-8">
          <input id="site" type="text" class="form-control" @change="handleFormChange" :value="userProfile.attributes.site" name="site">
        </div>
      </div>
      <div class="form-group row align-items-center">
        <label for="phone" class="col-4 col-form-label text-right">{{$t('account.labelPhoto')}}</label>
        <div class="col-8">
          <input id="phone" type="text" class="form-control"  @change="handleFormChange" :value="userProfile.attributes.phone" name="phone">
        </div>
      </div>
      <div class="form-group row align-items-center">
        <label for="description" class="col-4 col-form-label text-right">{{$t('account.labelDescription')}}</label>
        <div class="col-8">
          <input id="description" maxlength="200" type="text"  @change="handleFormChange" class="form-control" :value="userProfile.attributes.description" name="description">
        </div>
      </div>
      <div class="form-group row align-items-center">
        <label for="sex" class="col-4 col-form-label text-right">{{$t('account.labelSex')}}</label>
        <div class="col-8">
          <select id="sex" class="form-control" name="sex"  @change="handleFormChange" :value="userProfile.attributes.sex"  required>
            <option value="0">{{$t('account.labelSexNotSelected')}}</option>
            <option value="1">{{$t('account.labelSexMale')}}</option>
            <option value="2">{{$t('account.labelSexFemale')}}</option>
          </select>
        </div>
      </div>
    </div>
    <loading v-if="loading"/>
  </div>
</template>

<script>
import Loading from "@/app/components/app/Loading"
import {mapActions, mapState} from "vuex"
import AccountProfilePhoto from "@/app/components/account/AccountProfilePhoto";

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
  computed: {
    ...mapState('AccountProfile', ['userProfile']),
    ...mapState('App', ['user'])
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
        })
        return
      }
      if(e.target.name === 'email'){
        this.setActiveUserField({
          field: 'email',
          value: e.target.value,
        })
        return
      }
      this.setUserProfileField({
        field: e.target.name,
        value: e.target.value,
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
