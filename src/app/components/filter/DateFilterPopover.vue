<template>
  <div id="DateFilter" class="filter">
    <el-popover
        popper-class="filter__popover"
        placement="bottom"
        v-model="dialogIsVisible"
        v-click-outside="handleClickOutside"
        trigger="manual">
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
            @keypress.esc="handleClickOutside"

        >
          <template v-slot:input="picker">
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
      <!-- Place filter button  -->
      <button slot="reference" type="button" class="filter__btn" :class="{active: dialogIsVisible}" @click="toggleDialogVisibility">
        <span class="filter__btn-text">{{ showButtonTitle }}</span>
        <span class="filter__btn-clear" @click="clearRanges" v-if="dateRange !== {}">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 6.47 6.47 2 12 2C17.53 2 22 6.47 22 12C22 17.53 17.53 22 12 22C6.47 22 2 17.53 2 12ZM12 10.59L14.59 8L16 9.41L13.41 12L16 14.59L14.59 16L12 13.41L9.41 16L8 14.59L10.59 12L8 9.41L9.41 8L12 10.59Z" fill="var(--secondary)"/>
          </svg>
        </span>
      </button>
    </el-popover>

  </div>
</template>

<script>
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import {formatDate, mySqlDateToJs} from "@/js/go"
import {mapActions, mapState} from "vuex";
import {goRoute} from "@/js/filter";

export default {
  name: "DateFilterPopover",
  components: { DateRangePicker },
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
      this.handleDateUpdate()
    },

    handleClickOutside(){
      if(this.dialogIsVisible){
        this.hideDialog();
      }
    },

    handleBtnFocus(){
      if(!this.dialogIsVisible){
        this.showDialog();
      }
    },

    handleBtnBlur(){
      if(this.dialogIsVisible){
        this.hideDialog();
      }
    },

    async clearRanges(){
      this.dateRange = {}
      this.dateFrom=null
      this.dateTo=null
      await this.setFilter({
        date_from: null,
        date_to: null,
      })
      this.hideDialog()
      await goRoute({
        name: 'IdeaList',
        query: this.filters
      })
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
  },

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
.filter__popover{
  z-index: 3001 !important;
}
.filter > span{
  width: 100%;
}

</style>
