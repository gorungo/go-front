import axios from '@/axios'
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
    getIdeas
}