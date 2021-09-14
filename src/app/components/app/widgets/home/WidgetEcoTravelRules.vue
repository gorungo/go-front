<template>
<div class="container py-4 eco-travel">
  <img src="/images/color-icons/not-kaka.png" width="100" height="100" />
  <div>
    <h1>Как быть экологичным туристом?</h1>
    <p>Памятка для туристов о том, как получить удовольствие от путешествия и не навредить природе</p>
    <router-link class="btn btn-outline-primary" :to="{name: 'PagesEcoTravelRules'}">
      <span>Читать</span>
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.2929 14.2929L16 15L19 12L16 9L15.2929 9.70711L17.0858 11.5L5 11.5V12.5L17.0857 12.5L15.2929 14.2929Z" fill="currentcolor"/>
      </svg>
    </router-link>
  </div>
</div>
</template>

<script>
export default {
  name: "WidgetEcoTravelRules"
}
</script>

<style scoped>
.eco-travel{
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 4rem;
  color: var(--text-color);
}
</style>
