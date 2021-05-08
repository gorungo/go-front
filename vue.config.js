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
      background_color: '#42B883'
      // ...другие настройки манифеста...
    },

    // настройка workbox-плагина
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc необходимо в режиме InjectManifest
      swSrc: 'dev/sw.js',
      // ...другие настройки Workbox...
    }
  }
}
