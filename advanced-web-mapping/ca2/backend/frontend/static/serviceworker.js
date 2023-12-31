// service-worker.js

// Cache name
const CACHE_NAME = 'v1_cache_blah_today';

// Files to cache
const urlsToCache = [
  '/',
  '/static/css/App.css',

  // main 
  '/static/frontend/main.js',
  '/static/main.js',

// images
  '/static/images/bio.png',
  '/static/images/bird-outline.svg',
  '/static/images/bird-watch.jpg',
  '/static/images/bird.png',
  '/static/images/bird2.svg',
  '/static/images/bird3.png',
  '/static/images/bird1.png',
  '/static/images/bird160.png',
  '/static/images/claw-tab.svg',
  '/static/images/curlew.jpg',
  '/static/images/kingfisher.png',
  '/static/images/legendBlue.svg',
  '/static/images/legendOrange.svg',
  '/static/images/location.png',
  '/static/images/Logo.svg',
  '/static/images/Logout.svg',
  '/static/images/map-icon.svg',
  '/static/images/map.svg',
  '/static/images/pine-marten.jpg',
  '/static/images/puffins.jpg',
  '/static/images/robin.png',

  // fonts
  '/static/fonts/Sarpanch-Black.tiff',
  '/static/fonts/Sarpanch-Medium.tiff',
  '/static/fonts/Sarpanch-ExtraBold.tiff',
  '/static/fonts/Sarpanch-Bold.tiff',
  '/static/fonts/Sarpanch-Regular.tiff',
  '/static/fonts/Sarpanch-SemiBold.tiff',


  // Add other URLs and resources as needed
];

// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('/static/service-worker.js').then(function(registration) {
//       console.log('Service Worker registered with scope:', registration.scope);
//     }).catch(function(error) {
//       console.log('Service Worker registration failed:', error);
//     });
//   }

// Installing Service Worker
self.addEventListener('install', (event) => {
  // Inside the 'install' event in your service-worker.js
event.waitUntil(
  caches.open(CACHE_NAME).then((cache) => {
    return Promise.all(
      urlsToCache.map((url) => {
        return cache.add(url).catch((error) => {
          console.error(`Caching failed for resource '${url}':`, error.message);
        });
      })
    );
  })
);

  });

  self.addEventListener('fetch', (event) => {
    console.log('Attempting to fetch:', event.request.url); // Log the request URL

    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                var fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(
                    (response) => {
                        // Check if we received a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        var responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});


// Activating the Service Worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
