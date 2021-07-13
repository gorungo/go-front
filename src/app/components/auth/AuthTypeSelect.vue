<template>
<div class="list list--auth-type-select card card-body card-auth" key="AuthType">
  <h1 class="mb-2">{{ $t('auth.pageTitle') }}</h1>
  <router-link v-if="config.auth.email_auth" :to="{name: 'LoginEmail'}" class="list__item">{{$t('auth.byMail')}}
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 13L16.17 13L12.59 16.59L14 18L20 12L14 6L12.59 7.41L16.17 11L4 11L4 13Z" />
    </svg>
  </router-link>
  <router-link v-if="config.auth.phone_auth" :to="{name: 'LoginPhone'}" class="list__item">{{$t('auth.byPhone')}}
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 13L16.17 13L12.59 16.59L14 18L20 12L14 6L12.59 7.41L16.17 11L4 11L4 13Z" />
    </svg>
  </router-link>
</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "AuthTypeSelect",
  computed: {
    ...mapState('App', ['config'])
  }

}
</script>

<style scoped lang="scss">
.list__item{
  font-weight: bold;
  svg{
    fill: var(--text-color-secondary)
  }
}


</style>
