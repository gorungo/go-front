<template>
  <div id="load-more" class="load-more">
    <div v-if="button">
      <button type="button" class="btn btn-outline-primary" @click="handleLoadMoreClick">{{$t('idea.loadMore')}}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadMoreObserver",
  props: {
    button: {
      type: Boolean,
      default: false,
    }
  },

  data() {
    return {
      observer: null,
    }
  },

  mounted() {
    if(!this.button){
      this.observer = new IntersectionObserver(([entry]) => {
        if (entry && entry.isIntersecting) {
          this.$emit('intersect')
        }
      })
      this.observer.observe(this.$el)
    }
  },

  methods: {
    handleLoadMoreClick(){
      this.$emit('click')
    }
  }
}
</script>

<style scoped>
#load-more {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}
</style>
