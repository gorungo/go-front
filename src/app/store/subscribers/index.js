import store from '../index'
import axios from "@/axios"

require('./filter')

store.subscribe((mutation) => {
    switch(mutation.type){
        case 'Auth/SET_TOKEN' :
            if(mutation.payload){
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + mutation.payload
                localStorage.setItem('token', mutation.payload)
            }else{
                axios.defaults.headers.common['Authorization'] = null
                localStorage.removeItem('token')
            }
            break;

            // when setting app locale
        case 'App/SET_LOCALE' :
            if(mutation.payload){
                axios.defaults.params['locale'] = mutation.payload
                localStorage.setItem('locale', mutation.payload)
                document.documentElement.lang = mutation.payload
            }
            break;
    }
})
