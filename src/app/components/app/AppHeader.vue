<template>
  <div id="header" class="header bg-white box-shadow">
    <template v-if="isMobile">
      <div class="header__left">
        <logo v-if="logoIsVisible" />
        <go-back v-if="$route.name !== 'Home'" :to="{name:'Home'}"/>
      </div>
      <div class="header__center" v-if="$route.name === 'IdeaList'">
        <main-filter minimised :isMobile="isMobile" />
      </div>
      <div class="header__right" v-if="false">
        <button type="button" class="btn header__filters-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.5 9.5C11.0855 9.5 12.4248 8.44574 12.8551 7H22V5H12.8551C12.4248 3.55426 11.0855 2.5 9.5 2.5C7.567 2.5 6 4.067 6 6C6 7.933 7.567 9.5 9.5 9.5ZM11 6C11 6.82843 10.3284 7.5 9.5 7.5C8.67157 7.5 8 6.82843 8 6C8 5.17157 8.67157 4.5 9.5 4.5C10.3284 4.5 11 5.17157 11 6Z"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 15.5C18.0855 15.5 19.4248 14.4457 19.8551 13H22V11H19.8551C19.4248 9.55426 18.0855 8.5 16.5 8.5C14.567 8.5 13 10.067 13 12C13 13.933 14.567 15.5 16.5 15.5ZM16.5 13.5C17.3284 13.5 18 12.8284 18 12C18 11.1716 17.3284 10.5 16.5 10.5C15.6716 10.5 15 11.1716 15 12C15 12.8284 15.6716 13.5 16.5 13.5Z"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 21.5C9.433 21.5 11 19.933 11 18C11 16.067 9.433 14.5 7.5 14.5C5.91449 14.5 4.57521 15.5543 4.14494 17H2V19H4.14494C4.57521 20.4457 5.91449 21.5 7.5 21.5ZM7.5 19.5C8.32843 19.5 9 18.8284 9 18C9 17.1716 8.32843 16.5 7.5 16.5C6.67157 16.5 6 17.1716 6 18C6 18.8284 6.67157 19.5 7.5 19.5Z"/>
            <path d="M12 17H22V19H12V17Z" />
            <path d="M12 11H2V13H12V11Z" />
            <path d="M5 5H2V7H5V5Z"/>
          </svg>
        </button>
      </div>
    </template>
    <template v-else>
      <div class="header__left">
        <logo />
      </div>
      <div class="header__center" v-if="$route.name === 'IdeaList'">
        <main-filter minimised />
      </div>
      <div class="header__right">
        <div class="header__item">
          <locale-changer />
        </div>
        <div class="header__item">
          <auth-menu />
        </div>
      </div>
    </template>
  </div>
</template>

<script>

import Logo from "@/app/components/app/Logo"
import GoBack from "@/app/components/app/GoBack"
import LocaleChanger from "@/app/components/app/LocaleChanger"
import AuthMenu from "@/app/components/auth/AuthMenu"

export default {
  name: "AppHeader",
  components: {
    AuthMenu,
    MainFilter: () => import('@/app/components/filter/MainFilter'),
    LocaleChanger,
    Logo,
    GoBack
  },

  computed: {
    isMobile(){
      return this.$root.isMobile
    },

    logoIsVisible(){
      return this.$route.name === 'Home' || this.$route.name !== 'Home' && !this.isMobile
    }
  }
}
</script>

<style>

</style>
