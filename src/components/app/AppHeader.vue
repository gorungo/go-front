<template>
  <div id="header" class="header">
    <div class="header__left">
      <router-link to="/">
        <img class="header__logo-img" src="/images/logo/main_logo.svg" alt="logo" aria-label="Домашняя страница Gorungo" />
      </router-link>
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
  components: {AuthMenu, LocaleChanger}
}
</script>

<style scoped lang="scss">
  .header__right{
    display: flex;
  }
  .header__item{

  }


</style>
