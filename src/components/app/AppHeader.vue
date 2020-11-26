<template>
  <div id="header" class="header box-shadow">
    <div class="header__left">
      <router-link to="/">
        <img class="header__logo-img" src="/images/logo/main_logo_color.svg" alt="logo" aria-label="Домашняя страница Gorungo" />
      </router-link>
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

import LocaleChanger from "@/components/app/LocaleChanger";
import AuthMenu from "@/components/app/AuthMenu";

export default {
  name: "AppHeader",
  components: {
    AuthMenu,
    MainFilter: () => import('@/components/filter/MainFilter'),
    LocaleChanger
  }
}
</script>

<style>

</style>
