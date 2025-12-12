const CACHE_NAME = "watn-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/services.html",
  "/notifications.html",
  "/profile.html",
  "/login.html",
  "/appointment.html",
  "/editAppointment.html",
  "/js/appointment.js",
  "/js/notifications.js",
  "/js/navbar.js",
  "/js/theme.js"
];

// تثبيت Cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// جلب الملفات من الكاش عند عدم وجود إنترنت
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});
