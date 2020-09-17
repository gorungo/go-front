<template>
  <div>
    <div>
      {{ $t('auth.pageTitle') }}
    </div>
    <form @submit.prevent="submit">
      <div>
        <label for="auth-email">
          {{ $t('auth.labelEmail') }}
        </label>
        <input id="auth-email" type="text" name="email" v-model="form.email"/>
      </div>
      <div>
        <label for="auth-password">
          {{ $t('auth.labelPassword') }}
        </label>
        <input id="auth-password" type="password" name="password" v-model="form.password" />
      </div>
      <div>
        <button>
          {{$t('auth.btnSignIn')}}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
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

  methods: {
    ...mapActions('App', ['signIn']),
    async submit () {
      await this.signIn(this.form);
    }
  }
}
</script>

<style scoped>

</style>