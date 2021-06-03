<template>
  <div id="DateFilter" class="filter">
    <el-popover
        popper-class="filter__popover"
        placement="bottom"
        v-model="dialogIsVisible"
        v-click-outside="handleClickOutside"
        trigger="manual">
      <date-filter
          :value="dateRange ? dateRange : {}"
          @update="handleDateUpdate"
          @keypress.esc="handleClickOutside"
          v-if="dialogIsVisible"
      />
      <!-- Place filter button  -->
      <button slot="reference" type="button" class="filter__btn" :class="{active: dialogIsVisible}" @click="toggleDialogVisibility" :aria-expanded="dialogIsVisible">
        <span class="filter__btn-wrap">
          <span class="filter__btn-text">{{ showButtonTitle }}</span>
          <span class="filter__btn-clear" @click.prevent.stop="clearRanges" v-if="dateRange">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 6.47 6.47 2 12 2C17.53 2 22 6.47 22 12C22 17.53 17.53 22 12 22C6.47 22 2 17.53 2 12ZM12 10.59L14.59 8L16 9.41L13.41 12L16 14.59L14.59 16L12 13.41L9.41 16L8 14.59L10.59 12L8 9.41L9.41 8L12 10.59Z" fill="var(--secondary)"/>
            </svg>
          </span>
        </span>
      </button>
    </el-popover>
  </div>
</template>

<script>

import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import {formatDate, mySqlDateToJs} from "@/js/go"
import {mapActions, mapState} from "vuex"
import {goRoute} from "@/js/filter"
import DateFilter from "@/app/components/filter/DateFilter"

export default {
  name: "DateFilterPopover",
  components: { DateFilter },
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
    this.initialize()
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

    initialize(){
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

    async handleDateUpdate(dateRange){
      this.dateRange = dateRange
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
      this.dateRange = null
      this.dateFrom = null
      this.dateTo = null
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
  },

}

</script>
