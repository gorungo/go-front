import axios from '@/axios'

/**
 * category resource
 */
export const getCategories = async (options = {}) => {
    const defaultOptions = {
        active: 1
    }
    const opt = { ...defaultOptions, ...options }
    return axios.get('/categories', {params: opt})
}

export default  {
    getCategories,
}
