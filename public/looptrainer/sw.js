// Fixed cache name: fetches are network first, so the cache only needs to hold the latest copy.
// Older caches of this app (e.g. "looptrainer-<build>") are removed on activate.
const PREFIX = "looptrainer-";
const CACHE = PREFIX + "cache";
const CORE = ["./", "index.html", "ja/", "manifest.json", "THIRD_PARTY_LICENSES.md"];
// The audio library comes from a CDN with a pinned version, so the URL's content never changes:
// it is cached on first use and served from the cache, which makes the app work offline.
const CDN = ["https://cdn.jsdelivr.net/npm/soundtouchjs@0.3.0/dist/soundtouch.js"];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      Promise.all(
        CORE.map((url) =>
          fetch(new Request(url, { cache: "reload" }))
            .then((res) => res.ok && cache.put(url, res))
            .catch(() => {})
        )
      )
    )
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      // Only touch this app's caches (other apps on the same origin share Cache Storage)
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith(PREFIX) && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  // Pinned CDN files: cache first
  if (CDN.includes(req.url)) {
    event.respondWith(
      caches.match(req.url).then(
        (hit) =>
          hit ||
          fetch(req).then((res) => {
            if (res.ok) {
              const copy = res.clone();
              caches.open(CACHE).then((c) => c.put(req.url, copy));
            }
            return res;
          })
      )
    );
    return;
  }
  if (new URL(req.url).origin !== self.location.origin) return;
  // Network first (always the latest when online), cache as offline fallback.
  event.respondWith(
    fetch(new Request(req.url, { cache: "no-cache" }))
      .then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      })
      .catch(() =>
        caches.match(req, { ignoreSearch: true }).then((r) => r || (req.mode === "navigate" ? caches.match("index.html") : undefined))
      )
  );
});
