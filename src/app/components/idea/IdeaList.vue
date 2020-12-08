<template>
  <div id="IdeasList">
    <div class="container-100 mt-2">
      <div class="grid-container grid-columns-auto" v-if="ideas.length > 0">
        <idea-cover
            v-for="(idea) in ideas"
            :idea="idea"
            :key="`i${idea.hid}`"
            :user="user"
        />
      </div>
      <loading v-if="loading"/>
      <not-found v-if="!loading && ideas.length === 0" />
      <load-more-observer @intersect="handleLoadMoreIntersection" />
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import IdeaCover from "@/app/components/idea/IdeaCover";
import LoadMoreObserver from "@/app/components/app/LoadMoreObserver";
import Loading from "@/app/components/app/Loading";
import '@/assets/scss/idea-list.scss';
import NotFound from "@/app/components/idea/NotFound";

export default {
  name: "IdeaList",
  components: {NotFound, Loading, LoadMoreObserver, IdeaCover},

  data() {
    return {
      preloadIdeaBeforeRouteLeave: true,
    }
  },

  async beforeRouteLeave (to, from, next) {
    if(this.preloadIdeaBeforeRouteLeave && to.name === 'ideaDetails'){
      if(!this.idea || this.idea.hid !== this.$route.params.ideaHid){
        await this.clearIdea()
        await this.fetchIdea(this.$route.params.ideaHid).then(() => {
          next()
        })
      }
    }else{
      next()
    }
  },

  computed: {
    //...mapState('IdeaListing', ['ideas'])
    ...mapState('IdeaListing', ['ideas', 'loading']),
    ...mapState('App', ['user']),
    ...mapState('IdeaShow', ['idea']),
  },


  methods: {
    ...mapActions('IdeaListing', ['fetchIdeas', 'loadAndAppendNextPage']),
    ...mapActions('IdeaShow', ['fetchIdea', 'clearIdea']),

    handleLoadMoreIntersection() {
      if(!this.loading){
        this.loadAndAppendNextPage().then(() => {
        })
      }
    },

  },
}

</script>

<style lang="scss">

</style>
