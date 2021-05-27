<template>
  <div class="home">
    <home-header />
    <div class="container-100 mt-1">
      <category-selector />
    </div>
    <div class="sections-gap-vertical ">
      <idea-line-list
          title="Ближайшие"
          section-name="nearby"
          :limit="6"
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
    ...mapState('Home', ['ideaSections']),
  },

  methods: {

  }
}
</script>
