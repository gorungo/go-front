<template>
  <div class="app-update invert bg-teal" v-if="updateExists">
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
}
</style>
