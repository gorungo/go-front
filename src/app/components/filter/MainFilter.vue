<template>
  <div id="MainFilter" class="main-filter" :class="{minimised}">
    <div class="main-filter__content">
      <place-filter ref="placeFilter" />
      <date-filter-popover ref="dateFilter" />
    </div>
  </div>
</template>

<script>
import PlaceFilter from "@/app/components/filter/PlaceFilter";
import DateFilterPopover from "@/app/components/filter/DateFilterPopover";
export default {
  name: "MainFilter",
  components: {DateFilterPopover, PlaceFilter},
  props:{
    minimised: {
      type: Boolean,
    }
  }
}
</script>

<style lang="scss">
.main-filter{
  display: flex;
  padding: 1rem 0;
  width: 600px;
  justify-content: center;
  &:focus-within{
    .filter{
      border-right: none;
    }

  }

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
    width: 100%;
    background: white;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;

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
  width: 50%;
  border-right: 1px solid var(--border-color-dark);
  &:last-child{
    border-right: none;
  }
  button{
    display: flex;
    justify-content: space-between;
    align-content: center;
    border-radius: 2rem;
    outline: none;
    border: none;
    font-weight: bold;
    width: 100%;
    text-align: left;
    background: transparent;

    &:focus, &.active{
      box-shadow: 0 0 0 3px var(--focus-color);
      .filter__btn-clear{
        display: block;
        align-self: center;
        margin-right: 0.25rem;
      }
    }
    &:hover{
      background-color: #f8f8f8;
    }

    .filter__btn-text{
      padding: 1rem 0.5rem;
    }

    .filter__btn-clear{
      display: none;
    }

  }
}
</style>
