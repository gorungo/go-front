import axios from 'axios'
import {currentLocale} from "@/js/locale";

const baseURL = process.env.VUE_APP_API_ENDPOINT;
let ax = axios.create({
    baseURL,
    timeout: 10000,
    responseType: "json",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': process.env.VUE_APP_ACCESS_CONTROL_ALLOW_ORIGIN,
    },
    params: {
        'locale': currentLocale(),
    }
})
//
// ax.interceptors.request.use((config) => {
//     config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
//     return config
// })

ax.interceptors.response.use(
  response => {
      return response;
  },error => {
      return Promise.reject(error.response);
  })



export default ax;
