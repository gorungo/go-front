<template>
  <div class="idea-cover">
    <div class="idea-cover__box-wrap">
      <div class="idea-cover__tmb is-loading" :id="coverId">
        <div class="idea-cover__tmb-container vertical"></div>
      </div>
      <div class="idea-cover__content text-first-uppercase"></div>
    </div>
    <div class="description">
      <div class="description__logo"></div>
      <div class="description__info"></div>
    </div>
  </div>
</template>

<script>

export default {
  name: "IdeaCoverLoader",
  props: {
    idea: Object,
    user: {
      type: Object,
      default: null,
    },
    itemIndex: String,
  },

  mounted() {
    window.addEventListener('resize', this.resize);
    this.resize()
  },

  computed: {

    coverId() {
      return 'ith' + this.itemIndex
    },
    coverImageId() {
      return 'im' + this.itemIndex
    },
  },

  methods: {
    resize() {
      const cover = document.getElementById(this.coverId)
      const coverImage = document.getElementById(this.coverImageId)
      if (cover) {
        cover.style.height = cover.offsetWidth * 1.33 + 'px'
      }
      if (coverImage) {
        coverImage.style.height = cover.style.height
        coverImage.setAttribute('height', cover.offsetWidth)
        coverImage.setAttribute('width', cover.style.height)
      }
    },
  }
}
</script>

<style lang="scss">
img.default {
  object-fit: scale-down !important;
}

</style>
