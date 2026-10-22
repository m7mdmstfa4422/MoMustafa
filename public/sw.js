// Self-destroying service worker to eliminate mobile cache poisoning
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) => {
      return Promise.all(names.map((name) => caches.delete(name)));
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Do not intercept or block any network requests
self.addEventListener('fetch', () => {
  return;
});
