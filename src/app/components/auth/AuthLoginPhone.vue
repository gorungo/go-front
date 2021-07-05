<template>
  <phone-verification :mode="mode" @verified="handleVerified"/>

</template>

<script>

import {mapActions, mapGetters} from 'vuex'
import PhoneVerification from "@/app/components/auth/PhoneVerification"
import Auth from '@/app/mixins/Auth'

export default {
  name: "AuthLoginPhone",
  mixins: [Auth],
  components: {PhoneVerification},

  data() {
    return {
      mode: 'login',
    }
  },

  computed: {
    ...mapGetters('Auth', ['authenticated', 'user']),
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
