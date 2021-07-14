<template>
<div class="container-100">
  <h2 v-if="title">{{title}}</h2>
  <div class="grid-container grid-columns-auto" v-if="ideas.length > 0">
    <idea-cover
        v-for="(idea, index) in ideas"
        :idea="idea"
        :key="`i${idea.hid}`"
        :item-index="`i-${sectionName}-${idea.hid}-${idea.attributes.start_date}`"
        :user="user"
        :index="index"
    />
  </div>
  <idea-not-found v-if="ideas.length === 0 && !loading && !timeout"/>
  <loading v-if="loading"/>
  <div v-if="timeout">{{ $t('errors.noInternetConnection') }}</div>
</div>
</template>

<script>
import ideaAPI from '@/api/idea'
import {mapActions, mapState} from 'vuex';
import IdeaCover from "@/app/components/idea/IdeaCover";
import Loading from "@/app/components/app/Loading";
import '@/assets/scss/idea-list.scss';
import IdeaNotFound from "@/app/components/idea/IdeaNotFound";

export default {
  name: "IdeaLineList",
  components: {IdeaNotFound, Loading, IdeaCover},

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
      timeout: false,
      ideas: [],
    }
  },

  async mounted(){
    let options = {
      section_name: this.sectionName, limit: this.limit, simple_resource: 1
    }
    switch (this.sectionName) {
      case 'nearby':
        options = {
          section_name: this.sectionName, limit: this.limit, simple_resource: 1
        }
        break;

      case 'nature':
        options = {
          section_name: this.sectionName, limit: this.limit, simple_resource: 1, category_id: 2,
        }
        break;

      case 'art':
        options = {
          section_name: this.sectionName, limit: this.limit, simple_resource: 1, category_id: 7,
        }
        break;
    }


    if(!this.ideas.length){
      await ideaAPI.getIdeas(options).then( res => {
        this.ideas = res.data.data
      }).catch( e => {
        if(e.code === 'ECONNABORTED'){
          this.timeout = true
        }
      }).finally(() => {
        this.loading = false;
      });

    }

  },


  async beforeRouteLeave (to, from, next) {
    if(this.preloadIdeaBeforeRouteLeave && to.name === 'ideaDetails'){
      if(!this.idea || this.idea.hid !== this.$route.params.ideaHid){
        await this.clearIdea()
        await this.fetchIdea(this.$route.params.ideaHid, {
          include: 'futureDates,ideaPrice,ideaItineraries,photos'
        })
        next()
      }
    }else{
      next()
    }
  },

  computed: {
    ...mapState('Auth', ['user']),
  },

  methods: {
    ...mapActions('IdeaShow', ['fetchIdea', 'clearIdea']),
  },
}

</script>

<style lang="scss">

</style>
