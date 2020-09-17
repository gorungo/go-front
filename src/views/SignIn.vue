<template>
  <div class="sign-in">
    <auth-login />
  </div>
</template>

<script>

import AuthLogin from "@/components/app/AuthLogin";
export default {
  name: 'Home',
  components: {AuthLogin},
}
</script>
