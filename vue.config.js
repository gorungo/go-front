module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Gorungo - 1000 идей как провести время!'
    }
  },
  pwa: {
    name: 'Gorungo',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // настройки манифеста
    manifestOptions: {
      display: 'landscape',
      background_color: '#42B883',
      icons: [ { 'src': './images/icons/android-chrome-192x192.png', 'sizes': '192x192', 'type': 'image/png' }, { 'src': './images/icons/android-chrome-512x512.png', 'sizes': '512x512', 'type': 'image/png' }, { 'src': './images/icons/android-chrome-maskable-192x192.png', 'sizes': '192x192', 'type': 'image/png', 'purpose': 'maskable' }, { 'src': './images/icons/android-chrome-maskable-512x512.png', 'sizes': '512x512', 'type': 'image/png', 'purpose': 'maskable' } ]
    },

    // настройка workbox-плагина
    workboxPluginMode: 'GenerateSW',
  }
}
