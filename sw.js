// Prism PWA service worker — v1.7.1 stability fix
// Installation must not fail just because an optional asset is missing.
const CACHE_NAME = 'prism-v1.7.1';
const APP_ROOT = '/';

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    try {
      const response = await fetch(APP_ROOT, { cache: 'reload' });
      if (response.ok) {
        await cache.put(APP_ROOT, response.clone());
        await cache.put('/index.html', response.clone());
      }
    } catch (_) {
      // Do not fail installation if the network is temporarily unavailable.
    }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames
      .filter(name =>
        name !== CACHE_NAME &&
        (name.startsWith('gobogames-') || name.startsWith('prism-'))
      )
      .map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Navigation: prefer fresh deployed HTML; use the cached shell only offline.
  if (request.mode === 'navigate' ||
      url.pathname === '/' ||
      url.pathname.endsWith('/index.html')) {
    event.respondWith((async () => {
      try {
        const response = await fetch(request, { cache: 'no-store' });
        if (response.ok) {
          const cache = await caches.open(CACHE_NAME);
          await cache.put(APP_ROOT, response.clone());
          await cache.put('/index.html', response.clone());
        }
        return response;
      } catch (_) {
        return (await caches.match(request)) ||
          (await caches.match(APP_ROOT)) ||
          (await caches.match('/index.html')) ||
          Response.error();
      }
    })());
    return;
  }

  // Cache successful same-origin responses only, never error pages.
  event.respondWith((async () => {
    try {
      const response = await fetch(request, { cache: 'no-store' });
      if (response.ok) {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, response.clone());
      }
      return response;
    } catch (_) {
      return (await caches.match(request)) || Response.error();
    }
  })());
});
