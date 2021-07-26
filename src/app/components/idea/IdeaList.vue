<template>
  <div id="IdeasList">
    <loading v-if="loading"/>
    <div class="container-100 mt-2">
      <div class="grid-container grid-columns-auto" v-if="ideas.length > 0">
        <idea-cover
            v-for="(idea) in ideas"
            :idea="idea"
            :key="`i${idea.hid}-${idea.attributes.start_date}`"
            :item-index="`i${idea.hid}-${idea.attributes.start_date}`"
            :user="user"
        />
      </div>
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
      loading: true,
    }
  },

  created(){
    this.fetchIdeas()
  },

  watch: {
    // при изменениях маршрута запрашиваем данные снова
    $route: 'fetchIdeas'
  },

  async beforeRouteLeave (to, from, next) {
    if(this.preloadIdeaBeforeRouteLeave && to.name === 'ideaDetails'){
      if(!this.idea || this.idea.hid !== this.$route.params.ideaHid){
        await this.clearIdea()
        await this.fetchIdea(this.$route.params.ideaHid, {
          include: 'futureDates,ideaPrice,ideaItineraries,photos',
        })
        next()
      }
    }else{
      next()
    }
  },

  computed: {
    ...mapState('IdeaListing', ['ideas']),
    ...mapState('Auth', ['user']),
    ...mapState('IdeaShow', ['idea']),
  },


  methods: {
    ...mapActions('IdeaListing', ['fetchIdeas', 'loadAndAppendNextPage', 'updateIdeas']),
    ...mapActions('IdeaShow', ['fetchIdea', 'clearIdea']),

    handleLoadMoreIntersection() {
      if(!this.loading){
        this.loadAndAppendNextPage().then(() => {
        })
      }
    },

    async fetchIdeas(){
      this.loading = true
      await this.updateIdeas()
      this.loading = false
    },

  },
}

</script>

<style lang="scss">

</style>
