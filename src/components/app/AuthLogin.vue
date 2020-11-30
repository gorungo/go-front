<template>
  <div class="card card-body">
    <h1>{{ $t('auth.pageTitle') }}</h1>
    <form @submit.prevent="submit">
      <div class="form-group">
        <label for="auth-email">
          {{ $t('auth.labelEmail') }}
        </label>
        <input class="form-control" id="auth-email" type="text" name="email" autocomplete="username" v-model="form.email"/>
      </div>
      <div class="form-group">
        <label for="auth-password">
          {{ $t('auth.labelPassword') }}
        </label>
        <input class="form-control" id="auth-password" type="password" name="password" autocomplete="current-password" v-model="form.password" />
      </div>
      <div class="form-group">
        <button class="btn btn-primary">
          {{$t('auth.btnSignIn')}}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import Logger from "@/js/Logger"
import {showNotify} from "@/js/notification"

export default {
name: "AuthLogin",

  data(){
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },

  computed: {
    ...mapGetters('App', ['authenticated', 'user']),
  },

  methods: {
    ...mapActions('App', ['signIn']),
    async submit () {
      try{
        await this.signIn(this.form)
        if(this.authenticated){
          await this.$router.replace({name: 'Home'})
          showNotify({
            title: this.$t('auth.login'),
            message: this.user.attributes.displayName + ', ' + this.$t('auth.welcome') + '!',
            type: 'success',
            showClose: true,
          });
        }
      } catch (e){
        Logger.error(e)
      }

    }
  }
}
</script>

<style scoped>
.card{
  min-width: 300px;
}
</style>
