<template>
  <button type="button" class="header__go-back" @click="goBack" :aria-label="$t('text.goBack')">
    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.83 11H17V13H10.83L13.41 15.59L12 17L7 12L12 7L13.41 8.41L10.83 11Z" />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z"/>
    </svg>
  </button>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "GoBack",

  props: {
    to: Object,
  },

  computed: {
    ...mapState('App', ['prevRoute'])
  },

  methods: {
    goBack(){

      if(!this.prevRoute){
        this.$router.push({name: 'Home'})
        return
      }
      this.$router.history.go(-1)
      // if(this.$route.name === 'IdeaList'){
      //   this.$router.history.back()
      //   return
      // }
      // if(this.$route.name === 'IdeaDetails' && this.prevRoute.name !== this.$route.name){
      //   this.$router.push(this.prevRoute)
      //   return
      // }
    }
  }
}
</script>

<style scoped>

</style>
