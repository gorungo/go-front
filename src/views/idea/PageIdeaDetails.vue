<template>
  <div id="IdeaDetailsPage">
    <div class="container" v-if="idea">
      <span v-if="ideaPlace">
        <img class="mr-2" alt="" src="/images/interface/icos/location_ico.svg" style="height: 16px;"/>
        {{ideaPlace.attributes.title}}
      </span>
      <header>
        <div class="row item-heading">
          <div class="col-sm-8">
            <h1 class="text-first-uppercase mt-2">{{idea.attributes.title}}</h1>
            <p class="text-secondary item-intro">{{idea.attributes.intro}}</p>
            <a v-if="canUpdate" class="text-primary text-uppercase" :href="idea.attributes.editUrl">{{$t('itemActions.edit')}}</a>
          </div>
          <div class="col-sm-3 offset-sm-1">
              <div v-if="ideaPrice">
                <span class="price"><span class="from">{{$t('idea.from')}}</span> {{ideaPrice.attributes.FormattedPrice}} <span class="price-currency">{{ideaPrice.relationships.currency.attributes.shortTitle}}</span></span>
              </div>
          </div>
        </div>
      </header>
      <section id="item-description-section" class="mt-2">
        // photo view
        <div class="row mt-4">
          <div class="col-sm-4">
            <h3 class="text-first-uppercase">{{$t('idea.description')}}</h3>
          </div>
          <div class="col-sm-8">
            <p class="item-description" v-html="idea.attributes.description"></p>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-sm-4">
            <h3 class="text-first-uppercase">{{$t('idea.itinerary')}}</h3>
          </div>
          <div class="col-sm-8">
          </div>
          <idea-itineraries-list :idea="idea"/>

        </div>
      </section>
    </div>
    <loading v-if="loading" />
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import Loading from "@/components/app/Loading";
import IdeaItinerariesList from "@/components/idea/IdeaItinerariesList";

export default {
name: "PageIdeaDetails",
  components: {IdeaItinerariesList, Loading},
  async mounted(){
    await this.fetchIdea(this.$route.params.ideaHid)
  },

  computed: {
  ...mapState('IdeaShow', ['idea', 'loading']),

    ideaPlace(){
      return null
    },

    ideaPrice(){
      return null
    },

    canUpdate(){
      return false
    }
  },

  methods: {
    ...mapActions('IdeaShow', ['fetchIdea'])
  }
}
</script>

<style scoped>

</style>