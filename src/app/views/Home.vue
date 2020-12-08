<template>
  <div class="home">
    <home-header />
    <idea-line-list
        v-if="nearestSection"
        :title="nearestSection.section.title"
        :ideas="nearestSection.data"
    />

    <idea-line-list
        v-if="popularSection"
        :title="popularSection.section.title"
        :ideas="popularSection.data"
    />

    <idea-line-list
        v-if="baseSection"
        :title="baseSection.section.title"
        :ideas="baseSection.data"
    />
  </div>
</template>

<script>

import {mapActions, mapState} from 'vuex';
import IdeaLineList from "@/app/components/idea/IdeaLineList"
import HomeHeader from "@/app/components/idea/HomeHeader";

export default {
  name: 'Home',

  components: {
    HomeHeader,
    IdeaLineList
  },

  data(){
    return {
      sections:[
        {
          name: 'nearby',
          title: 'Ближайшие',
          limit: 6,
        },
        {
          name: 'popular',
          title: 'Популярное',
          limit: 6,
        },
        {
          name: 'base',
          title: 'Основные идеи',
          limit: 6,
        }
      ],
    }
  },

  mounted(){
    this.init()
  },

  computed: {
    ...mapState('Home', ['ideaSections']),
    nearestSection(){
      return this.ideaSections && this.ideaSections.length && this.ideaSections[0] ? this.ideaSections[0] : null;
    },

    popularSection(){
      return this.ideaSections && this.ideaSections.length && this.ideaSections[1] ? this.ideaSections[1] : null;
    },

    baseSection(){
      return this.ideaSections && this.ideaSections.length && this.ideaSections[2] ? this.ideaSections[2] : null;
    },
  },

  methods: {
    ...mapActions('Home', ['fetchLineSectionsIdeas']),
    init(){
      this.fetchLineSectionsIdeas(this.sections)
    },

  }
}
</script>
