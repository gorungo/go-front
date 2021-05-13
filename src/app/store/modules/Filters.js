import {
  SET_GPS_POSITION,
  SET_ACTIVE_PLACE,
  REMOVE_FILTERS,
  SET_FILTER,
  SET_FILTERS
} from '../mutation-types';

import {availableFilters, getQueryFilters} from "@/js/filter"
import {getPlace} from "@/api/osm";

export default {
  namespaced: true,
  state: {
    filters: {},
    activePlace: null,
    gpsPosition: null,
  },
  actions: {
    initialiseStore({dispatch}) {
      dispatch('setFilters', getQueryFilters())
      // gps position
      if (localStorage.getItem('gpsPosition')) {
        dispatch('setGpsPosition', JSON.parse(localStorage.getItem('gpsPosition')))
      }
    },

    setFilter({dispatch, state}, payload) {
      const filters = {...state.filters, ...payload}
      dispatch('setFilters', filters)
    },

    /**
     * Clear old and set new filters
     * @param commit
     * @param payload
     */
    setFilters({commit}, payload) {
      let filters = {}
      let filtersToRemove = {}
      Object.keys(payload).forEach(key => {
        if (availableFilters.indexOf(key) > -1) {
          if (payload[key] != null && payload[key] !== undefined) {
            filters[key] = payload[key]
          }
          if (payload[key] == null || payload[key] === undefined) {
            filtersToRemove[key] = payload[key]
          }
        }
      })
      commit(SET_FILTERS, filters)
      commit(REMOVE_FILTERS, filtersToRemove)
    },

    clearFilters({dispatch}) {
      dispatch('setFilters', {
        query: null,
        place_id: null,
        checkin: null,
        checkout: null,
        time_of_day: null,
        adults: null,
        children: null,
        price_min: null,
        price_max: null,
        languages: null,
      })
    },

    setActivePlace({commit}, place) {
      commit(SET_ACTIVE_PLACE, place)
    },

    initialiseActivePlace({dispatch, state}, place_id) {
      if (!state.activePlace) {
        if (place_id) {
          getPlace(place_id).then(resp => {
            dispatch('setActivePlace', resp.data)
          })
        } else {
          dispatch('setActivePlace', null)
        }
      }
    },

    setGpsPosition({commit}, gpsPosition) {
      commit(SET_GPS_POSITION, gpsPosition)
    },

  },
  mutations: {
    [SET_FILTER](state, filter) {
      state.filters = {...state.filters, filter}
    },
    [SET_FILTERS](state, filters) {
      state.filters = {...state.filters, ...filters}
    },
    [REMOVE_FILTERS](state, filters) {
      Object.keys(filters).forEach(key => {
          delete state.filters[key]
      })
    },
    [SET_ACTIVE_PLACE](state, place) {
      state.activePlace = place
    },
    [SET_GPS_POSITION](state, gpsPosition) {
      state.gpsPosition = gpsPosition
    },
  },
  getters: {
    searchType(state){
      return state.filters.search_type ? state.filters.search_type : null;
    },
  },
}
