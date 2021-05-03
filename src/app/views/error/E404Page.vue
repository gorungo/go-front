<template>
  <div id="e-404-page" class="py-2 h-80 all-middle">
      <h1>{{ $t('auth.notFound404') }}</h1>
  </div>
</template>

<script>

export default {
  name: "E404Page",
}
</script>

<style lang="scss" scoped>
h1 {
  font-size: 32px;
}

.help-block {
  display: flex;
  justify-content: space-between;
}
</style>
