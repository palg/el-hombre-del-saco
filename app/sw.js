/**
 * Service Worker - El Hombre del Saco
 * Permite ejecutar la aplicación 100% offline y serverless
 */

const CACHE_NAME = 'hds-cache-v6';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './css/styles.css',
  './js/app.js',
  './js/sound.js',
  './js/state.js',
  './js/ui.js',
  './icons/icon.svg',
  './data/manual.json',
  './data/manual.js',
  './data/narraciones.json',
  './data/narraciones.js',
  './data/localizaciones.json',
  './data/localizaciones.js',
  './data/pistas.json',
  './data/pistas.js',
  './data/consecuencias.json',
  './data/consecuencias.js',
  './data/personajes.json',
  './data/personajes.js',
  './data/coraje.json',
  './data/coraje.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      }).catch(() => {
        // En caso de estar offline y no tener cache, fallback a index.html
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
