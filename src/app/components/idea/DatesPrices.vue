<template>
<div class="idea-details__dates">
  <div class="idea-details__dates-card card card-body" v-for="date in dates">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M2.99902 6V20C2.99902 21.103 3.89602 22 4.99902 22H18.999C20.102 22 20.999 21.103 20.999 20V6C20.999 4.897 20.102 4 18.999 4H16.999V2H14.999V4H8.99902V2H6.99902V4H4.99902C3.89602 4 2.99902 4.897 2.99902 6ZM19 20H4.99802V10H19V20ZM19 8H4.99802V6H19V8Z"/>
    </svg>
    <span class="idea-details__date-card_date">{{localeDate(date)}}</span>
    <span>
      <span style="margin-right: 0.2rem;">{{$t('text.startAt')}}</span>
      <span class="idea-details__date-card_time">{{date.attributes.start_time}}</span>
    </span>
  </div>
</div>
</template>

<script>
export default {
  name: "DatesPrices",

  props: {
    dates: {
      type: Array,
      default: ()=>[]
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
  },

}
</script>

<style scoped>
.idea-details__dates{
  display: flex;
  width: 100%;
  column-gap: 1rem;
  flex-wrap: nowrap;
  -webkit-overflow-scrolling: touch;
}

.idea-details__dates-card{
  display: flex;
  width: 300px;
  row-gap: 0.5rem;
  column-gap: 0.5rem;
  flex-direction: column;
}

.idea-details__date-card_date{
  font-weight: bold;
}
.idea-details__date-card_time{
  font-weight: bold;
  color: var(--text-color-secondary)
}


</style>
