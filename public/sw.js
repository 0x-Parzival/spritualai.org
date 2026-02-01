const CACHE_NAME = 'spiritual-ai-v1';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    // 1. Skip cross-origin requests immediately (let browser handle them naturally)
    // This solves CORS errors being intercepted and failing opaquely
    if (!event.request.url.startsWith(self.location.origin)) {
        return;
    }

    // 2. Handle same-origin requests with Network First, Fallback to Cache
    event.respondWith(
        fetch(event.request)
            .catch(() => {
                return caches.match(event.request);
            })
            .then((response) => {
                // If we have a response (network or cache), return it
                if (response) {
                    return response;
                }
                // FAILSAFE: respondWith MUST return a Response object.
                // If network failed AND cache missed, return a generic error or nothing (404).
                // Returning undefined here would crash the Service Worker.
                return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
            })
    );
});
