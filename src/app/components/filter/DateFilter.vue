<template>
  <div class="filter--date filter__content">
    <date-range-picker
        ref="picker"
        opens="inline"
        :min-date="new Date()"
        :locale-data="$t('datePicker')"
        :timePicker="false"
        :showWeekNumbers="false"
        :showDropdowns="false"
        :ranges="false"
        :autoApply="false"
        :date-range="value"
        @update="handleUpdate"
        @select="handleSelect"
        @keypress.esc="$emit('keypress.esc')"

    >
      <template v-slot:input="picker">
        <div class="">
          <div>{{filterDateRangeTitle(picker)}}</div>
        </div>
      </template>
      <!--footer slot-->
      <div slot="footer" slot-scope="data" class="slot">
        <div v-if="!noFooter" class="calendar__footer-slot">
          <button type="button" @click="data.clickCancel" v-if="!data.in_selection" class="btn btn-default btn-sm">{{ $t('datePicker.cancelLabel') }}</button>
          <button type="button" @click="data.clickApply" v-if="!data.in_selection" class="btn btn-primary btn-sm">{{ $t('datePicker.applyLabel') }}</button>
        </div>
      </div>
    </date-range-picker>
  </div>
</template>

<script>
import DateRangePicker from 'vue2-daterange-picker'

export default {
  name: "DateFilter",

  components: {
    DateRangePicker
  },

  props: {
    value: Object,
    noFooter: {
      type: Boolean,
      default: false,
    }
  },

  methods: {
    filterDateRangeTitle(picker){
      const monthNames = this.$t('datePicker.monthNames');
      const startDate =  picker && picker.startDate ? picker.startDate.getDate() + ' ' + monthNames[picker.startDate.getMonth()].toLocaleLowerCase() + ' ' + picker.startDate.getFullYear() : ''
      const endDate =  picker && picker.endDate ? picker.endDate.getDate() + ' ' + monthNames[picker.endDate.getMonth()].toLocaleLowerCase() + ' ' + picker.endDate.getFullYear(): ''
      return endDate ? startDate + ' - ' + endDate : startDate
    },

    handleUpdate(data){
      this.$emit('update', data)
    },

    handleSelect(data){
      this.$emit('select', data)
    }

  }
}
</script>

<style scoped>

</style>
