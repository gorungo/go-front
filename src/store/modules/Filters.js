import {
    SET_FILTER,
    SET_FILTERS,
} from '../mutation-types';
import {availableFilters, getQueryFilters} from "@/js/filter"

export default {
    namespaced: true,
    state: {
        filters: {},
    },
    actions: {
        initialiseStore({dispatch}) {
            dispatch('setFilters', getQueryFilters())
        },

        setFilter({dispatch, state}, payload) {
            const filters = {...state.filters, ...payload}
            dispatch('setFilters', filters)
        },

        setFilters({commit}, payload) {
            let filters = {}
            Object.keys(payload).forEach( key => {
                if (payload[key] != null && payload[key] !== undefined && availableFilters.indexOf(key) > -1){
                    filters[key] = payload[key]
                }
            })
            commit(SET_FILTERS, filters)
        },

        clearFilters({dispatch}){
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
        }

    },
    mutations: {
        [SET_FILTER](state, filter) {
            state.filters = {...state.filters, filter}
        },
        [SET_FILTERS](state, filters) {
            state.filters = {...state.filters,...filters}
        },
    },
    getters: {},
}
