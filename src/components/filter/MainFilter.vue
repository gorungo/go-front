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
          <div v-if="activePlace === null" class="filter__input-wrap">
            <i>
              <img src="/images/icons/search.svg" width="32px" alt="start search" />
            </i>
            <input name="placeTitle" class="form-control filter__input"
              v-model="searchTitle"
              :placeholder="$t('filter.typePlaceName')" autofocus />
          </div>
          <div v-if="activePlace">
            <button type="button" class="filter__active-place" @click="handleSetActivePlace(null)">
              <span>
                <img src="/images/icons/flag.svg" width="32px" alt="nearby flag" />
                <span>{{ activePlace.display_name }}</span>
              </span>
              <span class="btn btn-link float-right">{{ $t('text.remove') }}</span>
            </button>
          </div>
          <loading v-if="loading"/>
          <ul class="filter__list" v-if="!loading && !activePlace">
            <li v-if="!searchTitle.length">
              <button class="filter__list-item filter__list-item-nearby" @click="handleSetActivePlace(null)">
                <span>
                  <img src="/images/icons/flag.svg" class="icon" width="32px" alt="nearby flag" />
                  {{$t('filter.nearby')}}
                </span>
              </button>
            </li>
            <li
                v-for="(place) in filteredFoundPlaces"
                :key="place.place_id"
            >
              <button type="button" class="filter__list-item" v-on:click="handleSetActivePlace(place)">
                <span>
                  <img src="/images/icons/location.svg" class="icon" alt="tmb"/>
                  <span class="filter__list-item-title">{{ place.display_name }}</span>
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
      loading: false,
      searchTitle: '',
      lastSearchTitle: '',
      searchMinimum: 3,
      foundPlaces: [], // what we found
      position: null,
      showPlaceFilterDialog: false,
    }
  },

  mounted() {

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
      await this.setActivePlace(place)
      await this.setFilter({
        place_id:place ? place.place_id : null,
      })
      this.hideDialog()
      await goRoute({
        name: 'IdeaList',
        query: this.filters
      })
    },

    HandleClearPlace() {
      this.setActivePlace(null)
      this.setFilter({
        placeId:undefined
      })
    },

    hideComponentPreloader() {
      const f = document.querySelector('.fw-fake')
      if (f) {
        f.classList.remove('fw-fake')
      }
    },

    toggleDialogVisibility(){
      this.showPlaceFilterDialog = !this.showPlaceFilterDialog;
    },

    handleClearFilter() {
      this.setActivePlace( null )
      this.filterUrl = null
      this.hideDialog()
    },

    showDialog(){
      this.showPlaceFilterDialog = true;
    },

    hideDialog(){
      this.showPlaceFilterDialog = false;
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
  .filter__list{
    margin: 0;
    padding: 0;
    list-style-type: none;


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
