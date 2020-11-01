<template>
  <div id="app">
    <app-header />
    <main>
      <router-view/>
    </main>
    <footer>
      <app-footer />
    </footer>
  </div>
</template>

<script>
import '@/assets/scss/app.scss'
import AppHeader from "@/components/app/AppHeader"
import AppFooter from "@/components/app/AppFooter";
export default {
  name: 'Home',
  components: {AppFooter, AppHeader},

  methods: {
    setLocale(){

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
