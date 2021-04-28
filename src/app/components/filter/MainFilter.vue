<template>
  <div id="MainFilter" class="main-filter" :class="{minimised}">
    <div class="main-filter__content">
      <place-filter-modal v-if="isMobile" ref="placeFilter" />
      <place-filter-popover v-else ref="placeFilter" />
      <date-filter-modal v-if="isMobile" ref="dateFilter" />
      <date-filter-popover v-else ref="dateFilter" />
    </div>
  </div>
</template>

<script>
import PlaceFilterPopover from "@/app/components/filter/PlaceFilterPopover";
import PlaceFilterModal from "@/app/components/filter/PlaceFilterModal";
import DateFilterPopover from "@/app/components/filter/DateFilterPopover";
import DateFilterModal from "@/app/components/filter/DateFilterModal";

export default {
  name: "MainFilter",
  components: {DateFilterPopover, PlaceFilterPopover, PlaceFilterModal, DateFilterModal},
  props:{
    minimised: {
      type: Boolean,
    },
  },
  computed: {
    isMobile(){
      return this.$root.isMobile
    }
  }
}
</script>

<style lang="scss">

</style>
