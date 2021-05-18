<template>
  <div id="login-page" class="mountains-blue" :style="{ backgroundImage: `url(${backgroundUrl})` }">
    <main class="center-items auth">
      <div class="auth__logo">
        <logo />
      </div>
      <auth-register />
      <div class="auth__goback">
        <go-back />
      </div>
    </main>
  </div>
</template>

<script>
import AuthRegister from "@/app/components/app/AuthRegister"
import Logo from "@/app/components/app/Logo";
import GoBack from "@/app/components/app/GoBack";
export default {
  name: 'Register',
  components: {Logo, GoBack, AuthRegister},

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
