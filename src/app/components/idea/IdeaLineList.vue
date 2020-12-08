<template>
  <div id="IdeasList">
    <div class="container pt-4">
      <h2 v-if="title">{{title}}</h2>
      <div class="grid-container grid-columns-auto" v-if="ideas.length > 0">
        <idea-cover
            v-for="(idea, index) in ideas"
            :idea="idea"
            :key="`i${idea.hid}`"
            :user="user"
            :index="index"
        />
      </div>
      <loading v-if="loading"/>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import IdeaCover from "@/app/components/idea/IdeaCover";
import Loading from "@/app/components/app/Loading";
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
