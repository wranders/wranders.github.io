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
    (async (): Promise<Response> => {
      const cachedResponse = await caches.match(event.request);
      if (cachedResponse) {
        return cachedResponse;
      }

      const preloadResponse = await event.preloadResponse;
      if (preloadResponse) {
        (await caches.open(CACHEKEY)).put(
          event.request,
          preloadResponse.clone(),
        );
        return preloadResponse;
      }

      try {
        const networkResp = await fetch(event.request);
        (await caches.open(CACHEKEY)).put(event.request, networkResp.clone());
      } catch (error) {
        return new Response('Network error occured', {
          status: 408,
          headers: { 'Content-Type': 'text/plain' },
        });
      }
    })(),
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
