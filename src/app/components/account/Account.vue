<template>
  <div id="account" class="account_container">
    <div class="account">
      <nav class="breadcrumbs" v-if="$route.name !== 'account'">
        <ol class="breadcrumbs__list">
          <li class="breadcrumbs__list-item">
            <router-link :to="{name:'account'}">{{$t('account.titles.account')}}</router-link>
          </li>
          <li class="breadcrumbs__list-item">
            <svg width="24" height="24" viewBox="0 0 24 24" class="breadcrumbs__list-arrow" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.70181 18.0104L15.7122 12L9.70181 5.98956L8.2876 7.40378L12.8838 12L8.2876 16.5962L9.70181 18.0104Z" />
            </svg>
            <span>{{title}}</span>
          </li>
        </ol>
      </nav>
      <h1 style="margin-top: 0.5rem;">{{title}}</h1>
      <div class="account-menu mt-5" v-if="$route.name === 'account'">
        <account-menu />
      </div>
      <main class="account-main mt-2" v-else>
        <router-view />
      </main>
    </div>
  </div>

</template>

<script>

import AccountMenu from "@/app/components/account/AccountMenu";
export default {

  name: "Account",

  components: {
    AccountMenu
  },

  data() {
    return {
      //
    }
  },

  computed: {
    title(){
      return this.$t('account.titles.' + this.$route.name)
    }
  },

  methods: {
    //
  }
}
</script>

<style scoped lang="scss">

</style>
