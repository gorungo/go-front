<template>
  <div id="app" :class="{'header-padding': headerIsVisible}">
    <editor />
  </div>
</template>

<script>
import '@/assets/scss/app.scss'
import Editor from "@/editor/componenrts/editor/Editor";

export default {
  name: 'Home',
  components: {Editor},

  computed: {
    headerIsVisible(){
      return this.$route.name !== 'SignIn'
    },
    footerIsVisible(){
      return this.$route.name !== 'SignIn'
    }

  }


}
</script>

<style>

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
