<template>
  <div id="PlaceFilter" class="filter">
    <!-- Place filter button  -->
    <button :aria-expanded="dialogIsVisible" :class="{active: dialogIsVisible}" class="filter__btn" type="button" @click="toggleDialogVisibility">
      <span class="filter__btn-wrap">
        <span class="filter__btn-text">{{ showButtonTitle }}</span>
        <span v-if="activePlace !== null" class="filter__btn-clear" @click="handleNearby">
            <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd" d="M2 12C2 6.47 6.47 2 12 2C17.53 2 22 6.47 22 12C22 17.53 17.53 22 12 22C6.47 22 2 17.53 2 12ZM12 10.59L14.59 8L16 9.41L13.41 12L16 14.59L14.59 16L12 13.41L9.41 16L8 14.59L10.59 12L8 9.41L9.41 8L12 10.59Z"
                    fill="var(--secondary)"
                    fill-rule="evenodd"/>
            </svg>
        </span>
      </span>
    </button>

    <!-- Modal -->
    <app-dialog
        :title="$t('filter.placeDialogTitle')"
        :visible.sync="dialogIsVisible"
        fullscreen
    >
      <place-filter ref="placeFilter" @close="hideDialog" />
    </app-dialog>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex'
import AppDialog from "@/app/components/app/AppDialog"
import {firstToUpperCase} from '@/js/go'
import {goRoute} from "@/js/filter"
import PlaceFilter from "@/app/components/filter/PlaceFilter"

export default {
  name: "PlaceFilterModal",
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

  components: {AppDialog, PlaceFilter},

  data() {
    return {
      dialogIsVisible: false,
      place: null,
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
    ...mapActions('Filters',['setActivePlace']),
    ...mapActions('Filters', ['setFilter']),

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

    async handleClear() {
      this.place = null
      this.searchTitle = ''
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

  }
}
</script>

