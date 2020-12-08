<template>
  <div>
    <div v-if="sortedItineraries && sortedItineraries.length > 0" id="itineraries-list" class="itinerary-list">
      <div @click="handleShowItineraryInfoWindow(itinerary)" class="itinerary-list__itinerary-item"
           v-for="(itinerary) in sortedItineraries" :key="itinerary.id">
        <span
            class="itinerary-item__day-num text-first-uppercase">{{ $t('text.day') }} {{ itinerary.attributes.dayNum }}</span>
        <div class="row mb-2">
          <div class="col-4">
            <div class="itinerary-image">
              <img :src="itinerary.attributes.fullTmbImgPath" alt="itinerary-image"/>
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
        :title="$t('text.day') + ' ' + activeItinerary.attributes.dayNum"
        width="30%"
        :visible.sync="itineraryWindowVisible"
    >
      <img class="itinerary-image" :src="activeItinerary.attributes.fullTmbImgPath" alt="itinerary-image"/>
      <h3>{{ activeItinerary.attributes.title }}</h3>
      <p>{{ activeItinerary.attributes.description }}</p>
      <p>{{ activeItinerary.attributes.whatIncluded }}</p>
      <p>{{ activeItinerary.attributes.willVisit }}</p>
    </app-dialog>
  </div>
</template>

<script>
import go from '@/js/go'
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

    // handleCloseItineraryWindow(done) {
    //   this.$confirm('Are you sure to close this dialog?')
    //       .then(() => {
    //         this.activeItinerary = null
    //         done()
    //       })
    //       .catch(() => {});
    // },

    strLimit(str, limit) {
      return go.strLimit(str, limit);
    }
  }

}
</script>

<style scoped>
.itinerary-image {
  background: #f8f8f8;
}

.itinerary-image img {
  width: 100%;
  object-fit: cover;
}

.itinerary-list__itinerary-item {
  cursor: pointer;
}
</style>
