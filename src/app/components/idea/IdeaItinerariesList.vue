<template>
  <div>
    <div v-if="sortedItineraries && sortedItineraries.length > 0" id="itineraries-list" class="itinerary-list">
      <div @click="handleShowItineraryInfoWindow(itinerary)" class="itinerary-list__itinerary-item"
           v-for="(itinerary, index) in sortedItineraries" :key="itinerary.id">
        <span class="itinerary-item__day-num text-first-uppercase" v-if="newDay(index)">{{ $t('text.day') }} {{ itinerary.attributes.day_num }}</span>
        <div class="row mb-2">
          <div class="col-4">
            <div class="itinerary-item__image-w">
              <img :src="itinerary.attributes.image_url" class="itinerary-item__image" alt=""/>
            </div>
          </div>
          <div class="col-8">
            <h5>{{ itinerary.attributes.title }}</h5>
            <p>{{ strLimit(itinerary.attributes.description, 100) }}</p>
            <span class="link">{{ $t('text.showMore') }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <app-dialog
        v-if="activeItinerary"
        :title="$t('text.day') + ' ' + activeItinerary.attributes.day_num"
        :visible.sync="itineraryWindowVisible"
        :fullscreen="isMobile"
    >
      <img class="itinerary-dialog__image" :src="activeItinerary.attributes.image_url" alt="itinerary-image"/>
      <h3>{{ activeItinerary.attributes.title }}</h3>
      <p>{{ activeItinerary.attributes.description }}</p>
      <p>{{ activeItinerary.attributes.whatIncluded }}</p>
      <p>{{ activeItinerary.attributes.willVisit }}</p>
    </app-dialog>
  </div>
</template>

<script>
import {strLimit} from '@/js/go'
import AppDialog from "@/app/components/app/AppDialog";

export default {
  name: "IdeaItinerariesList",
  components: {AppDialog},
  props: {
    idea: Object,
  },

  data() {
    return {
      activeItinerary: null,
      itineraryWindowVisible: false,
    }
  },

  computed: {
    isMobile(){
      return this.$root.isMobile
    },

    sortedItineraries() {

      if (!(this.idea && this.idea.relationships.itineraries)) {
        return [];
      }
      let itineraries = this.idea.relationships.itineraries;
      return itineraries.sort(function (a, b) {
        if (a.attributes.dayNum > b.attributes.dayNum) {
          return 1;
        }
        if (a.attributes.dayNum < b.attributes.dayNum) {
          return -1;
        }

        if (a.attributes.dayNum === b.attributes.dayNum) {
          if (a.attributes.startTime > b.attributes.startTime) {
            return 1;
          }
          if (a.attributes.startTime < b.attributes.startTime) {
            return -1;
          }
        }

        return 0;
      });
    },
  },

  methods: {
    handleShowItineraryInfoWindow(itinerary) {
      this.activeItinerary = itinerary
      this.itineraryWindowVisible = true
    },

    newDay(index){
      if(index === 0) return true
      return this.sortedItineraries[index].attributes.day_num !== this.sortedItineraries[index-1].attributes.day_num
    },

    // handleCloseItineraryWindow(done) {
    //   this.$confirm('Are you sure to close this dialog?')
    //       .then(() => {
    //         this.activeItinerary = null
    //         done()
    //       })
    //       .catch(() => {});
    // },

    strLimit(str, limit) {
      return strLimit(str, limit);
    }
  }

}
</script>

<style scoped>
.itinerary-image {
  background: #f8f8f8;
}

.itinerary-item__image {
  width: 100%;
  object-fit: cover;
}

.itinerary-list__itinerary-item {
  cursor: pointer;
}
</style>
