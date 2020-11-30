<template>
  <div id="header" class="header bg-white box-shadow">
    <div class="header__left">
      <logo />
    </div>
    <div class="header_center" v-if="$route.name !== 'Home'">
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

import Logo from "@/components/app/Logo"
import LocaleChanger from "@/components/app/LocaleChanger"
import AuthMenu from "@/components/app/AuthMenu"

export default {
  name: "AppHeader",
  components: {
    AuthMenu,
    MainFilter: () => import('@/components/filter/MainFilter'),
    LocaleChanger,
    Logo,
  }
}
</script>

<style>

</style>
