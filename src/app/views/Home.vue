<template>
  <div class="home">
    <home-header />
    <category-selector />
    <div class="sections-gap-vertical">
      <idea-line-list
          section-name="nearby"
          :ideas="section('nearby')"
          :more-link="$router.resolve({
          name: 'IdeaList',
          query: {}
          })"
      />
    </div>
    <div class="sections-gap-vertical">
      <idea-line-list
          section-name="nature"
          :ideas="section('nature')"
          :more-link="$router.resolve({
          name: 'IdeaList',
          query: { category_id: 2 }
          })"
      />
    </div>
    <div class="sections-gap-vertical">
      <idea-line-list
          section-name="art"
          :ideas="section('art')"
          :more-link="$router.resolve({
          name: 'IdeaList',
          query: { category_id: 7 }
          })"
      />
    </div>
    <div class="sections-gap-vertical bordered-y bg-teal">
      <widget-eco-travel-rules />
    </div>
  </div>
</template>

<script>

import {mapState, mapActions} from 'vuex'
import IdeaLineList from "@/app/components/idea/IdeaLineList"
import HomeHeader from "@/app/components/idea/HomeHeader"
import CategorySelector from "@/app/components/app/CategorySelector"
import WidgetEcoTravelRules from "@/app/components/app/widgets/home/WidgetEcoTravelRules";

export default {
  name: 'Home',

  components: {
    WidgetEcoTravelRules,
    HomeHeader,
    IdeaLineList,
    CategorySelector
  },

  data(){
    return {}
  },

  mounted(){
    if(!Object.keys(this.sectionsData).length){
      this.fetchLineSectionsIdeas()
    }
  },

  computed: {
    ...mapState('Home', ['sectionsData']),
  },

  methods: {
    ...mapActions('Home', ['fetchLineSectionsIdeas']),
    section(sectionName){
      return this.sectionsData[sectionName] ? this.sectionsData[sectionName]?.data : []
    }
  },
}
</script>
