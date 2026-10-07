/**
 * EduTrack PWA - Service Worker
 * Strategy: Cache First for static assets, Network First for dynamic content
 */

const CACHE_NAME = 'edutrack-v1.0.0';
const STATIC_CACHE = 'edutrack-static-v1';
const DYNAMIC_CACHE = 'edutrack-dynamic-v1';

// Files to cache immediately on install (App Shell)
const APP_SHELL = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// =========================================================
// INSTALL — Cache App Shell
// =========================================================
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker...');
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log('[SW] Precaching App Shell');
      return cache.addAll(APP_SHELL);
    }).then(() => self.skipWaiting())
  );
});

// =========================================================
// ACTIVATE — Clean up old caches
// =========================================================
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker...');
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== STATIC_CACHE && key !== DYNAMIC_CACHE)
          .map((key) => {
            console.log('[SW] Deleting old cache:', key);
            return caches.delete(key);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// =========================================================
// FETCH — Serve from cache, fallback to network
// =========================================================
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and chrome-extension requests
  if (request.method !== 'GET' || url.protocol === 'chrome-extension:') return;

  // Skip cross-origin requests (e.g. external images)
  if (url.origin !== location.origin) return;

  // Cache-first strategy for static assets (CSS, JS, icons, fonts)
  if (
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'image' ||
    request.destination === 'font' ||
    url.pathname.startsWith('/icons/')
  ) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Network-first with cache fallback for HTML navigation
  event.respondWith(networkFirstWithFallback(request));
});

// =========================================================
// CACHE STRATEGIES
// =========================================================

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const network = await fetch(request);
    if (network.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, network.clone());
    }
    return network;
  } catch (err) {
    console.warn('[SW] Cache-first fetch failed:', err);
    return new Response('Offline - resource unavailable', { status: 503 });
  }
}

async function networkFirstWithFallback(request) {
  try {
    const network = await fetch(request);
    if (network.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, network.clone());
    }
    return network;
  } catch (err) {
    console.warn('[SW] Network failed, serving from cache:', err);
    const cached = await caches.match(request);
    if (cached) return cached;

    // Ultimate fallback — serve index.html for navigation
    const fallback = await caches.match('/index.html');
    if (fallback) return fallback;

    return new Response(
      `<!DOCTYPE html>
      <html><head><title>EduTrack - Offline</title>
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <style>
        body { font-family: system-ui, sans-serif; display: flex; flex-direction: column;
               align-items: center; justify-content: center; min-height: 100vh;
               margin: 0; background: #f8fafc; color: #0f172a; text-align: center; padding: 20px; }
        .icon { font-size: 4rem; margin-bottom: 16px; }
        h1 { font-size: 1.5rem; font-weight: 800; margin: 0 0 8px 0; }
        p { color: #64748b; max-width: 300px; }
        button { margin-top: 20px; padding: 12px 24px; background: #4f46e5;
                 color: white; border: none; border-radius: 12px; font-size: 1rem;
                 font-weight: 700; cursor: pointer; }
      </style></head>
      <body>
        <div class="icon">📡</div>
        <h1>You're Offline</h1>
        <p>EduTrack couldn't connect. Check your internet connection and try again.</p>
        <button onclick="location.reload()">Try Again</button>
      </body></html>`,
      { status: 503, headers: { 'Content-Type': 'text/html' } }
    );
  }
}

// =========================================================
// BACKGROUND SYNC — Queue offline actions
// =========================================================
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-data') {
    console.log('[SW] Background sync triggered');
    // Future: sync pending profile changes or course enrollments
  }
});

// =========================================================
// PUSH NOTIFICATIONS (Future-ready)
// =========================================================
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'EduTrack Notification';
  const options = {
    body: data.body || 'You have a new update.',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: { url: data.url || '/' }
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  );
});

console.log('[SW] EduTrack Service Worker loaded ✓');
