<template>
  <div id="login-page" class="sign-in mountains-blue" :style="{ backgroundImage: `url(${backgroundUrl})` }">
    <header class="header">
      <div class="header__left">
        <logo/>
      </div>
      <div class="header__right">
        <div class="header__item mr-2">
        <locale-changer />
        </div>
      </div>
    </header>
    <main class="center-items">
      <auth-login />
    </main>
  </div>
</template>

<script>
import AuthLogin from "@/app/components/app/AuthLogin"
import LocaleChanger from "@/app/components/app/LocaleChanger";
import Logo from "@/app/components/app/Logo";
export default {
  name: 'Login',
  components: {Logo, AuthLogin, LocaleChanger},

  data(){
    return {
      backgroundUrl: require('@/assets/images/backgrounds/mountains_blue.svg'),
    }
  },
}
</script>
<style>
.sign-in{
  min-height: 100vh;
  display: flex;
  vertical-align: middle;
  justify-content: center;
}

</style>
