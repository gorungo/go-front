<template>
  <div id="IdeasList">
    <div class="container-100 mt-2">
      <h2 class="sections-gap-vertical mb-2">{{listTitle}}</h2>
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
      <load-more-observer v-if="!loading && !isLastPage" @intersect="handleLoadMoreIntersection" @click="handleLoadMoreClick" />
      <loading v-if="loading"/>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState, mapGetters} from 'vuex';
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
    this.fetch()
  },

  watch: {
    // при изменениях маршрута запрашиваем данные снова
    $route: 'fetchIdeas'
  },

  metaInfo() {
    return {
      title: this.metaTitle,

      titleTemplate: chunk => {
        // If undefined or blank then we don't need the hyphen
        return chunk ? chunk + ' | ' +  this.$t('meta.title') : this.$t('meta.titles.Home');
      },

      meta: [
        {
          name: 'description',
          content: this.metaDescription,
        },
        {
          property: 'og:title',
          content: this.metaTitle,
          // following template options are identical
          // template: '%s - My page',
          template: chunk => chunk ? chunk + ' | ' +  this.$t('meta.title') : this.$t('meta.titles.Home'),
          vmid: 'og:title'
        }
      ]
    }
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
    ...mapGetters('IdeaListing', ['isLastPage']),
    ...mapState('Auth', ['user']),
    ...mapState('Filters', ['activePlace']),
    ...mapState('IdeaShow', ['idea']),
    ...mapState('CategorySelector', ['activeCategory']),

    metaTitle(){
      let title = this.$t('idea.allIdeas')

      if(this.activePlace){
        title = this.activePlace?.title
      }
      if(this.activeCategory){
        title = title ? title + '. ' + this.activeCategory?.attributes?.title : this.activeCategory?.attributes?.title
      }

      return title
    },

    metaDescription(){
      let title = this.$t('meta.description')
      if(this.activeCategory){
        title = title ? title + '. ' + this.activeCategory?.attributes?.title : this.activeCategory?.attributes?.title
      }
      if(this.activePlace){
        title = title ? title + '. ' + this.activePlace?.title : this.activePlace?.title
      }
      return title
    },

    listTitle(){
      return this.metaTitle
    },

  },


  methods: {
    ...mapActions('IdeaListing', ['fetchIdeas', 'loadMore']),
    ...mapActions('IdeaShow', ['fetchIdea', 'clearIdea']),

    handleLoadMoreIntersection() {
      if(!this.loading){
        this.loadMore().then(() => {
        })
      }
    },

    async fetch(){
      this.loading = true
      await this.fetchIdeas()
      this.loading = false
    },

    async handleLoadMoreClick(){
      this.loading = true
      await this.loadMore()
      this.loading = false
    },

  },
}

</script>

<style lang="scss">

</style>
