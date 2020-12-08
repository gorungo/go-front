export const getTimeZoneOffset = function() {
    let d = new Date();
    return -d.getTimezoneOffset() / 60;
};

export const mySqlDateTimeToJsUTC = function (mySqlDate) {

    // Split timestamp into [ Y, M, D, h, m, s ]
    var t = mySqlDate.split(/[- :]/);

    // Apply each element to the Date function
    var d = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));

    return d;
};

export const mySqlDateTimeToJs = function (mySqlDate) {

    // Split timestamp into [ Y, M, D, h, m, s ]
    var t = mySqlDate.split(/[- :]/);

    // Apply each element to the Date function
    var d = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);

    return d;
};

export const mySqlDateToJs = function (mySqlDate) {

    // Split timestamp into [ Y, M, D, h, m, s ]
    //let t = mySqlDate.split(/[-]/);

    // Apply each element to the Date function
    let d = new Date(mySqlDate);

    return d;
};

export const currentDateTimeMySql = function () {
    return new Date().toISOString().slice(0, 19).replace('T', ' ');
};

export const dateFromMySqlDateTime = function (datetime){
    return datetime.slice(0, 10);
};

export const timeFromMySqlDateTime = function (datetime){
    return datetime.slice(11, 18);
};

export const dateTimeMySql = function (date) {
    if(!date) return '';
    return date.toISOString().slice(0, 19).replace('T', ' ');
};

export const localizeMySqlDateTime = function (mySqlDate) {
    let locale = 'ru-RU';
    let date = mySqlDateTimeToJsUTC(mySqlDate);
    return date.toLocaleDateString(locale) + ' ' + date.toLocaleTimeString(locale);
};

export const localizeMySqlTime = function (mySqlDate) {
    let locale = 'ru-RU';
    let date = mySqlDateTimeToJsUTC(mySqlDate);
    return date.toLocaleTimeString(locale).slice(0, 5);
};

export const localizeMySqlDateToLocale = function (mySqlDate, locale) {
    let date = mySqlDateToJs(mySqlDate);
    return date.toLocaleDateString(locale);
};

export const localizeMySqlDate = function (mySqlDate) {
    let locale = 'ru-RU';
    let date = mySqlDateTimeToJsUTC(mySqlDate);
    return date.toLocaleDateString(locale);
};

export const formatDate = (date) => {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

export const getLocation = function() {
    return new Promise ((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(resolve);
        } else {
            reject();
        }
    })
};

export const setLocation = function(location) {
    window.app.$store.dispatch('setUserLocation', location);
};

export const firstToUpperCase = function(lower){
    return lower.replace(/^\w/, c => c.toUpperCase());
};

export const strLimit = function (string, limit) {
    if (string.length > limit) string = string.substring(0, limit) + '...';
    return string;
};


export const fixedEncodeURIComponent = function(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
        return '%' + c.charCodeAt(0).toString(16);
    });
}

/**
 * Plural forms for russian words
 * @param  {Integer} count quantity for word
 * @param  {Array} words Array of words. Example: ['депутат', 'депутата', 'депутатов'], ['коментарий', 'коментария', 'комментариев']
 * @return {String}        Count + plural form for word
 */
export const pluralize = function(count, words) {
    const cases = [2, 0, 1, 1, 1, 2];
    return count + ' ' + words[ (count % 100 > 4 && count % 100 < 20) ? 2 : cases[ Math.min(count % 10, 5)] ];
}

