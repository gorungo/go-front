import store from '../index';
//import {setQueryFilters} from "@/js/filter

store.subscribe((mutation) => {
    switch(mutation.type){
        case 'Filters/SET_FILTER' :
            if(mutation.payload){
                //setQueryFilter(mutation.payload)
            }
            break;

        case 'Filters/SET_FILTERS' :
            if(mutation.payload){
                //setQueryFilters(mutation.payload)
            }
            break;
    }
})
