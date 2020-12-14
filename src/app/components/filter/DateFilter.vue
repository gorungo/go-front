<template>
  <div id="DateFilter" class="filter">
    <!-- Place filter button  -->
    <button type="button" class="filter__btn" :class="{active: dialogIsVisible}" @click="toggleDialogVisibility">
      <span class="text-first-uppercase">{{ showButtonTitle }}</span>
      <span class="filter__btn-clear" @click="clearRanges" v-if="dateRange !== {}">x</span>
    </button>

    <!-- Modal -->
    <app-dialog
        :title="$t('filter.dateDialogTitle')"
        width="600px"
        :visible.sync="dialogIsVisible"
        @closed="handleDialogClosed"
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
            <template v-slot:input="picker" style="min-width: 350px;">
              <div class="">
                <div>{{filterDateRangeTitle(picker)}}</div>
              </div>
            </template>
            <!--    footer slot-->
            <div slot="footer" slot-scope="data" class="slot">
              <div class="calendar__footer-slot">
                  <button type="button" @click="data.clickCancel" v-if="!data.in_selection" class="btn btn-default btn-sm">{{ $t('datePicker.cancelLabel') }}</button>
                  <button type="button" @click="data.clickApply" v-if="!data.in_selection" class="btn btn-primary btn-sm">{{ $t('datePicker.applyLabel') }}</button>
              </div>
            </div>
          </date-range-picker>
        </template>
      </div>
    </app-dialog>
  </div>
</template>

<script>
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import AppDialog from "@/app/components/app/AppDialog"
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

  mounted(){
    if(this.filters.date_from){
      let startDate = null;
      let endDate = null;
      startDate = new Date(this.filters.date_from)

      if(this.filters.date_to){
        endDate = new Date(this.filters.date_to)
      }else{
        endDate = new Date(this.filters.date_from)
      }

      this.dateRange = {startDate, endDate}
      this.dateFrom = startDate
      this.dateTo = endDate
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

    handleDialogClosed(){

    },

    clearRanges(){
      this.dateRange = {}
    },

    formatFilterDateToCalendarView(filterDate){
      const jsDate = mySqlDateToJs(filterDate);
      if(jsDate){
        const monthNames = this.$t('datePicker.monthNames');
        return jsDate.getDate() + ' ' + monthNames[jsDate.getMonth()].toLocaleLowerCase()
      } else {
        return undefined
      }
    },

    filterDateRangeTitle(picker){
      const monthNames = this.$t('datePicker.monthNames');
      const startDate =  picker && picker.startDate ? picker.startDate.getDate() + ' ' + monthNames[picker.startDate.getMonth()].toLocaleLowerCase() + ' ' + picker.startDate.getFullYear() : ''
      const endDate =  picker && picker.endDate ? picker.endDate.getDate() + ' ' + monthNames[picker.endDate.getMonth()].toLocaleLowerCase() + ' ' + picker.endDate.getFullYear(): ''
      return endDate ? startDate + ' - ' + endDate : startDate
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
  .daterangepicker{
    width: 100% !important;
    min-width: 600px !important;
    .calendars.row{
      display: block;
    }
  }
  .daterangepicker, .reportrange-text{
    border: none;
    td.start-date {
      border-radius: 1rem 0 0 1rem;
    }
    td.end-date {
      border-radius: 0 1rem 1rem 0;
    }
    .drp-calendar{
      max-width: 50%;
      width: 50%;
    }
  }

  .reportrange-text{
    width: auto !important;
    margin: 0 1rem;
    text-align: center;
    font-size: 18px;
    color: var(--text-color);
    padding: 0.5rem 1rem !important;
    border-radius: 0;
    border: none !important;
    border-bottom: 2px solid var(--text-color) !important;
  }
  .calendar__picker-slot{
    display: flex;
    justify-content: space-between;
  }
  .calendar__footer-slot{
    padding: 1rem;
    display: flex;
    justify-content: flex-end;
    align-content: center;
    border-top: 1px solid #f8f8f8;
  }

</style>
