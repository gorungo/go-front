<template>
  <div id="IdeasList">
    <div class="container mt-2">
      <h2 v-if="title">{{title}}</h2>
      <div class="grid-container grid-columns-5" v-if="ideas.length > 0">
        <idea-cover
            v-for="(idea) in ideas"
            :idea="idea"
            :key="`i${idea.hid}`"
            :user="user"
        />
      </div>
      <loading v-if="loading"/>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import IdeaCover from "@/components/idea/IdeaCover";
import Loading from "@/components/app/Loading";
import '@/assets/scss/idea-list.scss';

export default {
  name: "IdeaLineList",
  components: {Loading, IdeaCover},

  props: {
    title: {
      type:String,
    },
    ideas: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },

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

  computed: {
    ...mapState('App', ['user']),
  },

  methods: {
    ...mapActions('IdeaShow', ['fetchIdea', 'clearIdea']),
  },
}

</script>

<style lang="scss">

</style>
