<template>
  <div class="filter__content">
    <div>
      <div v-if="place === null" class="filter__input-wrap">
        <i>
          <img alt="start search" src="/images/icons/search.svg" width="32"/>
        </i>
        <input v-model="searchTitle" id="place-input"
               :placeholder="$t('filter.typePlaceName')"
               autocomplete="off"
               class="form-control filter__input"
               name="placeTitle"
        />
      </div>
      <div v-if="place">
        <button :aria-label="$t('text.remove')" class="filter__active-place" type="button" @click="handleClear">
              <span class="filter__active-place-title">
                <img alt="nearby flag" src="/images/icons/flag.svg" width="32"/>
                <span>{{ place.title ? place.title : place.display_name }}</span>
              </span>
          <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path clip-rule="evenodd"
                  d="M2 12C2 6.47 6.47 2 12 2C17.53 2 22 6.47 22 12C22 17.53 17.53 22 12 22C6.47 22 2 17.53 2 12ZM12 10.59L14.59 8L16 9.41L13.41 12L16 14.59L14.59 16L12 13.41L9.41 16L8 14.59L10.59 12L8 9.41L9.41 8L12 10.59Z"
                  fill="var(--secondary)"
                  fill-rule="evenodd"/>
          </svg>
        </button>
      </div>
      <loading v-if="loading"/>
      <ul v-if="!loading && !place" class="filter__list">
        <li v-if="!searchTitle.length">
          <button class="filter__list-item filter__list-item-nearby" @click="handleNearby">
            <span class="filter__active-place-title">
              <img alt="nearby flag" class="icon" src="/images/icons/flag.svg" height="32"/>
              {{ $t('filter.nearby') }}
            </span>
          </button>
        </li>
        <li v-for="pl in filteredFoundPlaces" :key="pl.place_id">
          <button class="filter__list-item" type="button" v-on:click="handleSetActivePlace(pl)">
                <span class="filter__list-item-title">
                  <img alt="tmb" class="icon" src="/images/icons/location.svg"/>
                  <span>{{ pl.title ? pl.title : pl.display_name }}</span>
                </span>
            <span class="filter__list-item-select">{{ $t('text.select') }}</span>
          </button>
        </li>
      </ul>
      <div v-if="noSearchResults" class="filter__no-results mt-2">
        {{ $t('text.notFound') }}
      </div>
      <div class="filter__popular-places mt-1">
        <div class="filter__popular-places-title">Популярные места</div>
        <ul v-if="popularPlaces" class="filter__list filter__popular-places-list">
          <li v-for="pl in popularPlaces" :key="pl.place_id">
            <button class="filter__list-item" type="button" v-on:click="handleSetActivePlace(pl)">
                <span class="filter__list-item-title">
                  <img alt="tmb" class="icon" src="/images/icons/location.svg"/>
                  <span>{{ pl.title ? pl.title : pl.display_name }}</span>
                </span>
              <span class="filter__list-item-select">{{ $t('text.select') }}</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex'
import axios from '@/axios'
import {firstToUpperCase} from '@/js/go'
import {getPlacesByTitle, getPopularPlaces, search} from '@/api/osm'
import Loading from "@/app/components/app/Loading"
import {goRoute} from "@/js/filter"
import {savePlace} from "@/api/osm";


export default {
  name: "PlaceFilter",

  components: {
    Loading,
  },

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
      loading: false,
      searchTitle: '',
      lastSearchTitle: '',
      searchMinimum: 3,
      foundPlaces: [], // what we found
      popularPlaces: [],
      position: null,
      place: null,
      dialogIsVisible: false,
    }
  },

  mounted() {
    this.place = this.activePlace
    this.fetchPopularPlaces()
  },

  watch: {
    searchTitle() {
      this.osmSearch();
    },

    activePlace(place) {
      this.place = place
    }
  },

  computed: {
    ...mapState('App', []),
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

    filteredFoundPlaces() {
      const types = ['city', 'administrative', 'island']
      return this.foundPlaces.filter(place => {
        return types.indexOf(place.type) > -1
      })
    }
  },

  methods: {
    ...mapActions('Filters', ['setFilter', 'setActivePlace']),

    async handleSetActivePlace(place) {

      // save place to db and get with id
      if(!place.id){
        await savePlace(place).then( resp => {
          place = resp.data.data
        })
      }
      await this.setActivePlace(place)
      if(place.id){
        await this.setFilter({
          place_id: place.id,
          search_type: 'place_position',
        })
      } else {
        await this.setFilter({
          place_id: place.place_id,
          search_type: 'place_id',
        })
      }
      this.$emit('close')
      await goRoute({
        name: 'IdeaList',
        query: this.filters
      })
    },

    async handleNearby() {
      this.place = null
      await this.setActivePlace(null)
      await this.setFilter({
        place_id: null,
        search_type: 'nearby',
      })
      this.$emit('close')
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
      this.setActivePlace(null)
      this.filterUrl = null
      this.$emit('close')
    },

    toggleDialogVisibility() {
      this.dialogIsVisible = !this.dialogIsVisible;
    },


    hideDialog() {
      this.$emit('close')
    },

    osmSearch() {
      setTimeout(() => {
        if (!this.loading && this.searchTitle.length >= this.searchMinimum) {
          this.foundPlaces = [];
          this.loading = true;
          search(this.searchTitle, {limit: 10}).then(resp => {
            if (resp.status === 200) {
              this.foundPlaces = resp.data;
            }
          }).catch(e => {
            if (e.response === undefined) {
              console.log('no internet')
            }
          }).finally(() => {
            this.loading = false;
          })
        } else {
          this.foundPlaces = [];
        }
      }, 1000)

    },

    getPlacesByTitle() {
      setTimeout(async () => {
        if (!this.loading) {
          this.foundPlaces = [];
          this.loading = true;
          await getPopularPlaces.then(resp => {
            if (resp.status === 200) {
              this.dataLoaded = true;
              this.foundPlaces = resp.data.data;
            }
          }).catch((error) => {

            if (error.response === undefined) {
              console.log('no internet')
            }

          }).finally(() => {
            this.loading = false;
          })
        }
      }, 1500);

    },

    async fetchPopularPlaces() {
      try {
        await getPopularPlaces().then(resp => {
          if (resp.status === 200) {
            this.popularPlaces = resp.data;
          }
        })

      } catch (e) {
        console.error(e.message);
      }
    },

    handleClickOutside() {
      if (this.dialogIsVisible) {
        this.hideDialog();
      }
    },

  }
}
</script>

