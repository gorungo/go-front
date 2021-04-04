import axios from '@/axios'

/**
 * fetch profile of user
 */
export const fetchProfile = (profileId, options = {}) => {
    const defaultOptions = {}
    const opt = { ...defaultOptions, ...options }

    return axios.get(`/profiles/${profileId}`, {params: opt})
}

export default  {
    fetchProfile,
}
