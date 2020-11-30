<template>
  <div id="DateFilter" class="filter">
    <!-- Place filter button  -->
    <button type="button" class="filter__btn" @click="toggleDialogVisibility">
      <span class="text-first-uppercase">{{ showButtonTitle }}</span>
    </button>

    <!-- Modal -->
    <app-dialog
        :title="$t('filter.dateDialogTitle')"
        width="542px"
        :visible.sync="dialogIsVisible"
    >
      <div class="modal-content">
        <template>
          <date-range-picker
              ref="picker"
              :opens="'inline'"
              :min-date="new Date()"
              :locale-data="$t('datePicker')"
              :timePicker="false"
              :showWeekNumbers="false"
              :showDropdowns="false"
              :ranges="false"
              :autoApply="false"
              v-model="dateRange"
              @update="handleDateUpdate"
          >
          </date-range-picker>
        </template>
      </div>
    </app-dialog>
  </div>
</template>

<script>
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import AppDialog from "@/components/app/AppDialog"
import {formatDate, mySqlDateToJs} from "@/js/go"
import {mapActions, mapState} from "vuex";
import {goRoute} from "@/js/filter";

export default {
name: "DateFilter",
  components: { DateRangePicker, AppDialog },
  data(){
    return {
      dialogIsVisible: false,
      dateRange: {},
      loading: false,
      dateFrom: null,
      dateTo: null,
    }
  },

  computed: {
    ...mapState('Filters', ['filters']),
    showButtonTitle(){
      if(this.filters.date_from){
        return this.formatFilterDateToCalendarView(this.filters.date_from) + ' - ' + this.formatFilterDateToCalendarView(this.filters.date_to)
      } else {
        return this.$t('filter.dateBtnTitle')
      }
    }
  },
  methods: {
    ...mapActions('Filters', ['setFilter']),

    toggleDialogVisibility(){
      this.dialogIsVisible = !this.dialogIsVisible
    },

    async handleDateUpdate(dateRange){
      if(dateRange.startDate){
          this.dateFrom = formatDate(dateRange.startDate)
      }
      if(dateRange.endDate){
          this.dateTo = formatDate(dateRange.endDate)
      }
      await this.setFilter({
        date_from: this.dateFrom,
        date_to: this.dateTo,
      })
      this.hideDialog()
      await goRoute({
        name: 'IdeaList',
        query: this.filters
      })
    },

    showDialog(){
      this.dialogIsVisible = true
    },

    hideDialog(){
      this.dialogIsVisible = false
    },

    formatFilterDateToCalendarView(filterDate){
      const jsDate = mySqlDateToJs(filterDate);
      if(jsDate){
        const monthNames = this.$t('datePicker.monthNames');
        return jsDate.getDate() + ' ' + monthNames[jsDate.getMonth()].toLocaleLowerCase()
      } else {
        return undefined
      }
    }
  }

}

</script>

<style lang="scss">
  .calendars{
    &.row{
      margin-right: 0;
      margin-left: 0;
    }
  }
  .daterangepicker, .reportrange-text{
    border: none !important;
  }

</style>
