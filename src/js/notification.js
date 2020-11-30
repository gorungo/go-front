export const showNotify = (options = {}) => {
    const defaultOptions = {
        title: window.App.$t('text.notification'),
        message: '',
        position: 'bottom-right',
        type: 'info'
    }
    const opt = { ...defaultOptions, ...options }
    window.App.$notify(opt);
}
