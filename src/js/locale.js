
    const validLocales = [
        'ru', 'en', 'cn'
    ]

    function getBrowserLocale(options = {}) {
        const defaultOptions = { countryCodeOnly: false }
        const opt = { ...defaultOptions, ...options }
        const navigatorLocale =
            navigator.languages !== undefined
                ? navigator.languages[0]
                : navigator.language
        if (!navigatorLocale) {
            return undefined
        }
        const trimmedLocale = opt.countryCodeOnly
            ? navigatorLocale.trim().split(/-|_/)[0]
            : navigatorLocale.trim()
        return trimmedLocale
    }

    function currentLocale(){
        if(localStorage.getItem('locale')){
            return localStorage.getItem('locale')
        } else {
            const browserLocale = getBrowserLocale({countryCodeOnly: true})
            return validLocales.indexOf(browserLocale) > -1 ? browserLocale : process.env.FALLBACK_LOCALE
        }
    }

    module.exports.currentLocale = currentLocale
    module.exports.getBrowserLocale = getBrowserLocale
    module.exports.validLocales = validLocales

