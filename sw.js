const CACHE_NAME = "kios-dubbing-v1";

const urlsToCache = [
"/",
"/offline.html"
];

self.addEventListener("install", event => {
event.waitUntil(
caches.open(CACHE_NAME)
.then(cache => cache.addAll(urlsToCache))
);
});

self.addEventListener("activate", event => {
event.waitUntil(
caches.keys().then(keys=>{
return Promise.all(
keys.filter(key=>key!==CACHE_NAME)
.map(key=>caches.delete(key))
);
})
);
});

self.addEventListener("fetch", event => {
event.respondWith(
fetch(event.request)
.catch(()=>{
return caches.match(event.request)
.then(response=>{
return response || caches.match("/offline.html");
});
})
);
});
