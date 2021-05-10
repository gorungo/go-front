<template>
  <div id="PlaceFilter" class="filter filter-place">
    <el-popover
        v-model="dialogIsVisible"
        v-click-outside="handleClickOutside"
        placement="bottom"
        popper-class="filter__popover"
        trigger="manual">
      <place-filter />
      <!-- Place filter button  -->
      <button slot="reference" :aria-expanded="dialogIsVisible" :class="{active: dialogIsVisible}" class="filter__btn"
              type="button" @click="toggleDialogVisibility">
        <span class="filter__btn-wrap">
          <span class="filter__btn-text">{{ showButtonTitle }}</span>
          <span v-if="activePlace !== null" class="filter__btn-clear" @click="handleNearby">
            <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd" d="M2 12C2 6.47 6.47 2 12 2C17.53 2 22 6.47 22 12C22 17.53 17.53 22 12 22C6.47 22 2 17.53 2 12ZM12 10.59L14.59 8L16 9.41L13.41 12L16 14.59L14.59 16L12 13.41L9.41 16L8 14.59L10.59 12L8 9.41L9.41 8L12 10.59Z"
                    fill="var(--secondary)"
                    fill-rule="evenodd"/>
            </svg>
          </span>
        </span>
      </button>
    </el-popover>
  </div>
</template>

<script>
import {mapActions, mapState, mapGetters} from 'vuex'
import {firstToUpperCase} from '@/js/go'
import {goRoute} from "@/js/filter"
import PlaceFilter from "@/app/components/filter/PlaceFilter";


export default {
  name: "PlaceFilterPopover",

  components: {PlaceFilter},

  props: {
    // active place resource
    propActivePlace: {
      type: Object,
      default: function () {
        return null;
      }

    },
    // selected section
    propSection: {
      type: String,
      default: 'places'
    },
  },

  data() {
    return {
      type: 'places',
      dialogIsVisible: false,
    }
  },


  computed: {
    ...mapState('Filters', ['filters', 'activePlace']),
    ...mapGetters('Filters', ['searchType']),
    noSearchResults() {
      return !this.loading && !this.foundPlaces.length && this.searchTitle.length >= this.searchMinimum;
    },

    showButtonTitle() {
      if (this.activePlace) {
        return firstToUpperCase(this.activePlace.title ? this.activePlace.title : this.activePlace.display_name);
      }
      if (this.searchType === 'nearby') {
        return firstToUpperCase(this.$t('filter.nearby'));
      }
      return firstToUpperCase(this.$t('filter.placeBtnTitle'));
    },

  },

  methods: {
    ...mapActions('Filters', ['setFilter', 'setActivePlace']),

    async handleNearby() {
      this.place = null
      await this.setActivePlace(null)
      await this.setFilter({
        place_id: null,
        search_type: 'nearby',
      })
      this.hideDialog()
      await goRoute({
        name: 'IdeaList',
        query: this.filters
      })
    },

    hideComponentPreloader() {
      const f = document.querySelector('.fw-fake')
      if (f) {
        f.classList.remove('fw-fake')
      }
    },

    handleClearFilter() {
      this.setActivePlace( null )
      this.filterUrl = null
      this.hideDialog()
    },

    toggleDialogVisibility(){
      this.dialogIsVisible = !this.dialogIsVisible;
    },

    showDialog(){
      this.dialogIsVisible = true;
    },

    hideDialog(){
      this.dialogIsVisible = false;
    },

    handleClickOutside(){
      if(this.dialogIsVisible){
        this.hideDialog();
      }
    },

  }
}
</script>

<style scoped lang="scss">
//@import 'resources/sass/filter.scss';
.filter__content {
  min-width: 500px;
  .filter__input-wrap {
    display: flex;
    padding: 0.5rem 1rem;
    align-items: center;

    i {
      width: 2rem;
      margin-right: 1rem;
      text-align: center;
    }

    .filter__input {
      width: 100%;
      font-weight: bold;
      border-radius: unset;
      border: none;
      padding: 1.5rem 0;
      margin: 0;
      font-size: 18px;
      border-bottom: 2px solid black;
      background-color: transparent;
    }

    .filter__input:focus, .filter__input:active{
      box-shadow: none;
      outline: none;
    }

    &:focus-within{
      background-color: #f8f8f8;
    }

  }
  .filter__active-place,
  .filter__list-item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border: none;
    padding: 1rem;
    text-align: initial;
    background-color: white;
    cursor: pointer;

    .icon{
      width: 2rem;
      margin-right: 1rem;
      object-fit: cover;
    }
    &:hover {
      background-color: #f8f8f8;
    }

  }
  .filter__list{
    margin: 0;
    padding: 0;
    list-style-type: none;
    .filter__list-item-select{
      width: 100px;
      margin-left: 1rem;
      text-align: center;
    }
  }

  .filter__list-item-title,
  .filter__active-place-title{
    width: 100%;
    display: flex;
    align-items: center;
    img{
      margin-right: 1rem;
    }

  }

  .filter__active-place, .filter__input-wrap {

  }

  .filter__list-item {
    .btn {
      padding: 0;
    }
  }


  .filter__no-results {
    padding: 1rem;
    text-align: center;
  }

  .modal-body {
    padding: 0;
  }

  .modal-footer{
    display: flex;
    justify-content: flex-end;
    border-top: 1px solid var(--border-color-dark);
    padding: 1rem;
  }
}


</style>
