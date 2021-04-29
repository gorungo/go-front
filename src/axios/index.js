import axios from 'axios'
import {currentLocale} from "@/js/locale";

const baseURL = process.env.VUE_APP_API_ENDPOINT;
let ax = axios.create({
    baseURL,
    timeout: 5000,
    responseType: "json",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': process.env.VUE_APP_ACCESS_CONTROL_ALLOW_ORIGIN
    },
    params: {
        'locale': currentLocale(),
    }
})

export default ax;
