<template>
<div class="container">
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
</template>

<script>
import ideaAPI from '@/api/idea'
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
    sectionName: String,
    limit: Number,

  },

  data() {
    return {
      preloadIdeaBeforeRouteLeave: true,
      loading: true,
      ideas: [],
    }
  },

  async mounted(){
    if(!this.ideas.length){
      await ideaAPI.getIdeas({
        section_name: this.sectionName, limit: this.limit
      }).then( res => {
        this.ideas = res.data.data
      });
    }
    this.loading = false;
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
