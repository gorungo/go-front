<template>
  <div class="app-update bg-teal invert" v-if="updateExists">
    <div class="app-update__title">{{ $t('text.updateAvailable') }}</div>
    <button class="app-update__button btn btn-outline-primary" @click="refreshApp">
      {{ $t('text.updateApp') }}
    </button>
  </div>
</template>

<script>
import AppUpdate from "@/app/mixins/app-update"
export default {
  name: "AppUpdate",
  mixins: [AppUpdate],
}
</script>

<style scoped>
.app-update{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  row-gap: 1rem;
}
</style>
