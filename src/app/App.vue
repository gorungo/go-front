<template>
  <div id="app">
    <div class="aw" :class="{'header-padding': headerIsVisible}">
      <app-header v-if="headerIsVisible" />
      <div v-if="updateExists">
        Update available
        <button @click="refreshApp">
          Refresh page
        </button>
      </div>
      <main>
        <transition>
          <router-view/>
        </transition>
      </main>
      <tap-nav v-if="isMobile && tapNavIsVisible"/>
      <app-footer v-if="footerIsVisible" />
    </div>
  </div>
</template>

<script>
import '@/assets/scss/app.scss'
import AppHeader from "@/app/components/app/AppHeader"
import AppFooter from "@/app/components/app/AppFooter"
import TapNav from "@/app/components/app/TapNav"
import {mapState} from "vuex"
import AppUpdate from "@/app/mixins/app-update"

export default {
  name: 'App',
  components: {TapNav, AppFooter, AppHeader},
  mixins: [AppUpdate],

  data(){
    return {
      noHeaderComponents: ['Login', 'LoginEmail', 'LoginPhone', 'LoginType', 'Register']
    }
  },

  metaInfo() {
    return {
      titleTemplate: chunk => {
        // If undefined or blank then we don't need the hyphen
        return chunk ? chunk + ' | ' +  this.$t('meta.title') : this.$t('meta.titles.Home');
      },
      meta: [
        {
          name: 'description',
          content: this.metaDescription,
        },
        {
          property: 'og:title',
          // following template options are identical
          // template: '%s - My page',
          template: chunk => chunk ? chunk + ' | ' +  this.$t('meta.title') : this.$t('meta.titles.Home'),
          vmid: 'og:title'
        }
      ]
    }
  },

  computed: {
    ...mapState('App', ['isMobile']),
    metaDescription(){
      return this.$t('meta.description')
    },
    noPanels(){
      return this.noHeaderComponents.indexOf(this.$route.name) > -1 && this.isMobile
    },
    headerIsVisible(){
      return this.noHeaderComponents.indexOf(this.$route.name) === -1
    },
    footerIsVisible(){
      return this.noHeaderComponents.indexOf(this.$route.name) === -1
    },
    tapNavIsVisible(){
      return this.noHeaderComponents.indexOf(this.$route.name) === -1
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
