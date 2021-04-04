<template>
  <div id="PageProfileMain">
    <div v-if="profile & !loading">
      <div class="form-group row">
        <div class="col-md-4 col-form-label text-md-right">
          <div id="profile-photo">
            <img :src="profile.attributes.imageUrl"  style="height:2.5rem;"/>
          </div>
        </div>
        <div class="col-md-8">
          <div>{{$t('profile.labelPhoto')}}</div>
          <div class="file-upload bs">
            <a>{{$t('profile.labelPhotoChange')}}</a>
            <input type="file" name="image" id="file_uploader" accept="image/*" @change="fileInputChange" />
          </div>
        </div>
      </div>
      <hr>
      <div class="form-group row">
        <label for="name" class="col-md-4 col-form-label text-md-right">{{$t('profile.labelName')}}</label>
        <div class="col-md-8">
          <input id="name" type="text" class="form-control" name="name" :value="profile.attributes.name" required autofocus>
        </div>
      </div>
      <div class="form-group row">
        <label for="name" class="col-md-4 col-form-label text-md-right">{{$t('profile.labelUserName')}}</label>
        <div class="col-md-8">
          <input id="username" type="text" class="form-control" name="username" :value="profile.relationships.user.attributes.name" required>
        </div>
      </div>
      <div class="form-group row">
        <label for="site" class="col-md-4 col-form-label text-md-right">{{$t('profile.labelEmail')}}</label>
        <div class="col-md-8">
          <input id="email" type="text" class="form-control" :value="profile.relationships.user.attributes.email" name="email">
        </div>
      </div>
      <div class="form-group row">
        <label for="site" class="col-md-4 col-form-label text-md-right">{{$t('profile.labelSite')}}</label>
        <div class="col-md-8">
          <input id="site" type="text" class="form-control" :value="profile.attributes.site" name="site">
        </div>
      </div>
      <div class="form-group row">
        <label for="site" class="col-md-4 col-form-label text-md-right">{{$t('profile.labelPhoto')}}</label>
        <div class="col-md-8">
          <input id="phone" type="text" class="form-control" :value="profile.attributes.phone" name="site">
        </div>
      </div>
      <div class="form-group row">
        <label for="description" class="col-md-4 col-form-label text-md-right">{{$t('profile.labelDescription')}}</label>
        <div class="col-md-8">
          <input id="description" maxlength="200" type="text" class="form-control" :value="profile.attributes.description" name="description">
        </div>
      </div>
      <div class="form-group row">
        <label for="sex" class="col-md-4 col-form-label text-md-right">{{$t('profile.labelSex')}}</label>
        <div class="col-md-8">
          <select id="sex" class="form-control" name="sex" :value="profile.attributes.sex"  required>
            <option value="0">{{$t('profile.labelSexNotSelected')}}</option>
            <option value="1">{{$t('profile.labelSexMale')}}</option>
            <option value="2">{{$t('profile.labelSexFemale')}}</option>
          </select>
        </div>
      </div>
    </div>
    <loading v-if="loading"/>
  </div>
</template>

<script>
import Loading from "@/app/components/app/Loading";
import {mapActions, mapState} from "vuex";
export default {
  name: "PageProfileMain",

  components: {Loading},

  data(){
    return {
      value: [],
      loading: true,
    }
  },
  async mounted() {
    if(!this.profile){
      this.fetchProfile()
    }
    this.loading = false
  },
  computed: {
    ...mapState('Profile', ['profile'])
  },
  methods: {
    ...mapActions('Profile', ['fetchProfile'])
  }

}

</script>

<style lang="scss">

</style>
