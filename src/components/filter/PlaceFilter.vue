<template>
  <div id="PlaceFilter" class="filter">
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
      <div class="modal-content filter__search-list">
        <div>
          <div v-if="place === null" class="filter__input-wrap">
            <i>
              <img src="/images/icons/search.svg" width="32px" alt="start search" />
            </i>
            <input name="placeTitle" class="form-control filter__input"
              v-model="searchTitle"
              :placeholder="$t('filter.typePlaceName')" autofocus />
          </div>
          <div v-if="place">
            <button :aria-label="$t('text.remove')" type="button" class="filter__active-place" @click="handleClear">
              <span class="filter__active-place-title">
                <img src="/images/icons/flag.svg" width="32px" alt="nearby flag" />
                <span>{{ place.display_name }}</span>
              </span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 6.47 6.47 2 12 2C17.53 2 22 6.47 22 12C22 17.53 17.53 22 12 22C6.47 22 2 17.53 2 12ZM12 10.59L14.59 8L16 9.41L13.41 12L16 14.59L14.59 16L12 13.41L9.41 16L8 14.59L10.59 12L8 9.41L9.41 8L12 10.59Z" fill="var(--secondary)"/>
              </svg>
            </button>
          </div>
          <loading v-if="loading"/>
          <ul class="filter__list" v-if="!loading && !place">
            <li v-if="!searchTitle.length">
              <button class="filter__list-item filter__list-item-nearby" @click="handleNearby">
                <span>
                  <img src="/images/icons/flag.svg" class="icon" width="32px" alt="nearby flag" />
                  {{$t('filter.nearby')}}
                </span>
              </button>
            </li>
            <li
                v-for="(pl) in filteredFoundPlaces"
                :key="pl.place_id"
            >
              <button type="button" class="filter__list-item" v-on:click="handleSetActivePlace(pl)">
                <span class="filter__list-item-title">
                  <img src="/images/icons/location.svg" class="icon" alt="tmb"/>
                  <span>{{ pl.display_name }}</span>
                </span>
                <span class="filter__list-item-select">{{ $t('text.select') }}</span>
              </button>
            </li>
          </ul>
          <div v-if="noSearchResults" class="filter__no-results mt-2">
            {{ $t('text.notFound') }}
          </div>
        </div>
      </div>
    </app-dialog>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import axios from '@/axios'
import AppDialog from "@/components/app/AppDialog"
import {firstToUpperCase} from '@/js/go'
import {search} from '@/api/osm'
import Loading from "@/components/app/Loading"
import {goRoute} from "@/js/filter"


export default {
  name: "PlaceFilter",
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

  components: {
    Loading,
    AppDialog,
  },

  data() {
    return {
      type: 'places',
      loading: false,
      searchTitle: '',
      lastSearchTitle: '',
      searchMinimum: 3,
      foundPlaces: [], // what we found
      position: null,
      dialogIsVisible: false,
      place: null,
    }
  },

  mounted() {
    this.place = this.activePlace
  },

  watch: {
    searchTitle() {
      this.osmSearch();
    },
  },

  computed: {
    ...mapState('App', ['activePlace', 'locationMode']),
    ...mapState('Filters', ['filters']),
    noSearchResults() {
      return !this.loading && !this.foundPlaces.length && this.searchTitle.length >= this.searchMinimum;
    },

    showButtonTitle() {
      if (this.activePlace) {
        return firstToUpperCase(this.activePlace.display_name);
      }
      if (this.mode === 'position') {
        return firstToUpperCase(this.$t('filter.nearby'));
      }
      return firstToUpperCase(this.$t('filter.placeBtnTitle'));
    },

    filteredFoundPlaces(){
      const types = ['city', 'administrative', 'island']
      return this.foundPlaces.filter( place => {
        return types.indexOf(place.type) > -1
      })
    }
  },

  methods: {
    ...mapActions('App',['setActivePlace']),
    ...mapActions('Filters', ['setFilter']),

    async handleSetActivePlace(place) {
      this.place = place
      await this.setActivePlace(place)
      await this.setFilter({
        place_id: place.place_id,
        search_type: 'place_position',
      })
      this.hideDialog()
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

    osmSearch(){
      setTimeout(() => {
        if(!this.loading && this.searchTitle.length >= this.searchMinimum) {
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
        }else{
          this.foundPlaces = [];
        }
      }, 1000)

    },

    getPlacesByTitle(){
        setTimeout(() => {
          if(!this.loading){
            this.foundPlaces = [];
            this.loading = true;
            axios.get( 'places', {
              params: {
                title: this.searchTitle,
              }
            }).then( (resp) => {
              if (resp.status === 200) {
                this.dataLoaded = true;
                this.foundPlaces = resp.data.data;
              }
            }).catch( (error) => {

              if (error.response === undefined) {
                console.log('no internet')
              }

            }).finally( () => {
              this.loading = false;
            })
          }
        }, 1500);

    },

    async fetchLastPlaces(){
      try {
        //todo
        //const lastPlaces = await axios.get(this.lastPlacesFetchUrl);
        //return lastPlaces;

      } catch (e) {
        console.error(e.message);
      }
    },

  }
}
</script>

<style scoped lang="scss">
//@import 'resources/sass/filter.scss';
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
