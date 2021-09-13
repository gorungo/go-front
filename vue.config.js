module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Gorungo - 1000 идей как провести время!'
    }
  },
  pwa: {
    name: 'Gorungo',
    start_url: '.',
    themeColor: '#fff',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // настройки манифеста
    manifestOptions: {
      display: 'standalone',
      background_color: '#fff'
    },

    // настройка workbox-плагина
    workboxPluginMode: 'InjectManifest',
    swSrc: 'service-worker.js',
    manifestPath: 'pwa/manifest.json',

    iconPaths: {
      faviconSVG: 'images/icons/favicon.svg',
      favicon32: 'images/icons/favicon-32x32.png',
      favicon16: 'images/icons/favicon-16x16.png',
      appleTouchIcon: 'images/icons/apple-touch-icon-152x152.png',
      maskIcon: 'images/icons/safari-pinned-tab.svg',
      msTileImage: 'images/icons/msapplication-icon-144x144.png'
    }
  },
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://goback.localhost',
      },
      '^/editor': {
        target: 'http://localhost:8081'
      },
      '^/dashboard': {
        target: 'http://localhost:8082'
      }
    }
  }
}
