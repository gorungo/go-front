import router from '../router'

export const availableFilters = [
    'query',
    'place_id',
    'checkin',
    'checkout',
    'time_of_day',
    'adults',
    'children',
    'price_min',
    'price_max',
    'languages',
    'gps_lat',
    'gps_lon',
]

export const getQueryFilter = (filter) => {
    return router.currentRoute.query[filter] ? router.currentRoute.query[filter] : null
}

export const getQueryFilters = () => {
    return router.currentRoute.query
}

export const setQueryFilters = async (filters) => {
    if(JSON.stringify(router.currentRoute.query) !== JSON.stringify(filters)){
        return router.push({
            query:filters
        })
    }
}

export const goRoute = async (params) => {
    if(params && router.currentRoute){
        if(params.name !== router.currentRoute.name){
            return router.push(params)
        }
        if(params.query && JSON.stringify(router.currentRoute.query) !== JSON.stringify(params.query)){
            return router.push(params)
        }
    }
}

export const updateRoute = async (params) => {
    if(params && router.currentRoute) {
        if (params.name !== router.currentRoute.name) {
            return router.replace(params)
        }
        if (params.query && JSON.stringify(router.currentRoute.query) !== JSON.stringify(params.query)) {
            return router.replace(params)
        }
    }
}

export const setQueryFilter = async (filter) => {
    return setQueryFilters({...router.currentRoute.query, ...filter})
}
