<template>
  <div id="e-403-page" class="d-flex py-2 center-items mh-60">
      <h1>{{ $t('auth.forbidden403') }}</h1>
  </div>
</template>

<script>

export default {
  name: "E403Page",
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
