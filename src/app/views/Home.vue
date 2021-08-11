<template>
  <div class="home">
    <home-header />
    <div class="container-100 mt-1">
      <category-selector />
    </div>
    <div class="sections-gap-vertical">
      <idea-line-list
          section-name="nearby"
          :ideas="section('nearby')"
      />
    </div>
    <div class="sections-gap-vertical">
      <idea-line-list
          section-name="nature"
          :ideas="section('nature')"
      />
    </div>
    <div class="sections-gap-vertical">
      <idea-line-list
          section-name="art"
          :ideas="section('art')"
      />
    </div>
  </div>
</template>

<script>

import {mapState} from 'vuex'
import IdeaLineList from "@/app/components/idea/IdeaLineList"
import HomeHeader from "@/app/components/idea/HomeHeader"
import CategorySelector from "@/app/components/app/CategorySelector"

export default {
  name: 'Home',

  components: {
    HomeHeader,
    IdeaLineList,
    CategorySelector
  },

  data(){
    return {
    }
  },

  computed: {
    ...mapState('Home', ['sectionsData']),
  },

  methods: {
    section(sectionName){
      return this.sectionsData[sectionName] ? this.sectionsData[sectionName]?.data : []
    }
  },
}
</script>
