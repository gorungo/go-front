import store from '../index';

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

        case 'Filters/SET_GPS_POSITION' :
            if(mutation.payload){
                localStorage.setItem('gpsPosition', JSON.stringify(mutation.payload))
            }
            break;
    }
})
