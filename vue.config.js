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
      background_color: '#fff',
      icons: [
        {"src":"../images/icons/favicon-32x32.png","sizes":"32x32","type":"image/png"},
        {"src":"../images/icons/favicon-16x16.png","sizes":"16x16","type":"image/png"},
        {"src":"../images/icons/android-chrome-192x192.png","sizes":"192x192","type":"image/png"},
        {"src":"../images/icons/android-chrome-512x512.png","sizes":"512x512","type":"image/png"},
        {"src":"../images/icons/android-chrome-maskable-192x192.png","sizes":"192x192","type":"image/png","purpose":"maskable"},
        {"src":"../images/icons/android-chrome-maskable-512x512.png","sizes":"512x512","type":"image/png","purpose":"maskable"}
      ],
    },

    // настройка workbox-плагина
    workboxPluginMode: 'InjectManifest',
    swSrc: 'src/service-worker.js',
    workboxOptions: {
      swSrc: 'src/service-worker.js',
    },
    manifestPath: 'pwa/manifest.json',
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
