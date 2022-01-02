<template>
<div class="container-100">
  <div class="d-flex justify-content-between">
    <h2>{{$t('home.sections.' + sectionName)}}</h2>
    <router-link v-if="moreLink" :to="moreLink.resolved">{{ $t('text.more') }}</router-link>
  </div>
  <div class="grid-container grid-columns-auto line" v-if="ideas.length > 0">
    <idea-cover
        v-for="(idea, index) in ideas"
        :idea="idea"
        :key="`i${idea.hid}`"
        :item-index="`i-${sectionName}-${idea.hid}-${idea.attributes.start_date}`"
        :user="user"
        :index="index"
    />
  </div>
  <div class="grid-container grid-columns-auto line" v-if="ideas.length === 0 && loading">
    <idea-cover-loader
        v-for="(index) in [1,2,3,4,5,6,7]"
        :key="`l${index}`"
        :item-index="`l-${sectionName}-${index}`"
        :index="index"
    />
  </div>
  <idea-not-found v-if="ideas.length === 0 && !loading && !timeout"/>
  <div v-if="timeout">{{ $t('errors.noInternetConnection') }}</div>
</div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import IdeaCover from "@/app/components/idea/IdeaCover";
import IdeaCoverLoader from "@/app/components/idea/IdeaCoverLoader";
import '@/assets/scss/idea-list.scss';
import IdeaNotFound from "@/app/components/idea/IdeaNotFound";

export default {
  name: "IdeaLineList",
  components: {IdeaNotFound, IdeaCover, IdeaCoverLoader},

  props: {
    title: {
      type:String,
    },
    sectionName: String,
    ideas: {
      type: Array,
      default:  () => [],
    },
    moreLink: Object,
    loading: {
      type: Boolean,
      default: false,
    }

  },

  data() {
    return {
      preloadIdeaBeforeRouteLeave: true,
      timeout: false,
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
