export const getLocation = () => {
    return new Promise ((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(resolve);
        } else {
            reject();
        }
    })
};
