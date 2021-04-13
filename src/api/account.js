import axios from '@/axios'

/**
 * fetch profile of user
 */
export const fetchUserProfile = (profileId, options = {}) => {
    const defaultOptions = {}
    const opt = { ...defaultOptions, ...options }

    return axios.get(`/profiles/${profileId}`, {params: opt})
}

export const patchProfile = async (profileHid, profile, options = {}) => {
    const defaultOptions = {}
    const opt = { ...defaultOptions, ...options }
    return axios.patch(`/profiles/${profileHid}`, {data:profile}, {
            params: opt,
        } )
}

export const patchUser = async (userHid, user, options = {}) => {
    const defaultOptions = {}
    const opt = { ...defaultOptions, ...options }
    return axios.patch(`/users/${userHid}`, {data:user}, {
        params: opt,
    } )
}

export default  {
    fetchUserProfile,
    patchProfile,
    patchUser,
}
