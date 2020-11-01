import axios from '@/axios'

/**
 * idea client server processing
 */
const getPlace = (placeHid, options = {}) => {
    const defaultOptions = {
        include: 'photos',
    }
    const opt = { ...defaultOptions, ...options }

    return new Promise ((resolve, reject) => {
        axios.get(`/places/${placeHid}`, {
            params: opt
        }).then(resp => {
            resolve(resp)
        }).catch(e => {
            reject(e)
        });
    });
}

/**
 * idea client server processing
 */
const getPlaces = (options = {}) => {
    const defaultOptions = {
        page: 1,
        limit: 40,
        filters: {},
        sort: 'default',
        sortDirection: 'default',
        include: 'photos'
    }
    const opt = { ...defaultOptions, ...options }

    return new Promise ((resolve, reject) => {
        axios.get('/ideas', {
            params: opt
        }).then(resp => {
            resolve(resp)
        }).catch(e => {
            reject(e)
        });
    });
}
export default  {
    getPlace,
    getPlaces
}
