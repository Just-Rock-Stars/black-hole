const cacheName = 'black-hole-v1';

self.addEventListener('fetch', (event) => {
  event.respondWith(
    (async () => {
      try {
        const response = await fetch(event.request);
        if (response.status === 200) {
          const cache = await caches.open(cacheName);
          cache.put(event.request, response.clone());
        }
        return response;
      } catch {
        const responseFromCache = await caches.match(event.request);
        if (responseFromCache !== undefined) {
          return responseFromCache;
        }
        throw new Error('Network request failed.');
      }
    })()
  );
});
