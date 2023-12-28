self.addEventListener('install', event => {
    console.log('Service worker installing...');
    // Perform install steps, like pre-caching assets
});

self.addEventListener('activate', event => {
    console.log('Service worker activating...');
    // Perform activation steps, like clearing old caches
});

self.addEventListener('fetch', event => {
    console.log('Fetching:', event.request.url);
    // Implement caching strategy here
});
