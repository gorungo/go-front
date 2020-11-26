<template>
  <div id="MainFilter" class="main-filter" :class="{minimised}">
    <div class="main-filter__content">
      <place-filter ref="placeFilter" />
      <date-filter ref="dateFilter" />
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
    minimised: {
      type: Boolean,
    }
  }
}
</script>

<style lang="scss">
.main-filter{
  padding: 1rem 0;
  display: flex;
  justify-content: center;
  &.minimised{
    .main-filter__content{
      padding: 0;
      &>div{
        border-right: 1px solid var(--border-color-dark);
        &:last-child{
          padding-right: 0;
          border-right: none;
        }
      }
    }
    .filter__btn{
      background: none;
    }
  }
  .main-filter__content{
    border: 1px solid var(--border-color-dark);
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

.filter {
  display: flex;
  justify-content: center;
  .filter__btn{
    padding: 1rem 2rem;
    border-radius: 2rem;
    outline: none;
    border: none;
    font-weight: bold;
    &:focus{
      box-shadow: 0 0 0 3px var(--focus-color);
    }

  }
}
</style>
