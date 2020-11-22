<template>
  <div id="MainFilter" class="main-filter">
    <div class="main-filter__content">
      <place-filter />
      <date-filter />
    </div>
  </div>
</template>

<script>
import DateFilter from "@/components/filter/DateFilter";
import PlaceFilter from "@/components/filter/PlaceFilter";
export default {
  name: "MainFilter",
  components: {PlaceFilter, DateFilter},
  props:{
    size: {
      type: String,
      default: 'minimised'
    }
  }
}
</script>

<style scoped lang="scss">
.main-filter{
  padding: 1rem 0;
  display: flex;
  justify-content: center;
  .main-filter__content{
    border: 1px solid var(--border-color);
    border-radius: 2rem;
    padding: 0.5rem;
    display: flex;
    justify-content: space-evenly;
    &>div{
      padding-right: 0.5rem;
      &:last-child{
        padding-right: 0;
      }
    }
  }
}
</style>
