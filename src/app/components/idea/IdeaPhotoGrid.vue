<template>
  <div class="grid-container grid-columns-gallery-1 border-radius" :class="{'grid-columns-gallery-mobile': isMobile}">
    <div v-for="(photo, index) in photosToShow"
         class="img-wrap"
         :key="photo.id"
         :class="{
           vertical: index+1 !== 3 && index+1 !== 4,
           [`i${index+1}`]:true
         }"
    >
      <img :src="photo.attributes.image_url" :alt="`photo-${index+1}`" @load="resize"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "IdeaPhotoGrid",

  props: {
    photos: {
      type:Array,
      default: () => {
        return []
      },
    }
  },

  mounted(){
    window.addEventListener('resize', this.resize);
  },

  computed: {
    isMobile(){
      return this.$root.isMobile
    },

    photosToShow(){
      return this.isMobile ? this.photos.slice(0, 4) : this.photos.slice(0, 5);
    }
  },

  methods: {
    resize(){
      const covers = document.querySelectorAll('.img-wrap')
      covers.forEach( cover => {
        cover.style.height = cover.offsetWidth * 1.33 + 'px'
      })
    }
  }
}
</script>

<style scoped>

</style>
