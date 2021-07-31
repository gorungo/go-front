<template>
  <div class="card card-body card-auth" :class="{'has-error': shake}">
    <h1 class="mb-2">{{ $t('auth.register') }}</h1>
    <form @submit.prevent="submit">
      <div class="form-group">
        <label for="auth-email">
          {{ $t('auth.labelEmail') }}
        </label>
        <input class="form-control" @input="handleInput" id="auth-email" type="text" name="email" autocomplete="username" v-model="form.email"/>
      </div>
      <div class="form-group">
        <label for="auth-password">
          {{ $t('auth.labelPassword') }}
        </label>
        <input class="form-control" id="auth-password" type="password" name="password" autocomplete="current-password" v-model="form.password" />
      </div>
      <div class="form-group">
        <label for="auth-password-confirmation">
          {{ $t('auth.labelPasswordConfirmation') }}
        </label>
        <input class="form-control" id="auth-password-confirmation" type="password" name="password_confirmation" autocomplete="current-password" v-model="form.password_confirmation" />
      </div>
      <div class="form-group">
        <label for="auth-invite">
          {{ $t('auth.labelInvite') }}
        </label>
        <input class="form-control" id="auth-invite" type="text" name="invite" v-model="form.invite" />
      </div>
      <div class="form-group">
        <button :disabled="!readyToSubmit" type="submit" class="btn btn-primary auth__submit">
          {{$t('auth.btnRegister')}}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.7929 14.7929L18.5 15.5L22 12L18.5 8.5L17.7929 9.20711L20.0858 11.5L2 11.5L2 12.5L20.0857 12.5L17.7929 14.7929Z"/>
          </svg>
        </button>
      </div>
    </form>
    <ul v-if="error" class="auth-error  mt-1">
      {{$t('auth.error.badCredentials')}}
      <div v-for="(er, index) in errorsArr" :key="index">
        {{er}}
      </div>
    </ul>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import Logger from "@/js/Logger"
import {showNotify} from "@/js/notification"

export default {
  name: "AuthRegister",

  data(){
    return {
      form: {
        email: '',
        password: '',
        password_confirmation: '',
        invite: '',
      },

      error: null,
      shake: false,
    }
  },

  computed: {
    ...mapGetters('Auth', ['authenticated', 'user']),

    readyToSubmit(){
      return this.form.email !== '' && this.form.password !== '' && this.form.password_confirmation !== '' && this.form.invite !== ''
    },

    errorsArr(){
      let r = [];
      if(this.error && this.error.errors){
        Object.keys(this.error.errors).forEach(i => {
          this.error.errors[i].forEach( k => {
            r.push(k)
          })
        })
      }
      return r;
    },

  },

  methods: {
    ...mapActions('Auth', ['signIn', 'register']),
    handleInput(){
      if(this.error){
        this.error = null
      }
    },
    async submit () {
      try{
        await this.register(this.form)
        await this.signIn(this.form)
        if(this.authenticated){
          await this.$router.replace({name: 'Home', query: {'from': 'register'}})
          this.$gtag.event('register', { method: 'Google' })
          showNotify({
            title: this.$t('auth.register'),
            message: this.user.attributes.display_name + ', ' + this.$t('auth.welcome') + '!',
            type: 'success',
            showClose: true,
          });
        }
      } catch (e){
        if(e.status === 422){
          this.error = e.data
          this.shake = true;
          setTimeout(()=>{
            this.shake = false;
          }, 1000)
        }
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
.auth__error{
  background-color: rgba(255, 255, 255, 0.75);;
  color: red;
  padding: 1rem;
  border-radius: 0.5rem;
}

</style>
