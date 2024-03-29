<template>
  <div>
    <idea-details-layout v-if="idea && !loading">
      <template #breadcrumbs>
        <div>{{idea.attributes.country_title}} / {{idea.attributes.place_title}}</div>
      </template>
      <template #header>
        <h1 class="text-first-uppercase mt-1">{{ idea.attributes.title }}</h1>
        <div class="list-item-dropdown" v-if="canUpdate">
          <idea-actions-dropdown :idea="idea"/>
        </div>
      </template>
      <template #gallery>
      <idea-photo-grid :photos="idea.relationships.photos"/>
      </template>
      <template #author>
        <div class="section-details">
          <div class="section-details__title">
            <div class="section-details__author">
              <img class="section-details__author-image" :src="idea.relationships.author.attributes.image_url" alt="">
              <span class="section-details__author-description">
                  <span class="section-details__author-title">{{ $t('idea.author') }}</span>
                  <span  class="section-details__author-name">{{ idea.relationships.author.attributes.display_name }}</span>
                </span>
            </div>
          </div>
          <div class="section-details__content mt-1">{{ idea.attributes.author_intro ? idea.attributes.author_intro : $t('idea.defaultAuthorIntro') }}</div>
        </div>
      </template>
      <template #description>
        <div class="section-details">
          <div class="section-details__title">
            <h3 class="text-first-uppercase">{{ $t('idea.description') }}</h3>
          </div>
          <div class="section-details__content">
            <p class="item-description" v-html="idea.attributes.description"></p>
          </div>
        </div>
      </template>
      <template #itineraries v-if="idea.relationships.itineraries && idea.relationships.itineraries.length > 0" >
        <div class="section-details__title">
          <h3 class="text-first-uppercase">{{ $t('idea.itinerary') }}</h3>
        </div>
        <div class="section-details__content">
          <idea-itineraries-list :idea="idea"/>
        </div>
      </template>
      <template #dates v-if="idea.relationships.future_dates" >
        <div class="section-details__title">
          <h3 class="text-first-uppercase">{{ $t('idea.dates') }}</h3>
        </div>
        <div class="section-details__content">
          <idea-dates-prices :idea="idea"/>
        </div>
      </template>
      <template #booking-info>
        <div class="section-details__title">
          <h3 class="text-first-uppercase">{{ $t('idea.bookingInfo') }}</h3>
        </div>
        <div class="section-details__content">
          {{idea.attributes.booking_info ? idea.attributes.booking_info : $t('idea.bookingInfoDefault')}}
        </div>
      </template>
      <template #contacts>
        <div class="section-details__title">
          <h3 class="text-first-uppercase">{{ $t('idea.bookingContacts') }}</h3>
        </div>
        <div class="section-details__content">
          <idea-contacts :contacts="idea.attributes.booking_contacts"/>
        </div>
      </template>
    </idea-details-layout>
    <div v-if="!loading && !idea">{{$t('idea.ideaNotFound')}}</div>
    <loading v-if="loading"/>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import Loading from "@/app/components/app/Loading";
import IdeaItinerariesList from "@/app/components/idea/IdeaItinerariesList";
import IdeaPhotoGrid from "@/app/components/idea/IdeaPhotoGrid";
import IdeaContacts from "@/app/components/idea/IdeaContacts";
import IdeaDatesPrices from "@/app/components/idea/IdeaDatesPrices";
import IdeaDetailsLayout from "@/app/components/idea/IdeaDetailsLayout";
import {strLimit} from "@/js/go";

export default {
  name: "IdeaDetails",
  components: {IdeaDetailsLayout, IdeaDatesPrices, IdeaPhotoGrid, IdeaItinerariesList, IdeaContacts, Loading},

  data(){
    return {
      loading: true,
    }
  },

  async mounted() {
    if (!this.idea || this.idea.hid !== this.$route.params.ideaHid) {
      await this.clearIdea()
      await this.fetchIdea(this.$route.params.ideaHid, {
        include: 'futureDates,ideaPrice,ideaItineraries,photos'
      }).catch ( () => {
        this.$router.push({name: 'e404', query: {}})
      })
      this.loading = false
    }
  },
  metaInfo() {
    return {
      title: this.metaTitle,
      meta: [
        {
          name: 'description',
          content: this.metaDescription,
        },
        {
          property: 'og:title',
          content: this.metaTitle,
          // following template options are identical
          // template: '%s - My page',
          template: chunk => chunk ? chunk + ' | ' +  this.$t('meta.title') : this.$t('meta.titles.Home'),
          vmid: 'og:title'
        }
      ]
    }
  },

  computed: {
    ...mapState('IdeaShow', ['idea']),

    metaTitle(){
      return this.idea?.attributes?.title ? this.idea?.attributes?.title + '. ' + this.idea?.attributes?.place_title : ''
    },

    metaDescription(){
      return  this.idea?.attributes?.description ? strLimit(this.idea?.attributes?.description, 250) : ''
    },

    price() {
      return this.idea?.relationships?.price ? this.idea.relationships.price : null
    },

    author() {
      return this.idea?.relationships?.author ? this.idea.relationships.author : null
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

