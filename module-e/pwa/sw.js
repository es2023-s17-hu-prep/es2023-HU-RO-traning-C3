// Use a cacheName for cache versioning
var cacheName = "v1:static";

// During the installation phase, you'll usually want to cache static assets.
self.addEventListener("install", function (e) {
  // Once the service worker is installed, go ahead and fetch the resources to make this work offline.
  console.log("YO");
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache
        .addAll([
          "./",
          "./index.html",
          "./index.js",
          "./logo.png",
          "./manifest.json",
          "./icons/icon-192x192.png",
          "./icons/icon-256x256.png",
          "./icons/icon-384x384.png",
          "./icons/icon-512x512.png",
        ])
        .then(function () {
          self.skipWaiting();
        });
    })
  );
});

// when the browser fetches a URL…
self.addEventListener("fetch", function (event) {
  // … either respond with the cached object or go ahead and fetch the actual URL
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        // retrieve from cache
        return response;
      }
      // fetch as normal
      return fetch(event.request);
    })
  );
});
