import axios from '@/axios'

export const register = (credentials) => {
    return axios.post('auth/register', credentials)
}

export const login = (credentials) => {
    return axios.post('auth/login', credentials)
}

export const logout = (credentials) => {
    return axios.post('auth/logout', credentials)
}

export const me = () => {
    return axios.post('auth/me')
}

/**
 * Send phone validation sms to user
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const sendVerificationCode = (data) => {
    return axios.post('auth/phoneVerification/create', data)
}

/**
 * Get not expired phone verification
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getActiveVerification = (data) => {
    return axios.get('auth/phoneVerification', data)
}

/**
 * Check sms code
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const checkVerificationCode = (data) => {
    return axios.post('auth/phoneVerification/checkCode', data)
}

export default  {
    register,
    login,
    logout,
    me,
    getActiveVerification,
    sendVerificationCode,
    checkVerificationCode
}
