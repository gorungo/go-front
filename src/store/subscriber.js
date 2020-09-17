import store from './index';
import axios from "@/axios";

store.subscribe((mutation) => {
    switch(mutation.type){
        case 'App/SET_TOKEN' :
            if(mutation.payload){
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + mutation.payload
                localStorage.setItem('token', mutation.payload)
            }else{
                axios.defaults.headers.common['Authorization'] = null
                localStorage.removeItem('token')
            }
            break;

        case 'App/SET_LOCALE' :
            if(mutation.payload){
                axios.defaults.headers.common['HTTP_CONTENT_LANGUAGE'] = mutation.payload
                localStorage.setItem('locale', mutation.payload)
            }
            break;
    }
})
