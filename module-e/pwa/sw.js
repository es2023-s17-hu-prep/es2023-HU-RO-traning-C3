const cacheName = "dine-ease-pwa";
const filesToCache = [
  "/index.html",
  "/sw.js",
  "/RestaurantCard.js",
  "/data/menus.json",
  "/data/restaurants.json",
  "/public/favicon.ico",
  "/public/logo192.png",
  "/public/logo512.png",
  "/public/manifest.json",
  "/public/restaurant.jpg",
];

/**
 * cache the resources
 */
const addResourcesToCache = async (resources) => {
  const cache = await caches.open(cacheName);
  await cache.addAll(resources);
};

self.addEventListener("install", (event) => {
  event.waitUntil(addResourcesToCache(filesToCache));
});

/**
 * cache the fetch results
 */
const cacheFirst = async (request) => {
  const responseFromCache = await caches.match(request);
  return responseFromCache ?? fetch(request);
};

self.addEventListener("fetch", (event) => {
  event.respondWith(cacheFirst(event.request));
});
