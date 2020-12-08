<template>
<div id="HomeHeader" class="home-header container-100">
  <div class="">
    <h1>{{$t('idea.siteIntroText')}}</h1>
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
h1{
  font-size: 2.5rem;
}
  .home-header{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 30vh;
    background-color: var(--light-gray);
  }
</style>
