<template>
  <div id="login-page" class="sign-in mountains-blue" :style="{ backgroundImage: `url(${backgroundUrl})` }">
    <div class="x">
      <auth-login />
    </div>
  </div>
</template>

<script>
import AuthLogin from "@/components/app/AuthLogin"
export default {
  name: 'Home',
  components: {AuthLogin},

  data(){
    return {
      backgroundUrl: require('@/assets/images/backgrounds/mountains_blue.svg'),
    }
  },
}
</script>
<style>
.sign-in{
  height: 90vh;
  display: flex;
  vertical-align: middle;
  justify-content: center;
}
.x{
  display: flex;
  align-items: center;
}


</style>
