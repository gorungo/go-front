<template>
  <div class="card card-body card-auth" :class="{'has-error': shake}" key="AuthLoginEmail">
    <h1 class="mb-2">{{ $t('auth.pageTitle') }}</h1>
    <template>
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
          <button :disabled="!readyToSubmit" type="submit" class="btn btn-primary auth__submit">
            {{$t('auth.btnSignIn')}}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.7929 14.7929L18.5 15.5L22 12L18.5 8.5L17.7929 9.20711L20.0858 11.5L2 11.5L2 12.5L20.0857 12.5L17.7929 14.7929Z"/>
            </svg>
          </button>
        </div>
        <router-link :to="{name:'Register'}">{{$t('auth.notRegistered')}}</router-link>
      </form>
    </template>
    <div v-if="error" class="auth-error mt-1">
      {{$t('auth.error.badCredentials')}}
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import Logger from "@/js/Logger"
import Auth from '@/app/mixins/Auth'

export default {
name: "AuthLoginEmail",
  mixins: [Auth],
  data(){
    return {
      form: {
        email: '',
        password: ''
      },

      error: null,
      shake: false,
    }
  },

  computed: {
    ...mapGetters('Auth', ['authenticated', 'user']),

    readyToSubmit(){
      return this.form.email !== '' && this.form.password !== ''
    }
  },

  methods: {
    ...mapActions('Auth', ['signIn']),
    handleInput(){
      if(this.error){
        this.error = null
      }
    },
    async submit () {
      try{
        await this.signIn(this.form)
        if(this.authenticated){
          await this.redirectAfterAuthSuccess()
        }
      } catch (e){
        if(e.response.status === 401 || e.response.status === 422){
          this.error = e.response.data
          this.shake = true
          setTimeout(() => {
            this.shake = false
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


</style>
