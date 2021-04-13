<template>
  <nav class="account-menu">
    <div class="account-menu__nav">
      <router-link exact class="account-menu__nav-item box-shadow" :to="{name:'accountMain'}">
        <div class="account-menu__item-title">{{$t('account.titles.accountMain')}}</div>
      </router-link>
      <router-link exact class="account-menu__nav-item box-shadow" :to="{name:'accountPassword'}">
        <div class="account-menu__item-title">{{$t('account.titles.accountPassword')}}</div>
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
.account-menu{
  display: flex;
  flex-direction: column;
  width: 100%;
  .account-menu__nav{
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    margin: 0 calc( -1 * var(--grid-row-gap));
  }
  .account-menu__nav-item{
    width: calc(50% - 2*var(--grid-row-gap));
    height: 200px;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-card);
    margin: 0 var(--grid-row-gap);
    padding: var(--grid-row-gap);
  }
  .account-menu__item-title{
    font-weight: bold;
    font-size: 20px;
  }
  .account-menu__nav-link{
    padding: 0.5rem;
  }
}
</style>
