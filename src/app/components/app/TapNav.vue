<template>
  <nav class="tap-nav">
    <ul>
      <li class="tap-nav__item">
        <router-link exact class="tap-nav__link" :to="{name: 'Home'}" target="_top">
          <svg class="tap-nav__item-icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 14C3.794 14 2 15.794 2 18C2 20.206 3.794 22 6 22C8.199 22 9.987 20.216 9.998 18.02H10V16H14V18.039H14.004C14.025 20.226 15.808 22 18 22C20.206 22 22 20.206 22 18C22 15.794 20.206 14 18 14H16V10H18C20.206 10 22 8.206 22 6C22 3.794 20.206 2 18 2C15.794 2 14 3.794 14 6V8H10V5.98H9.998C9.987 3.784 8.199 2 6 2C3.794 2 2 3.794 2 6C2 8.206 3.794 10 6 10H8V14H6ZM8 18C8 19.122 7.121 20 6 20C4.879 20 4 19.122 4 18C4 16.878 4.879 16 6 16H8V18ZM18 16C19.121 16 20 16.878 20 18C20 19.122 19.121 20 18 20C16.879 20 16 19.122 16 18V16H18ZM16 6C16 4.878 16.879 4 18 4C19.121 4 20 4.878 20 6C20 7.122 19.121 8 18 8H16V6ZM6 8C4.879 8 4 7.122 4 6C4 4.878 4.879 4 6 4C7.121 4 8 4.878 8 6V8H6ZM10 10H14V14H10V10Z" />
          </svg>
          <span class="tap-nav__item-title">{{ $t('tapNav.home') }}</span>
        </router-link>
      </li>
      <li class="tap-nav__item" v-if="!user">
        <router-link class="tap-nav__link" :to="{name: 'Login'}" target="_top">
          <svg class="tap-nav__item-icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 14C14.2091 14 16 12.2091 16 10C16 7.79086 14.2091 6 12 6C9.79086 6 8 7.79086 8 10C8 12.2091 9.79086 14 12 14ZM12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.9261 20.0557C20.397 18.235 22 15.3047 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 15.3047 3.60301 18.235 6.07388 20.0557C6.11934 20.0892 6.16509 20.1223 6.21112 20.1551C6.65997 20.4742 7.1363 20.7573 7.63587 21C8.95464 21.6407 10.4354 22 12 22C13.5646 22 15.0454 21.6407 16.3641 21C16.3909 20.987 16.4177 20.9738 16.4443 20.9606C16.9657 20.7015 17.4613 20.3982 17.9261 20.0557ZM17.2287 18.055C18.926 16.588 20 14.4194 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 14.4194 5.07401 16.588 6.77128 18.055C7.80066 16.2313 9.75654 15 12 15C14.2435 15 16.1993 16.2313 17.2287 18.055ZM15.5567 19.1679C14.8921 17.8803 13.5488 17 12 17C10.4512 17 9.10792 17.8803 8.44332 19.1679C9.51467 19.7005 10.7224 20 12 20C13.2776 20 14.4853 19.7005 15.5567 19.1679Z"/>
          </svg>
          <span class="tap-nav__item-title">{{ $t('tapNav.login') }}</span>
        </router-link>
      </li>
      <li class="tap-nav__item" v-else>
        <router-link class="tap-nav__link" :to="{name: 'Account'}" target="_top">
          <svg class="tap-nav__item-icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 14C14.2091 14 16 12.2091 16 10C16 7.79086 14.2091 6 12 6C9.79086 6 8 7.79086 8 10C8 12.2091 9.79086 14 12 14ZM12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.9261 20.0557C20.397 18.235 22 15.3047 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 15.3047 3.60301 18.235 6.07388 20.0557C6.11934 20.0892 6.16509 20.1223 6.21112 20.1551C6.65997 20.4742 7.1363 20.7573 7.63587 21C8.95464 21.6407 10.4354 22 12 22C13.5646 22 15.0454 21.6407 16.3641 21C16.3909 20.987 16.4177 20.9738 16.4443 20.9606C16.9657 20.7015 17.4613 20.3982 17.9261 20.0557ZM17.2287 18.055C18.926 16.588 20 14.4194 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 14.4194 5.07401 16.588 6.77128 18.055C7.80066 16.2313 9.75654 15 12 15C14.2435 15 16.1993 16.2313 17.2287 18.055ZM15.5567 19.1679C14.8921 17.8803 13.5488 17 12 17C10.4512 17 9.10792 17.8803 8.44332 19.1679C9.51467 19.7005 10.7224 20 12 20C13.2776 20 14.4853 19.7005 15.5567 19.1679Z"/>
          </svg>
          <span class="tap-nav__item-title">{{ $t('tapNav.account') }}</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "TapNav",

  computed: {
    ...mapState('Auth', ['user'])
  }

}
</script>

<style scoped>

</style>
