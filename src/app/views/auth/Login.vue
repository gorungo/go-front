<template>
  <div id="login-page" class="mountains-blue" :style="{ backgroundImage: `url(${backgroundUrl})` }">
    <main class="center-items auth">
      <div class="auth__logo">
        <logo />
      </div>
      <transition appear name="fade" mode="out-in">
        <router-view />
      </transition>
      <div class="auth__goback">
        <go-back />
      </div>
    </main>
  </div>
</template>

<script>
import Logo from "@/app/components/app/Logo"
import GoBack from "@/app/components/app/GoBack"
import AuthTypeSelect from "@/app/components/auth/AuthTypeSelect";

export default {
  name: 'Login',
  components: {AuthTypeSelect, GoBack, Logo},

  data(){
    return {
      backgroundUrl: require('@/assets/images/backgrounds/mountains_blue.svg'),
      loginTypes: ['email', 'phone', 'social'],
      loginType: 'email',
    }
  },

  methods: {
    handleLoginTypeSelect(type){

    }
  }
}
</script>
<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
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
