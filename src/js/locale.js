
    export const validLocales = [
        'ru', 'en', 'cn'
    ]

    export const getBrowserLocale = (options = {}) => {
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

    export const currentLocale = () => {
        if(localStorage.getItem('locale')){
            return localStorage.getItem('locale')
        } else {
            const browserLocale = getBrowserLocale({countryCodeOnly: true})
            return validLocales.indexOf(browserLocale) > -1 ? browserLocale : process.env.FALLBACK_LOCALE
        }
    }


