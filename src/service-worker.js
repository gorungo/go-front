/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 */

if (workbox) {
  workbox.core.setCacheNameDetails({prefix: "gorungo"})
  workbox.precaching.precacheAndRoute(self.__precacheManifest, {

  })
}

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// staticCacheName = 'gorungo-static-cache'
// dynamicCacheName = 'gorungo-api-cache'


// self.addEventListener('install', async event => {
//   console.log(self.__precacheManifest)
//   const cache = await caches.open(staticCacheName)
//   await cache.addAll(self.__precacheManifest.map(i => i.url))
// })
//
// self.addEventListener('activate', async event => {
//   const cachesNames = await caches.keys()
//   await Promise.all(
//     cachesNames
//       .filter(name => name !== staticCacheName)
//       .filter(name => name !== dynamicCacheName)
//       .map(name => caches.delete(name))
//   )
// })
//
// self.addEventListener('fetch', event => {
//   const {request} = event
//   const url = new URL(request.url)
//   if(url.origin === location.origin){
//     event.respondWith(cacheFirst(request))
//   }else{
//     event.respondWith(networkFirst(request))
//   }
// })
//
// async function cacheFirst(request){
//   const cached = await caches.match(request)
//   return cached ?? await fetch(request)
// }
//
// async function networkFirst(request){
//   const cache = await caches.open(dynamicCacheName)
//
//   try {
//     const response = await fetch(request)
//     await cache.put(request, response.clone())
//     return response
//
//   } catch (e) {
//     const cached = cache.match(request)
//
//     if(!cached){
//       document.dispatchEvent(new CustomEvent('appOffline'))
//       console.log('Offline')
//       return
//     }
//     return cached
//
//   }
// }


