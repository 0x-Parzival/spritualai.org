const CACHE_NAME = 'spiritual-ai-v2'; // Bumped version

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
    const url = new URL(event.request.url);

    // 1. Skip cross-origin requests immediately
    if (!event.request.url.startsWith(self.location.origin)) {
        return;
    }

    // 2. Network-only for resume to ensure latest version is always seen
    if (url.pathname === '/resume') {
        return;
    }

    // 3. Handle same-origin requests with Network First, Fallback to Cache
    event.respondWith(
        fetch(event.request)
            .catch(() => {
                return caches.match(event.request);
            })
            .then((response) => {
                if (response) {
                    return response;
                }
                return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
            })
    );
});
