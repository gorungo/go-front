<template>
  <div id="IdeasList">
    <div class="container-100 mt-2">
      <div class="grid-container grid-columns-5" v-if="ideas.length > 0">
        <idea-cover
            v-for="(idea) in ideas"
            :idea="idea"
            :key="`i${idea.hid}`"
            :user="user"
        />
      </div>
      <loading v-if="loading"/>
      <load-more-observer @intersect="handleLoadMoreIntersection" />
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import IdeaCover from "@/components/idea/IdeaCover";
import LoadMoreObserver from "@/components/app/LoadMoreObserver";
import Loading from "@/components/app/Loading";
import '@/assets/scss/idea-list.scss';

export default {
  name: "IdeaList",
  components: {Loading, LoadMoreObserver, IdeaCover},

  data() {
    return {
      preloadIdeaBeforeRouteLeave: true,
      loading: false,
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

  async mounted() {
    if (this.ideas.length === 0) {
      this.loading = true;
      await this.loadAndAppendNextPage().then( () => {
        this.loading = false;
      })
    }
  },

  computed: {
    //...mapState('IdeaListing', ['ideas'])
    ...mapState('IdeaListing', ['ideas']),
    ...mapState('App', ['user']),
    ...mapState('IdeaShow', ['idea']),
  },


  methods: {
    ...mapActions('IdeaListing', ['fetchIdeas', 'loadAndAppendNextPage']),
    ...mapActions('IdeaShow', ['fetchIdea', 'clearIdea']),

    handleLoadMoreIntersection() {
      if(!this.loading){
        this.loading = true;
        this.loadAndAppendNextPage().then(() => {
          this.loading = false;
        })
      }
    },

  },
}

</script>

<style lang="scss">

</style>