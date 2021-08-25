<template>
  <div id="e-404-page" class="d-flex py-2 center-items mh-60">
    <div class="error">
      <img class="error__image" src="/images/color-icons/yahtx2.jpg" width="75"  alt=""/>
      <div class="error__description">
        <h1 class="error__description-title">{{ $t('errors.notFound404') }}</h1>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: "E404Page",
  metaInfo(){
    return {
      title: this.metaTitle,
      meta: [
        {
          name: 'description',
          content: this.metaDescription,
        },
        {
          name: 'robots',
          content: 'noindex, nofollow',
        },
        {
          property: 'og:title',
          content: ''
        }
      ],

    }
  },
  computed: {
    metaTitle(){
      return this.$t('errors.notFound404')
    },

    metaDescription(){
      return this.$t('errors.notFound404')
    },
  }
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
