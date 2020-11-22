<template>
  <div id="DateFilter" class="filter">
    <!-- Place filter button  -->
    <button type="button" class="filter__btn" @click="toggleDialogVisibility">
      <span class="text-first-uppercase">{{ showButtonTitle }}</span>
    </button>

    <!-- Modal -->
    <app-dialog
        :title="$t('filter.placeDialogTitle')"
        width="500px"
        :visible.sync="dialogIsVisible"
    >
      <div class="modal-content">
        <template>
          <date-range-picker
              ref="picker"
              :opens="'inline'"
              :locale-data="{ firstDay: 1, format: 'DD-MM-YYYY HH:mm:ss' }"
              :timePicker="false"
              :showWeekNumbers="false"
              :showDropdowns="false"
              :autoApply="false"
              v-model="dateRange"
              :linkedCalendars="true"
          >
            <template v-slot:input="picker" style="min-width: 350px;">
              {{ picker.startDate | date }} - {{ picker.endDate | date }}
            </template>
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

export default {
name: "DateFilter",
  components: { DateRangePicker, AppDialog },
  data(){
    return {
      dialogIsVisible: false,
      dateRange: {},
      loading: false,
    }
  },

  computed: {
    showButtonTitle(){
      return this.$t('filter.dateBtnTitle')
    }
  },
  methods: {
    toggleDialogVisibility(){
      this.dialogIsVisible = !this.dialogIsVisible;
    },

    showDialog(){
      this.dialogIsVisible = true;
    },

    hideDialog(){
      this.dialogIsVisible = false;
    },
  }

}
</script>

<style scoped lang="scss">
.filter {
  display: flex;
  justify-content: center;
  .filter__btn{
    padding: 1rem 2rem;
    border-radius: 2rem;
    outline: none;
    border: none;
    &:focus{
      box-shadow: 0 0 0 3px var(--focus-color);
    }

  }
}
</style>
