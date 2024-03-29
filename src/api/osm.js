import axios from '@/axios'
import {currentLocale} from "@/js/locale";

/**
 * Find place by q string in Open Street Map
 */
export const search = (q, options = {}) => {
    const format = 'json'
    const baseURL = process.env.VUE_APP_API_ENDPOINT
    //const baseURL = process.env.VUE_APP_OPEN_STREET_MAP_API_ENDPOINT

    const defaultOptions = {
        q, format, 'accept-language' : currentLocale(),
    }
    const params = { ...defaultOptions, ...options }

    return new Promise ((resolve, reject) => {
        axios({
            url: 'osm/search',
            method: 'get',
            baseURL,
            params
        }).then(resp => {
            resolve(resp)
        }).catch(e => {
            reject(e)
        });
    });
}

export const savePlace = async(osmPlace) => {
    return axios({
        url: 'osm/saveSelected',
        method: 'post',
        data: {
            ...osmPlace
        }
    });
}

export const getPlace = async(place_id) => {
    return axios.get(`osm/${place_id}`);
}

export const getPlacesByTitle = async(title) => {
    return axios.get(`osm`, {
        params: {title}
    });
}

export const getPopularPlaces = async() => {
    return axios.get(`osm/popular`);
}



