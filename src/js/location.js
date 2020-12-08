import store from "@/app/store";
import {updateRoute} from "@/js/filter";
import Logger from "@/js/Logger";

export const getGpsPosition = () => {
    return new Promise ((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(resolve);
        } else {
            reject();
        }
    })
};

export const handleNewPosition = async(position) => {
    if (position) {
        const gpsPosition = {
            latitude: position.coords.latitude.toString().substring(0, 10),
            longitude: position.coords.longitude.toString().substring(0, 10),
            timestamp: position.timestamp
        }
        try{
            await store.dispatch('App/setGpsPosition', gpsPosition)
            await store.dispatch('Filters/setFilters', {
                    gps_lat: position.coords.latitude.toString().substring(0, 10),
                    gps_lon: position.coords.longitude.toString().substring(0, 10)
                })
            await updateRoute()
        } catch (e) {
            Logger.log(e)
        }
    }
}
