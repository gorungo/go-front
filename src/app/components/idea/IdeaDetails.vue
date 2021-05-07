<template>
  <div id="idea-details" class="idea-details">
    <div class="container container-max-hd" v-if="idea">
      <header>
        <div class="idea-details__heading">
          <div></div>
            <h1 class="text-first-uppercase mt-2">{{ idea.attributes.title }}</h1>
            <p class="item-intro">{{ idea.attributes.intro }}</p>
            <div class="list-item-dropdown" v-if="canUpdate">
              <idea-actions-dropdown :idea="idea"/>
            </div>
        </div>
      </header>
      <main>
        <section class="sections-gap-vertical">
          <idea-photo-grid :photos="idea.relationships.photos"/>
        </section>
        <section class="sections-gap-vertical">
          <div class="section-details">
            <div class="section-details__title">
              <h3 class="text-first-uppercase">{{ $t('idea.description') }}</h3>
            </div>
            <div class="section-details__content">
              <p class="item-description" v-html="idea.attributes.description"></p>
            </div>
          </div>
        </section>
        <section class="section-details sections-gap-vertical">
          <div class="section-details__title">
            <h3 class="text-first-uppercase">{{ $t('idea.itinerary') }}</h3>
          </div>
          <div class="section-details__content">
            <idea-itineraries-list :idea="idea"/>
          </div>
        </section>
      </main>
    </div>
    <loading v-if="loading"/>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import Loading from "@/app/components/app/Loading";
import IdeaItinerariesList from "@/app/components/idea/IdeaItinerariesList";
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

