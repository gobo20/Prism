// Prism PWA service worker — v1.7.1 cache/update fix
const CACHE = 'gobogames-v23';
const CORE_ASSETS = ['/', '/index.html'];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await Promise.all(CORE_ASSETS.map(async asset => {
      try {
        const response = await fetch(asset, { cache: 'no-store' });
        if (response.ok) await cache.put(asset, response);
      } catch (_) {
        // Installation can continue; the app may be offline.
      }
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Always prefer fresh HTML. Use the cached copy only when offline.
  if (request.mode === 'navigate' || url.pathname === '/' || url.pathname.endsWith('/index.html')) {
    event.respondWith((async () => {
      try {
        const response = await fetch(request, { cache: 'no-store' });
        if (response && response.ok) {
          const cache = await caches.open(CACHE);
          await cache.put('/', response.clone());
          await cache.put('/index.html', response.clone());
        }
        return response;
      } catch (_) {
        return (await caches.match(request)) || (await caches.match('/index.html')) || (await caches.match('/')) || Response.error();
      }
    })());
    return;
  }

  // Network-first for assets, with an offline fallback.
  event.respondWith((async () => {
    try {
      const response = await fetch(request, { cache: 'no-store' });
      if (response && response.ok) {
        const cache = await caches.open(CACHE);
        await cache.put(request, response.clone());
      }
      return response;
    } catch (_) {
      return (await caches.match(request)) || Response.error();
    }
  })());
});
