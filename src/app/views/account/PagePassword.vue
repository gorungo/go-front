<template>
  <div id="PagePassword" class="card card-body box-shadow">
    <div class="form-group">
      <label for="password" class="form-group__label">{{$t('account.labelPasswordOld')}}</label>
      <input id="password-old" :value="password.old" type="password" class="form-group__input form-control" name="password" required>
    </div>
    <hr>
    <div class="form-group">
      <label for="password" class="form-group__label">{{$t('account.labelPasswordNew')}}</label>
      <input id="password" :value="password.new" type="password" class="form-group__input form-control" name="password" required>
    </div>
    <div class="form-group">
      <label for="password-confirm" class="form-group__label">{{$t('account.labelPasswordConfirmation')}}</label>
      <input id="password-confirm" v-model="password.new_confirmation" type="password" class="form-group__input form-control" name="password_confirmation" required>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import {showNotify} from "@/js/notification";
export default {
  name: "PageProfilePassword",

  data(){
    return {
      value: [],
      loading: true,
      password: {
        old: '',
        new: '',
        new_confirmation: ''
      }
    }
  },
  async mounted() {

  },

  metaInfo() {
    return {
      title: this.$t('meta.titles.AccountPassword'),
    }
  },

  computed: {
    ...mapState('Auth', ['user'])
  },

  methods: {
    ...mapActions('Auth', [
      'setUserPassword',
    ]),

    handleSetUserPassword(){
      this.setUserPassword({
        email: this.user.attributes.email,
        old: this.password.old,
        new: this.password.new,
        new_confirmation: this.password.new_confirmation
      }).then(()=>{
        showNotify({
          title: this.$t('auth.login'),
          message: this.$t('auth.welcome') + '!',
          type: 'success',
          showClose: true,
        });
      })

    }
  },



}

</script>

<style lang="scss">

</style>
