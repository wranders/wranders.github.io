// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const sw = self as ServiceWorkerGlobalScope & typeof globalThis;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const CACHEKEY = 'www.doubleu.codes-v1';

sw.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(async () => {
    if (sw.registration.navigationPreload) {
      await sw.registration.navigationPreload.enable();
    }
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHEKEY) {
            return caches.delete(key);
          }
        }),
      );
    });
  });
});

sw.addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(
    caches.open(CACHEKEY).then((cache) => {
      return cache.match(event.request.url).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;
        return fetch(event.request).then((fetchedResponse) => {
          cache.put(event.request, fetchedResponse.clone());
          return fetchedResponse;
        });
      });
    }),
  );
});

sw.addEventListener('install', () => {
  // This variable is substituted in the build process.
  // All index files and assets in the 'static' directory are cached.
  const resources = [`${1}`];
  caches.open(CACHEKEY).then((cache) => {
    cache.addAll(resources);
  });
});
