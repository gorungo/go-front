<template>
  <div id="header" class="header bg-white box-shadow">
    <div class="header__left">
      <logo />
    </div>
    <div class="header_center" v-if="$route.name === 'IdeaList'">
      <main-filter minimised />
    </div>
    <div class="header__right">
      <div class="header__item mr-2">
        <locale-changer />
      </div>
      <div class="header__item">
        <auth-menu />
      </div>
    </div>
  </div>
</template>

<script>

import Logo from "@/app/components/app/Logo"
import LocaleChanger from "@/app/components/app/LocaleChanger"
import AuthMenu from "@/app/components/app/AuthMenu"

export default {
  name: "AppHeader",
  components: {
    AuthMenu,
    MainFilter: () => import('@/app/components/filter/MainFilter'),
    LocaleChanger,
    Logo,
  }
}
</script>

<style>

</style>
