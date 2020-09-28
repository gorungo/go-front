<template>
  <div id="IdeasListPage" class="container-100">
    <div class="grid-container grid-columns-5" v-if="ideas.length > 0">
      <idea-cover
          v-for="(idea) in ideas"
          :idea="idea"
          :key="`i${idea.hid}`"
          :user="user"
      />
    </div>
    <loading v-if="loading"/>
    <load-more-observer @intersect="handleLoadMoreIntersection"/>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import IdeaCover from "@/components/idea/IdeaCover";
import LoadMoreObserver from "@/components/app/LoadMoreObserver";
import Loading from "@/components/app/Loading";
import '@/assets/scss/idea-list.scss';

export default {
  name: "PageIdeaList",
  components: {Loading, LoadMoreObserver, IdeaCover},

  data() {
    return {
      loading: false,
    }
  },

  async mounted() {
    if (this.ideas.length === 0) {
      await this.loadAndAppendNextPage()
    }
  },

  computed: {
    //...mapState('IdeaListing', ['ideas'])
    ...mapState('IdeaListing', ['ideas']),
    ...mapState('App', ['user']),
  },


  methods: {
    ...mapActions('IdeaListing', ['fetchIdeas', 'loadAndAppendNextPage']),

    handleLoadMoreIntersection() {
      this.loadAndAppendNextPage()
    },

  }
}
</script>

<style lang="scss">

</style>