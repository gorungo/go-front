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
        :visible.sync="showPlaceFilterDialog"
    >
      <div class="modal-content filter__search-list">
        <div>
          <div v-if="selectedPlace === null" class="filter__input-wrap">
            <i>
              <img src="/images/icons/search.svg" width="32px" alt="start search" />
            </i>
            <input name="placeTitle" class="form-control filter__input"
              v-model="searchTitle"
              :placeholder="$t('filter.typePlaceName')" autofocus />
          </div>
          <div v-if="selectedPlace !== null" class="filter__active-place">
            <i>
              <img src="/images/icons/flag.svg" width="32px" alt="nearby flag" />
            </i>{{ selectedPlace.attributes.title }} <span @click="clearPlaceHandler" class="btn btn-link float-right">{{ $t('text.remove') }}</span>
          </div>
           <loading v-if="loading"/>
          <ul class="filter__list" v-if="!loading && !activeLocation">
            <li>
              <button v-if="!searchTitle.length" class="filter__list-item filter__list-item-nearby" @click="handleNearest">
                <img src="/images/icons/flag.svg" class="icon" width="32px" alt="nearby flag" />
                {{$t('filter.nearby')}}
              </button>
            </li>
            <li
                v-for="(place) in filteredFoundPlaces"
                :key="place.place_id"
            >
              <button type="button" class="filter__list-item" v-on:click="handleSetActivePlace(place)">
                <img src="/images/icons/location.svg" class="icon" alt="tmb"/>
                <span class="filter__list-item-title">{{ place.display_name }}</span>
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
import {getLocation} from '@/js/location'
import {search} from '@/api/osm'
import Loading from "@/components/app/Loading";

export default {
  name: "MainFilter",
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
      filterParamName: 'pl',
      filterAttributeName: 'hid',
      loading: false,
      searchTitle: '',
      searchMinimum: 3,
      mode: 'place', // place or position
      activePlace: null, // items of this place already loaded
      selectedPlace: null, // the place selected in filter window
      lastPlaces: [], // what we searched early
      foundPlaces: [], // what we found
      position: null,
      showPlaceFilterDialog: false,

    }
  },

  mounted() {
    if (this.propActivePlace !== undefined && this.propActivePlace !== null) {
      this.activePlace = this.propActivePlace;
      this.selectedPlace = this.propActivePlace;
    }

    if (this.filterUrl && this.filterUrl.charAt(0) === 'l') {
      this.mode = 'position';
    } else {
      this.mode = 'place';
    }

    this.hideComponentPreloader();

  },

  watch: {
    searchTitle(title) {
      if (!this.loading && title.length >= this.searchMinimum) {
        this.loading = true;
        this.osmSearch(title);
      }
    },

    filterUrl(filter) {
      if (filter && filter.charAt(0) === 'l') {
        // if filter is location coordinates
        this.mode = 'position';
        const location = filter.split('lng');
        if (location.length === 2) {
          this.locations = {
            latitude: location[0].substr(2),
            longitude: location[1],
          }
        }
      } else {
        // if filter is location hid
        this.mode = 'place';
      }
    }
  },

  computed: {
    ...mapState('App', ['activeLocation', 'locationMode']),
    noSearchResults() {
      return !this.loading && !this.foundPlaces.length && this.searchTitle.length >= this.searchMinimum;
    },

    showButtonTitle() {
      if (this.activePlace) {
        return firstToUpperCase(this.activePlace.attributes.title);
      }
      if (this.mode === 'position') {
        return firstToUpperCase(this.$t('filter.nearby'));
      }
      return firstToUpperCase(this.$t('filter.placeBtnTitle'));
    },

    filterUrl: {
      // геттер:
      get: function () {
        let newUrl = new URL(window.location.href);
        const filter = encodeURI(newUrl.searchParams.get(this.filterParamName));
        return filter;
      },
      // сеттер:
      set: function (newValue) {
        if (newValue) {
          let newUrl = new URL(window.location.href);
          newUrl.searchParams.set(this.filterParamName, encodeURI(newValue.toString()));
          window.location.href = newUrl;
        } else {
          let newUrl = new URL(window.location.href);
          newUrl.searchParams.delete(this.filterParamName);
          window.location.href = newUrl;
        }
      }
    },

    filteredFoundPlaces(){
      const types = ['city', 'administrative']
      return this.foundPlaces.filter( place => {
        return types.indexOf(place.type) > -1
      })
    }


  },

  methods: {
    ...mapActions('App',['setActiveLocation', '']),

    handleSetActivePlace(place) {
      this.mode = 'place';
      this.selectedPlace = place;
    },

    clearPlaceHandler() {
      this.selectedPlace = null;
    },

    hideComponentPreloader() {
      const f = document.querySelector('.fw-fake');
      if (f) {
        f.classList.remove('fw-fake');
      }
    },

    async handleNearest() {
      this.mode = 'position';
      this.loading = true;

      try {
        const position = await getLocation();
        this.position = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

      } catch (e) {
        console.log('Не могу получить местоположение');
        this.position = null;
      }

      this.loading = false;
    },

    toggleDialogVisibility(){
      this.showPlaceFilterDialog = !this.showPlaceFilterDialog;
    },

    HandleApplyFilter() {
      if (this.mode === 'place') {
        if (this.selectedPlace) {
          this.activePlace = this.selectedPlace;
          this.filterUrl = this.activePlace[this.filterAttributeName];
        }
      } else if (this.mode === 'position') {
        this.filterUrl = `lat${this.position.latitude}lng${this.position.longitude}`;
      } else {
        this.filterUrl = null;
      }
      this.hideDialog()
    },

    HandleClearFilter() {
      this.selectedPlace = null;
      this.activePlace = null;
      this.filterUrl = null;
      this.hideDialog()
    },

    showDialog(){
      this.showPlaceFilterDialog = true;
    },

    hideDialog(){
      this.showPlaceFilterDialog = false;
    },

    osmSearch(title){
          this.foundPlaces = [];
          this.loading = true;
          search(title, {limit:10}).then( resp => {
                if (resp.status === 200) {
                  this.foundPlaces = resp.data;
                }
              }).catch( e => {
                if (e.response === undefined) {
                  console.log('no internet')
                }
              }).finally( () => {
                this.loading = false;
              })

        },

    getPlacesByTitle(title){
          this.foundPlaces = [];
          axios.get( 'places', {
            params: {
              title: title,
            }
          } ).then( (resp) => {
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
  .filter__list{
    margin: 0;
    padding: 0;
    list-style-type: none;

    .filter__list-item{
      display: flex;
      width: 100%;
      align-items: center;
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
    .filter__list-item-title{
      width: 100%;
    }
    .filter__list-item-select{
      width: 100px;
      margin-left: 1rem;
      text-align: center;
    }
  }

  .filter__active-place, .filter__input-wrap {

  }

  .filter__list-item {

    .btn {
      padding: 0;
    }
  }

  .filter__list-item

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
