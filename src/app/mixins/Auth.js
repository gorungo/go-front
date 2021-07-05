import {showNotify} from "@/js/notification";

export default {
  methods: {
    async redirectAfterAuthSuccess(){
      this.$gtag.event('login', { method: 'Google' })
      await this.$router.replace({name: 'Home'})
      showNotify({
        title: this.$t('auth.login'),
        message: this.user.attributes.display_name + ', ' + this.$t('auth.welcome') + '!',
        type: 'success',
        showClose: true,
      });
    },
  }
}
