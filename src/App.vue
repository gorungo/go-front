<template>
  <div id="app" :class="{'header-padding': headerIsVisible}">
    <app-header v-if="headerIsVisible" />
    <main>
      <router-view/>
    </main>
    <app-footer v-if="footerIsVisible" />
  </div>
</template>

<script>
import '@/assets/scss/app.scss'
import AppHeader from "@/components/app/AppHeader"
import AppFooter from "@/components/app/AppFooter"

export default {
  name: 'Home',
  components: {AppFooter, AppHeader},

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
