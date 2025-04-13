self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("devboard-cache").then((cache) =>
      cache.addAll([
        "/",
        "/index.html",
        "/css/style.css",
        "/css/nav_style.css",
        "/css/footer_style.css",
        "/js/script.js",
        "/js//no_change.js",
        "/js/force_refresh.js",
        "json//manifest.json",
        "/json/devboard_small.png",
        "/json/devboard_large.png"
        // Add other assets here
      ])
    )
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
