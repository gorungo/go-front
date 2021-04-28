<template>
  <nav class="account-menu">
    <div class="account-menu__nav">
      <router-link exact class="account-menu__nav-item box-shadow" :to="{name:'AccountMain'}">
        <div class="account-menu__item-title">{{$t('account.titles.AccountMain')}}</div>
      </router-link>
      <router-link exact class="account-menu__nav-item box-shadow" :to="{name:'AccountPassword'}">
        <div class="account-menu__item-title">{{$t('account.titles.AccountPassword')}}</div>
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
name: "AccountMenu"
}
</script>

<style scoped lang="scss">

</style>
