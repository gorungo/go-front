<template>
  <div class="card card-body">
    <h1>{{ $t('auth.pageTitle') }}</h1>
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
        </button>
      </div>
    </form>
    <div v-if="error" class="auth__error">
      {{$t('auth.error.badCredentials')}}
    </div>
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
      },

      error: null,
    }
  },

  computed: {
    ...mapGetters('App', ['authenticated', 'user']),

    readyToSubmit(){
      return this.form.email !== '' && this.form.password !== ''
    }
  },

  methods: {
    ...mapActions('App', ['signIn']),
    handleInput(){
      if(this.error){
        this.error = null
      }
    },
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
        if(e.response.status === 401){
          this.error = e.response.data
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
