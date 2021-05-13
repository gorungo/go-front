<template>
  <div id="DateFilter" class="filter">
    <!-- Place filter button  -->
    <button slot="reference" type="button" class="filter__btn" :class="{active: dialogIsVisible}" @click="toggleDialogVisibility" :aria-expanded="dialogIsVisible">
      <span class="filter__btn-wrap">
      <span class="filter__btn-text">{{ showButtonTitle }}</span>
      <span class="filter__btn-clear" @click="clearRanges" v-if="dateRange !== {}">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 6.47 6.47 2 12 2C17.53 2 22 6.47 22 12C22 17.53 17.53 22 12 22C6.47 22 2 17.53 2 12ZM12 10.59L14.59 8L16 9.41L13.41 12L16 14.59L14.59 16L12 13.41L9.41 16L8 14.59L10.59 12L8 9.41L9.41 8L12 10.59Z" fill="var(--secondary)"/>
          </svg>
        </span>
      </span>
    </button>

    <!-- Modal -->
    <app-dialog
        :title="$t('filter.dateDialogTitle')"
        :visible.sync="dialogIsVisible"
        @closed="handleDialogClosed"
        fullscreen
    >
    <date-filter
        ref="dateFilter"
        :value="dateRange ? dateRange : {}"
        no-footer
        @update="handleDateUpdate"
        @select="handleDateSelect"
        @keypress.esc="handleDialogClosed"
    />
      <template slot="footer">
      <div>
        <button type="button" class="btn btn-sm" @click="handleCancelClick">{{ $t('datePicker.cancelLabel') }}</button>
        <button type="button" class="btn btn-primary btn-sm" @click="handleApplyClick">{{ $t('datePicker.applyLabel') }}</button>
      </div>
      </template>
    </app-dialog>
  </div>
</template>

<script>
import DateFilter from "@/app/components/filter/DateFilter"
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import AppDialog from "@/app/components/app/AppDialog"
import {formatDate, mySqlDateToJs} from "@/js/go"
import {mapActions, mapState} from "vuex";
import {goRoute} from "@/js/filter";

export default {
name: "DateFilterModal",
  components: { DateFilter, AppDialog },
  data(){
    return {
      dialogIsVisible: false,
      dateRange: null,
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
      this.dateRange = dateRange
      if(dateRange.startDate){
          this.dateFrom = formatDate(dateRange.startDate)
      }
      if(dateRange.endDate){
          this.dateTo = formatDate(dateRange.endDate)
      }

    },

    async handleDateSelect(dateRange){
      this.dateRange = dateRange
      if(dateRange.startDate){
        this.dateFrom = formatDate(dateRange.startDate)
      }
      if(dateRange.endDate){
        this.dateTo = formatDate(dateRange.endDate)
      }
    },

    handleCancelClick(){
      this.applyFilter()
    },

    handleApplyClick(){
      this.applyFilter()
    },

    async applyFilter(){
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
      this.dateRange = null
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

