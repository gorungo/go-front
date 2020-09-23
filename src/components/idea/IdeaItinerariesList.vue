<template>
    <div>
        <div v-if="sortedItineraries && sortedItineraries.length > 0" id="itineraries-list" class="itinerary-list">
            <div @click="handleShowItineraryInfoWindow(itinerary)" class="itinerary-list__itinerary-item" v-for="(itinerary) in sortedItineraries" :key="itinerary.id">
                <span class="itinerary-item__day-num text-first-uppercase">{{$t('idea.day')}} {{itinerary.attributes.dayNum}}</span>
                <div class="row mb-2">
                    <div class="col-sm-4">
                        <div class="itinerary-image">
                            <img :src="itinerary.attributes.fullTmbImgPath" alt="itinerary-image"/>
                        </div>
                    </div>
                    <div class="col-sm-8">
                        <h5>{{itinerary.attributes.title}}</h5>
                        <p>{{strLimit(itinerary.attributes.description, 100)}}</p>
                        <span class="link">{{$t('texts.show_more')}}</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal -->
      <el-dialog
          v-if="activeItinerary"
          :title="$t('itinerary.day') + ' ' + activeItinerary.attributes.dayNum"
          :visible.sync="itineraryWindowVisible"
          width="30%">
        <h3>{{activeItinerary.attributes.title}}</h3>
        <p>{{activeItinerary.attributes.description}}</p>
        <p>{{activeItinerary.attributes.whatIncluded}}</p>
        <p>{{activeItinerary.attributes.willVisit}}</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="itineraryWindowVisible = false">Cancel</el-button>
          <el-button type="primary" @click="itineraryWindowVisible = false">Confirm</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
    import go from '@/js/go'
    import { Dialog } from 'element-ui';
    export default {
        name: "IdeaItinerariesList",

        props: {
            idea: Object,
        },

        // eslint-disable-next-line
        components: { Dialog },

        data(){
            return {
                activeItinerary: null,
                itineraryWindowVisible: false,
            }
        },

        computed: {

        sortedItineraries(){

          if(!(this.idea && this.idea.relationships.itineraries)){
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
            handleShowItineraryInfoWindow(itinerary){
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

            strLimit(str, limit){
                return go.strLimit(str, limit);
            }
        }

    }
</script>

<style scoped>
    .itinerary-image {
        background: #f8f8f8;
    }
    .itinerary-image img{
        width: 100%;
        object-fit: cover;
    }
    .itinerary-list__itinerary-item {
        cursor: pointer;
    }
</style>