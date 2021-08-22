<template>
<div id="HomeHeader" class="home-header container-100">
  <div class="home-header__w">
    <h1 class="home-header__title">{{$t('idea.siteIntroText')}}</h1>
    <main-filter />
  </div>
</div>
</template>

<script>
import MainFilter from "@/app/components/filter/MainFilter";
export default {
  name: "HomeHeader",
  components: {MainFilter},
}
</script>

<style scoped>
</style>
