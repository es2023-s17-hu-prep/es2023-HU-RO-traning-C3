const cacheName = "dine-ease-pwa-oliver";
const filesToCache = [
  "/index.html",
  "/index.css",
  "/RestaurantCard.js",
  "/data/menus.json",
  "/data/restaurants.json",
  "/public/manifest.json",
  "/public/logo192.png",
  "/public/logo512.png",
  "/public/favicon.ico",
  "/sw.js",
  "/public/restaurant.jpg",
];

// Start the service worker and cache all of the app's content
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(filesToCache))
  );
  self.skipWaiting();
});

// Serve cached content when offline
self.addEventListener("fetch", function (e) {
  e.respondWith(
    caches.match(e.request).then((response) => response ?? fetch(e.request))
  );
});
