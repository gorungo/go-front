<template>
  <footer id="footer" class="sections-gap-vertical">
  <div class="container footer__content">
    {{$t('text.allRights')}}
  </div>
  </footer>
</template>

<script>

export default {
  name: "AppFooter",
}
</script>

<style scoped lang="scss">
  #footer{
    border-top: 1px solid var(--border-color);
    background-color: var(--background-color);
  }
  .footer__content{
    display: flex;
    justify-content: space-between;
    padding: 3rem 0;
    width: 100%;
    height: 300px;
    z-index: 1000;
  }

</style>
