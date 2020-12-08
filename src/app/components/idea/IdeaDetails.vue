<template>
  <div id="IdeaDetails">
    <div class="container" v-if="idea">
      <header>
        <div class="row item-heading">
          <div class="col-8">
            <h1 class="text-first-uppercase mt-2">{{ idea.attributes.title }}</h1>
            <p class="item-intro">{{ idea.attributes.intro }}</p>
            <div class="list-item-dropdown" v-if="canUpdate">
              <idea-actions-dropdown :idea="idea"/>
            </div>
          </div>
          <div class="col-4">
            <div v-if="price">
              <span class="price"><span class="from">{{ $t('idea.from') }}</span> {{ localePrice }}</span>
            </div>
          </div>
        </div>
      </header>

      <section id="item-description-section" class="mt-2">
        <idea-photo-grid :photos="idea.relationships.photos"/>
        <div class="row mt-4">
          <div class="col-4">
            <h3 class="text-first-uppercase">{{ $t('idea.description') }}</h3>
          </div>
          <div class="col-8">
            <p class="item-description" v-html="idea.attributes.description"></p>
          </div>
        </div>
      </section>
      <section id="item-itinerary-section">
        <div class="row mt-4">
          <div class="col-4">
            <h3 class="text-first-uppercase">{{ $t('idea.itinerary') }}</h3>
          </div>
          <div class="col-8">
            <idea-itineraries-list :idea="idea"/>
          </div>

        </div>
      </section>
    </div>
    <loading v-if="loading"/>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import Loading from "@/app/components/app/Loading";
import IdeaItinerariesList from "@/app/components/idea/IdeaItinerariesList";
import '@/assets/scss/idea-show.scss';
import IdeaPhotoGrid from "@/app/components/idea/IdeaPhotoGrid";

export default {
  name: "IdeaDetails",
  components: {IdeaPhotoGrid, IdeaItinerariesList, Loading},
  async mounted() {
    if (!this.idea || this.idea.hid !== this.$route.params.ideaHid) {
      await this.clearIdea()
      await this.fetchIdea(this.$route.params.ideaHid)
    }

  },

  computed: {
    ...mapState('IdeaShow', ['idea', 'loading']),

    price() {
      return this.idea.relationships.price ? this.idea.relationships.price : null
    },

    author() {
      return this.idea.relationships.author ? this.idea.relationships.author : null
    },

    localePrice() {
      return this.price ? new Intl.NumberFormat(this.$root.$i18n.locale, {
        style: 'currency',
        currency: this.price.relationships.currency.attributes.code
      }).format(this.price.attributes.price) : null
    },

    canUpdate() {
      if (this.idea && this.user) {
        return this.idea.attributes.author_id === this.user.id
      }
      return false
    }
  },

  methods: {
    ...mapActions('IdeaShow', ['fetchIdea', 'clearIdea'])
  }
}
</script>

<style scoped>

</style>
