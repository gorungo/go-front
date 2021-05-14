<template>
  <div id="app" :class="{'header-padding': headerIsVisible}">
    <div class="aw">
      <app-header v-if="headerIsVisible" />
      <main>
        <transition>
          <router-view/>
        </transition>
      </main>
      <tap-nav v-if="isMobile"/>
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

  watch: {
    pageTitle(val){
      document.title = val
    }
  },
  mounted() {
    document.title = this.pageTitle
  },

  computed: {
    ...mapState('App', ['isMobile']),
    headerIsVisible(){
      return this.$route.name !== 'SignIn'
    },
    footerIsVisible(){
      return this.$route.name !== 'SignIn'
    },
    pageTitle(){
      if(this.$route.name && this.$t('titles.' + this.$route.name) && this.$t('titles.' + this.$route.name) !== 'titles.' + this.$route.name){
        return 'Gorungo - ' + this.$t('titles.' + this.$route.name)
      }
      return this.$t('titles.Home')
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
