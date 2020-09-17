<template>
  <div id="IdeasListPage" class="container">
    <div class="grid-container grid-columns-5" v-if="ideas.length > 0">
      <idea-cover
          v-for="(idea) in ideas"
          :idea="idea"
          :key="`i${idea.hid}`"
      />
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import IdeaCover from "@/views/idea/IdeaCover";

export default {
name: "PageIdeaList",
  components: {IdeaCover},
  async mounted(){
    if(this.ideas.length === 0){
      await this.fetchIdeas();
    }
  },

  computed: {
    //...mapState('IdeaListing', ['ideas'])
    ...mapGetters('IdeaListing', ['ideas'])
  },


  methods: {
    ...mapActions('IdeaListing', ['fetchIdeas'])
  }
}
</script>

<style scoped lang="scss">

$grid-breakpoints-hd:1980;
$grid-breakpoints-2k:2000;

.grid-container {
  width: 100%;
  display: grid;
  grid-column-gap: 1em;
  grid-row-gap: 1em;

.img-wrap{
  overflow: hidden;
img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
}

&.grid-columns-5{
   grid-template-columns: repeat(5, 1fr);
 }
&.grid-columns-4{
   grid-template-columns: repeat(4, 1fr);
 }
&.grid-columns-gallery-1{
   grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
   grid-auto-rows: minmax(100px, 2fr);
.i1{
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 3;
}
.i2{
  grid-column-start:3;
  grid-column-end: 5;
  grid-row-start: 1;
  grid-row-end: 3;

}
.i3{
  grid-column-start:5;
  grid-column-end: 6;
  grid-row-start: 1;
  grid-row-end: 2;

}
.i4{
  grid-column-start: 5;
  grid-column-end: 6;
  grid-row-start: 2;
  grid-row-end: 3;

}
.i5{
  grid-column-start: 6;
  grid-column-end: 8;
  grid-row-start: 1;
  grid-row-end: 3;

}

.i3, .i4{
  max-height: 226px;
}
}
}
.grid-container{
.idea-cover:nth-child(6){
  display: none;
}
}
@media (min-width: $grid-breakpoints-hd){
    .grid-container.grid-columns-5 {
      grid-template-columns: repeat(6, 1fr);
    }
    .grid-container{
    .idea-cover:nth-child(6){
      display: block !important;
    }
  }
}

@media (min-width: $grid-breakpoints-2k){
    .grid-container.grid-columns-5 {
      grid-template-columns: repeat(6, 1fr);
    }
    .grid-container{
      .idea-cover:nth-child(6){
        display: block !important;
      }
    }
}


</style>