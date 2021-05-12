<template>
  <div class="home">
    <home-header />
    <div class="sections-gap-vertical ">
      <idea-line-list
          title="Ближайшие"
          section-name="nearest"
          :limit="6"
      />
    </div>
    <div class="sections-gap-vertical">
      <idea-line-list
          title="Популярные"
          section-name="popular"
          :limit="6"
      />
    </div>
  </div>
</template>

<script>

import {mapState} from 'vuex';
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
    }
  },

  computed: {
    ...mapState('Home', ['ideaSections']),
  },

  methods: {

  }
}
</script>
