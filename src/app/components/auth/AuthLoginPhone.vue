<template>
  <div>
    <phone-verification v-if="config.auth.phone_auth" :mode="mode" @verified="handleVerified"/>
    <auth-not-available v-else />
  </div>

</template>

<script>

import {mapActions, mapGetters, mapState} from 'vuex'
import PhoneVerification from "@/app/components/auth/PhoneVerification"
import Auth from '@/app/mixins/Auth'
import AuthNotAvailable from "@/app/components/auth/AuthNotAvailable";

export default {
  name: "AuthLoginPhone",
  mixins: [Auth],
  components: {AuthNotAvailable, PhoneVerification},

  data() {
    return {
      mode: 'login',
    }
  },

  computed: {
    ...mapGetters('Auth', ['authenticated', 'user']),
    ...mapState('App', ['config'])
  },


  methods: {
    ...mapActions('Auth', ['signInByToken', 'clearPhoneVerification']),

    async handleVerified(data){
      if(this.mode === 'login'){
        if(data.token){
          await this.signInByToken(data.token)
          if(this.authenticated) {
            await this.clearPhoneVerification()
            await this.redirectAfterAuthSuccess()
          }
        }
      }

    }
  }

}
</script>

<style lang="scss">

</style>
