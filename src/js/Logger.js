export default {
    log, error
}
function log (data){
    if (process.env.NODE_ENV === 'development') {
        console.log(data);
    }
}

function error (data){
    if (process.env.NODE_ENV === 'development') {
        console.log(data);
    }
}
