<template>
  <app-dialog
      :title="$t('booking.modalTitle')"
      :visible.sync="dialogIsVisible"
      @closed="handleDialogClosed"
  >
    <div class="booking-modal" v-if="idea && date">
      <div class="booking-modal__label">{{$t('booking.bookingPlaceIn')}}</div>
      <div class="booking-modal__title">{{idea.attributes.title}}</div>
      <div class="booking-modal__label">{{$t('booking.bookingDateTime')}}</div>
      <div class="booking-modal__date">{{localeDate(date)}} {{$t('text.at')}} {{date.attributes.start_time}}</div>
      <div class="form-group">
        <label for="people-count">
          {{ $t('booking.labelPeopleCount') }}
        </label>
        <input class="form-control" id="people-count" type="number" min="1" max="10" step="1" name="people_count" v-model="peopleCount"/>
      </div>
      <p>После нажатия на "Забронировать" вы будете переведены в приложение Whatsapp, где сможете договориться об участии в мероприятии.</p>
      <a target="_blank" :href="whatsAppUrl" rel="noopener" class="btn btn-primary">{{$t('booking.buttonBook')}}</a>
    </div>
  </app-dialog>

</template>

<script>
import AppDialog from "@/app/components/app/AppDialog"
export default {
  name: "IdeaBookingModal",
  props: {
    idea: {
      type: Object,
    },
    date: {
      type: Object,
    }
  },

  components: {AppDialog},

  data(){
    return {
      dialogIsVisible: false,
      peopleCount: 1,
    }
  },

  computed: {
    whatsAppUrl(){
      let bookingPhone = this.idea.relationships.author.attributes.whatsapp ? this.idea.relationships.author.attributes.whatsapp : '89635150150'
      let text = `Привет, хочу забронировать место в "${this.idea.attributes.title}". \n Дата и время: ${this.localeDate(this.date)} ${this.$t('text.at')} ${this.date.attributes.start_time}. Количество участников: ${this.peopleCount}. Бронирование с Gorungo.ru`
      return `https://api.whatsapp.com/send?phone=+${bookingPhone}&text=${text}`
    }
  },

  methods: {
    handleDialogClosed(){
      this.dialogIsVisible = false
      this.$emit('cancel')
    },

    show(){
      this.dialogIsVisible = true
    },

    localeDate(date){
      if(date && date.attributes.start_date){
        let jsDate = new Date(date.attributes.start_date)
        return jsDate.toLocaleString(this.$root.$i18n.locale).slice(0, 10);
      }
      return null
    },

  }

}
</script>

<style scoped>
.booking-modal__label,
.booking-modal__title,
.booking-modal__date,
.booking-modal label {
  font-size: 14px;
  font-weight: bold;
  color: var(--text-color-secondary);
}

.booking-modal__title,
.booking-modal__date {
  margin-bottom: 1rem;
  font-size: 18px;
  color: var(--text-color);
}
</style>