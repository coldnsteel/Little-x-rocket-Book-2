const CACHE_NAME = 'little-x-dino-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/outline.md'
];

self.addEventListener('install', event => {
    console.log('🦕 Dino Dream SW installing...');
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => response || fetch(event.request))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => Promise.all(
            cacheNames.map(name => name !== CACHE_NAME && caches.delete(name))
        ))
    );
});
