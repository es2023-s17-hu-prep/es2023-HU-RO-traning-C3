const cacheName = "dine-ease-pwa";
const filesToCache = [
  "/index.html",
  "/sw.js",
  "/RestaurantCard.js",
  "/assets/favicon.ico",
  "/assets/logo192.png",
  "/assets/logo512.png",
  "/assets/manifest.json",
  "/assets/restaurant.jpg",
  "http://localhost/restaurants",
  "http://localhost/menus/1",
  "http://localhost/menus/2",
  "http://localhost/menus/3",
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
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.open(cacheName).then(async (cache) => {
      const response = await cache.match(event.request);
      return (
        response ??
        fetch(event.request).then((res) => {
          cache.put(event.request, res.clone());
          return res;
        })
      );
    })
  );
});
