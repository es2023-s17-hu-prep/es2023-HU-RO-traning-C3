const CACHE_NAME = 'dineease';


/**
 * Fetch response from network and store it in the cache
 * @param request
 * @returns {Promise<Response<any, Record<string, any>, number>>}
 */
async function fromNetwork(request){
    const result = await fetch(request);
    const cache = await caches.open(CACHE_NAME)
    await cache.put(request, result.clone());
    return result;
}

/**
 * Read response form cache
 * @param request
 * @returns {Promise<Response | undefined>}
 */
async function fromCache(request){
    const cache = await caches.open(CACHE_NAME)
    return cache.match(request);
}

/**
 * Add custom caching to fetch request
 */
self.addEventListener('fetch', (e) => {
    console.log(e)
    return e.respondWith(fromNetwork(e.request).catch(() => fromCache(e.request)))
});

let offers = [];

/**
 * Check for new offers
 */
setInterval(() => {
    (async () => {
        const response = await fetch('/offers');
        const data = await response.json();

        const newOffers = data.filter(o => !offers.includes(o));
        newOffers.forEach(offer => self.registration.showNotification(offer.offer));

        offers = data.map(o => o.id);
    })();
}, 30_000);