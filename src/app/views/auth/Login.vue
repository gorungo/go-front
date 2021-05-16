<template>
  <div id="login-page" class="mountains-blue" :style="{ backgroundImage: `url(${backgroundUrl})` }">
    <main class="center-items auth">
      <div class="auth__logo">
        <logo />
      </div>
      <auth-login />
      <div class="auth__goback">
        <go-back />
      </div>
    </main>
  </div>
</template>

<script>
import AuthLogin from "@/app/components/app/AuthLogin"
import LocaleChanger from "@/app/components/app/LocaleChanger";
import Logo from "@/app/components/app/Logo";
import GoBack from "@/app/components/app/GoBack";
export default {
  name: 'Login',
  components: {GoBack, Logo, AuthLogin, LocaleChanger},

  data(){
    return {
      backgroundUrl: require('@/assets/images/backgrounds/mountains_blue.svg'),
    }
  },
}
</script>
<style>
.auth{
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.auth__logo{
  margin-bottom: 2rem;
}
.auth__goback{
  color: white;
  margin-top: 3rem;
}

.auth__goback svg{
  fill: rgba(255, 255, 255, 0.75);
}

</style>
