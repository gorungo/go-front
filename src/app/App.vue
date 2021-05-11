<template>
  <div id="app" :class="{'header-padding': headerIsVisible}">
    <div class="aw">
      <app-header v-if="headerIsVisible" />
      <main>
        <router-view/>
      </main>
      <tap-nav />
      <app-footer v-if="footerIsVisible" />
    </div>
  </div>
</template>

<script>
import '@/assets/scss/app.scss'
import AppHeader from "@/app/components/app/AppHeader"
import AppFooter from "@/app/components/app/AppFooter"
import TapNav from "@/app/components/app/TapNav"
import {mapState} from "vuex";

export default {
  name: 'App',
  components: {TapNav, AppFooter, AppHeader},

  computed: {
    ...mapState('App', ['isMobile']),
    headerIsVisible(){
      return this.$route.name !== 'SignIn'
    },
    footerIsVisible(){
      return this.$route.name !== 'SignIn'
    },

  },


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
