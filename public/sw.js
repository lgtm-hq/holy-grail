/**
 * Holy Grail Service Worker
 *
 * Provides offline support and caching for the documentation site.
 *
 * NOTE: BASE_URL is hardcoded because service workers cannot use import.meta.env.
 * If deploying to a different base path, update BASE_URL here or generate this
 * file at build time with the correct value.
 */

const CACHE_NAME = 'holy-grail-v1';
const BASE_URL = '/holy-grail';
const OFFLINE_URL = `${BASE_URL}/offline.html`;

// URLs to precache on install
const PRECACHE_URLS = [
  `${BASE_URL}/`,
  `${BASE_URL}/guides/`,
  `${BASE_URL}/categories/`,
  OFFLINE_URL,
];

// Install event - precache essential files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

// Fetch event - network first, fallback to cache, then offline page
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // Skip non-same-origin requests
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  // Handle navigation requests
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cache successful navigation responses
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Try cache first, then offline page
          return caches.match(event.request).then((cached) => {
            return cached || caches.match(OFFLINE_URL);
          });
        })
    );
    return;
  }

  // Handle other requests (assets, etc.)
  event.respondWith(
    caches.match(event.request).then((cached) => {
      // Return cached version immediately if available
      if (cached) {
        // Fetch and update cache in background
        fetch(event.request).then((response) => {
          if (response.ok) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, response);
            });
          }
        }).catch(() => {
          // Ignore background fetch errors - we already have cached version
        });
        return cached;
      }

      // Otherwise fetch from network
      return fetch(event.request).then((response) => {
        // Cache successful responses
        if (response.ok && response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      }).catch(() => {
        // For failed asset requests, try cache again or return offline page for HTML
        return caches.match(event.request).then((cached) => {
          if (cached) return cached;
          // For HTML requests, fall back to offline page
          if (event.request.headers.get('Accept')?.includes('text/html')) {
            return caches.match(OFFLINE_URL);
          }
          // For other assets, return a simple error response
          return new Response('Network error', { status: 503, statusText: 'Service Unavailable' });
        });
      });
    })
  );
});
