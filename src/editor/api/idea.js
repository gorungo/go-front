import axios from '@/axios'

/**
 * idea client server processing
 */
const getIdea = (ideaHid, options = {}) => {
    const defaultOptions = {
        include: 'ideaDates,ideaPrice,ideaItineraries,photos',
    }
    const opt = { ...defaultOptions, ...options }

    return new Promise ((resolve, reject) => {
        axios.get(`/ideas/${ideaHid}`, {
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
const getIdeas = (options = {}) => {
    const defaultOptions = {
        page: 1,
        limit: 40,
        filters: {},
        sort: 'default',
        sortDirection: 'default',
        include: 'price,author'
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
    getIdea,
    getIdeas
}