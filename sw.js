// ========================================
// SERVICE WORKER FOR ULTRA-FAST PAGE LOADING
// ========================================

const CACHE_NAME = 'portfolio-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/about.html',
    '/experience.html',
    '/blog.html',
    '/projects.html',
    '/contact.html',
    '/styles.css',
    '/config.js',
    '/app.js'
];

// Install event - cache all assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Caching assets');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('Service Worker: Clearing old cache');
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event - serve from cache, fall back to network
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') return;
    
    // Skip external requests
    if (!event.request.url.startsWith(self.location.origin)) return;
    
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return cached version or fetch from network
                return response || fetch(event.request)
                    .then((fetchResponse) => {
                        // Cache new resources (HTML, CSS, JS only)
                        if (event.request.url.match(/\.(html|css|js)$/)) {
                            return caches.open(CACHE_NAME)
                                .then((cache) => {
                                    cache.put(event.request, fetchResponse.clone());
                                    return fetchResponse;
                                });
                        }
                        return fetchResponse;
                    });
            })
            .catch(() => {
                // Return offline page if available
                if (event.request.mode === 'navigate') {
                    return caches.match('/index.html');
                }
            })
    );
});
