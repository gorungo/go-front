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
        'HTTP_CONTENT_LANGUAGE': currentLocale(),
    }
})
ax.defaults.headers.common['HTTP_CONTENT_LANGUAGE'] = currentLocale();

export default ax;