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

    },

    iconPath: {
      favicon32: 'images/icons/favicon-32x32.png',
      favicon16: 'images/icons/favicon-16x16.png',
      appleTouchIcon: 'images/icons/apple-touch-icon-152x152.png',
      maskIcon: 'images/icons/safari-pinned-tab.svg',
      msTileImage: 'images/icons/msapplication-icon-144x144.png'
    },

    // настройка workbox-плагина
    workboxPluginMode: 'GenerateSW',
    manifestPath: '/js/manifest.json'
  }
}
