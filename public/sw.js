// AccentFlow Service Worker: relative paths so it works at any base path (e.g. GitHub Pages /repo/)
const CACHE_NAME = 'accentflow-v2';
const SCOPE = self.registration.scope; // e.g. https://user.github.io/repo/
const STATIC_ASSETS = [
  './',
  'manifest.webmanifest',
  'favicon.svg',
  'audio/steve_jobs_01.mp3',
  'audio/steve_jobs_02.mp3',
  'audio/steve_jobs_03.mp3'
].map((p) => new URL(p, SCOPE).toString());

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all(STATIC_ASSETS.map((u) => cache.add(u).catch(() => {})))
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || !req.url.startsWith(self.location.origin)) return;
  // Range requests (audio seeking) are passed straight through
  if (req.headers.has('range')) return;

  // Pages: network first so new deploys are picked up, cache as offline fallback
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(new URL('./', SCOPE).toString(), copy));
          return res;
        })
        .catch(() => caches.match(new URL('./', SCOPE).toString()))
    );
    return;
  }

  // Everything else (hashed JS/CSS, audio): cache first, fill cache on first fetch
  event.respondWith(
    caches.match(req).then(
      (cached) =>
        cached ||
        fetch(req).then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((c) => c.put(req, copy));
          }
          return res;
        })
    )
  );
});
