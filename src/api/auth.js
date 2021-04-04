import axios from '@/axios'

export const login = (credentials) => {
    return axios.post('auth/login', credentials)
}

export const logout = (credentials) => {
    return axios.post('auth/logout', credentials)
}

export const me = () => {
    return axios.post('auth/me')
}

export default  {
    login,
    logout,
    me
}
