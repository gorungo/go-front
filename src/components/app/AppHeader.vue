<template>
  <div id="header" class="header">
    <div class="header__left">
      <router-link to="/">
        <img class="header__logo-img" src="/images/logo/main_logo.svg" alt="logo" />
      </router-link>
    </div>
    <div class="header__right">
      <locale-changer />
    </div>
  </div>
</template>

<script>

import LocaleChanger from "@/components/app/LocaleChanger";
export default {
  name: "AppHeader",
  components: {LocaleChanger}
}
</script>

<style scoped lang="scss">
  #header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    width: 100%;
    height: 50px;
    background-color: var(--black);
  }
  .header__left{
    height: 32px;
    .header__logo-img{
      height: 32px;
    }
  }

  #header{
    padding: 0 20px;
  }
</style>