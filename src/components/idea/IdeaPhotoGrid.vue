<template>
  <div class="grid-container grid-columns-gallery-1">
    <div v-for="(photo, index) in photos"
         class="img-wrap"
         :key="photo.id"
         :class="{
           vertical: index+1 !== 3 && index+1 !== 4,
           [`i${index+1}`]:true
         }"
    >
      <img :src="photo.attributes.imageUrl" :alt="`photo-${index+1}`"/>
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
    this.resize();
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