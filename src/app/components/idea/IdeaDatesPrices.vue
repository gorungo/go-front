<template>
<div class="dates-selector">
  <template v-if="dates.length > 0" >
    <div class="dates-selector__card card card-body" v-for="date in dates" :key="date.id">
      <div class="d-flex align-items-center">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M2.99902 6V20C2.99902 21.103 3.89602 22 4.99902 22H18.999C20.102 22 20.999 21.103 20.999 20V6C20.999 4.897 20.102 4 18.999 4H16.999V2H14.999V4H8.99902V2H6.99902V4H4.99902C3.89602 4 2.99902 4.897 2.99902 6ZM19 20H4.99802V10H19V20ZM19 8H4.99802V6H19V8Z"/>
        </svg>
        <span class="dates-selector__card_date">{{localeDate(date)}}</span>
      </div>
      <span>
        <template v-if="date.attributes.start_time !== null">
          <span style="margin-right: 0.2rem;">{{$t('text.startAt')}}</span>
          <span class="dates-selector__card_time">{{date.attributes.start_time}}</span>
        </template>
    </span>
      <button class="btn btn-outline-primary" type="button" @click="handleBookClick(date)">
        {{$t('booking.buttonBook')}}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.2929 14.2929L16 15L19 12L16 9L15.2929 9.70711L17.0858 11.5L5 11.5V12.5L17.0857 12.5L15.2929 14.2929Z" fill="#2E3A59"/>
        </svg>
      </button>
    </div>
  </template>
  <div v-if="dates.length === 0">{{$t('idea.noDates')}}</div>
  <idea-booking-modal v-if="dates.length > 0" ref="bookingModal" :idea="idea" :date="selectedDate" @book="handleModalBookClick"/>
</div>
</template>

<script>
import IdeaBookingModal from "@/app/components/idea/IdeaBookingModal";
export default {
  name: "IdeaDatesPrices",
  components: {IdeaBookingModal},
  props: {
    idea: {
      type: Object,
    },
  },

  data(){
    return {
      selectedDate: null,
    }
  },

  computed: {
    dates(){
      return this.idea.relationships.future_dates ? this.idea.relationships.future_dates : []
    }

  },

  methods: {
    localeDate(date){
      if(date && date.attributes.start_date){
        let jsDate = new Date(date.attributes.start_date)
        return jsDate.toLocaleString(this.$root.$i18n.locale).slice(0, 10);
      }
      return null
    },
    localePrice(date) {
      return date && date.relationships.price ? new Intl.NumberFormat(this.$root.$i18n.locale, {
        style: 'currency',
        currency: date.relationships.price.relationships.currency.attributes.code
      }).format(this.price.attributes.price) : null
    },
    handleBookClick(date){
      this.selectedDate = date
      this.$refs.bookingModal.show();
    },

    handleModalBookClick(){
      //
    },


  },

}
</script>

<style scoped lang="scss">

.dates-selector{
  display: flex;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  overflow-x: scroll;
  column-gap: 1rem;
  flex-wrap: nowrap;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */

  &::-webkit-scrollbar {
     display: none;
  }
}

.dates-selector__card{
  display: flex;
  width: 250px;
  min-width: 250px;
  row-gap: 0.5rem;
  column-gap: 0.5rem;
  flex-direction: column;
}

.dates-selector__card_date{
  margin-left: 0.5rem;
  font-weight: bold;
}
.dates-selector__card_time{
  font-weight: bold;
  color: var(--text-color-secondary)
}


</style>
