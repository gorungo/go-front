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
    themeColor: '#ff3333',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // настройки манифеста
    manifestOptions: {
      display: 'standalone',
      background_color: '#ff3333'
    },

    // настройка workbox-плагина
    workboxPluginMode: 'GenerateSW',
    manifestPath: 'pwa/manifest.json'
  },
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://goback.localhost',
      },
      '^/editor': {
        target: 'http://localhost:8081'
      }
    }
  }
}
