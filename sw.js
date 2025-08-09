const CACHE_NAME = 'cmo-portfolio-v2.0.0';
const STATIC_CACHE = 'static-v2.0.0';
const DYNAMIC_CACHE = 'dynamic-v2.0.0';
const API_CACHE = 'api-v2.0.0';

// Cache strategies
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
];

// API endpoints to cache
const apiEndpoints = [
  'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd',
  'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur'
];

// Install event - cache static resources
self.addEventListener('install', event => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => {
        console.log('Static cache opened');
        return cache.addAll(urlsToCache);
      }),
      caches.open(DYNAMIC_CACHE).then(cache => {
        console.log('Dynamic cache opened');
        return cache;
      }),
      caches.open(API_CACHE).then(cache => {
        console.log('API cache opened');
        return cache;
      })
    ]).then(() => {
      console.log('All caches initialized successfully');
      return self.skipWaiting();
    }).catch(error => {
      console.error('Cache installation failed:', error);
    })
  );
});

// Activate event - clean up old caches and take control
self.addEventListener('activate', event => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (![STATIC_CACHE, DYNAMIC_CACHE, API_CACHE].includes(cacheName)) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker activated and old caches cleaned');
      return self.clients.claim();
    })
  );
});

// Fetch event - implement advanced caching strategies
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Handle different types of requests
  if (url.origin === location.origin) {
    // Same-origin requests - use cache-first strategy
    event.respondWith(cacheFirst(request, STATIC_CACHE));
  } else if (url.pathname.startsWith('/api/') || apiEndpoints.includes(request.url)) {
    // API requests - use network-first with cache fallback
    event.respondWith(networkFirst(request, API_CACHE));
  } else if (request.destination === 'image') {
    // Images - use cache-first with network fallback
    event.respondWith(cacheFirst(request, DYNAMIC_CACHE));
  } else if (request.destination === 'font' || request.destination === 'style') {
    // Fonts and styles - use cache-first strategy
    event.respondWith(cacheFirst(request, STATIC_CACHE));
  } else {
    // Other requests - use network-first strategy
    event.respondWith(networkFirst(request, DYNAMIC_CACHE));
  }
});

// Cache-first strategy
async function cacheFirst(request, cacheName) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Network request failed:', error);
    
    // Return offline page for document requests
    if (request.destination === 'document') {
      return caches.match('/index.html');
    }
    
    // Return default offline content for other requests
    return new Response('Offline content not available', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

// Network-first strategy
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Network request failed, serving from cache:', error);
    
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline content
    return new Response('Offline content not available', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

// Background sync for offline actions
self.addEventListener('sync', event => {
  console.log('Background sync triggered:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  } else if (event.tag === 'contact-form-sync') {
    event.waitUntil(syncContactForm());
  }
});

// Background sync function
async function doBackgroundSync() {
  try {
    console.log('Background sync started');
    
    // Sync any pending data
    const pendingData = await getPendingData();
    
    for (const data of pendingData) {
      try {
        await syncData(data);
        await removePendingData(data.id);
        console.log('Data synced successfully:', data.id);
      } catch (error) {
        console.error('Failed to sync data:', data.id, error);
      }
    }
    
    console.log('Background sync completed');
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// Contact form sync
async function syncContactForm() {
  try {
    console.log('Contact form sync started');
    
    // Get pending contact form submissions
    const pendingForms = await getPendingContactForms();
    
    for (const formData of pendingForms) {
      try {
        // Simulate sending contact form
        await sendContactForm(formData);
        await removePendingContactForm(formData.id);
        console.log('Contact form synced:', formData.id);
      } catch (error) {
        console.error('Failed to sync contact form:', formData.id, error);
      }
    }
    
    console.log('Contact form sync completed');
  } catch (error) {
    console.error('Contact form sync failed:', error);
  }
}

// Helper functions for background sync
async function getPendingData() {
  // Implementation for getting pending data from IndexedDB
  return [];
}

async function syncData(data) {
  // Implementation for syncing data to server
  return new Promise(resolve => setTimeout(resolve, 1000));
}

async function removePendingData(id) {
  // Implementation for removing synced data
  return Promise.resolve();
}

async function getPendingContactForms() {
  // Implementation for getting pending contact forms
  return [];
}

async function sendContactForm(formData) {
  // Implementation for sending contact form
  return new Promise(resolve => setTimeout(resolve, 1000));
}

async function removePendingContactForm(id) {
  // Implementation for removing synced contact form
  return Promise.resolve();
}

// Push notifications with enhanced options
self.addEventListener('push', event => {
  console.log('Push notification received:', event);
  
  let notificationData = {
    title: 'CMO Portfolio',
    body: 'New update available!',
    icon: '/android-chrome-192x192.png',
    badge: '/favicon-32x32.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
      url: '/'
    },
    actions: [
      {
        action: 'explore',
        title: 'View Portfolio',
        icon: '/icon-project.png'
      },
      {
        action: 'projects',
        title: 'View Projects',
        icon: '/icon-project.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icon-close.png'
      }
    ],
    requireInteraction: true,
    tag: 'portfolio-update',
    renotify: true
  };
  
  // Parse push data if available
  if (event.data) {
    try {
      const data = event.data.json();
      notificationData = { ...notificationData, ...data };
    } catch (error) {
      console.log('Could not parse push data:', error);
    }
  }
  
  event.waitUntil(
    self.registration.showNotification(notificationData.title, notificationData)
  );
});

// Enhanced notification click handling
self.addEventListener('notificationclick', event => {
  console.log('Notification clicked:', event);
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  } else if (event.action === 'projects') {
    event.waitUntil(
      clients.openWindow('/#projects')
    );
  } else if (event.action === 'close') {
    // Just close the notification
    return;
  } else {
    // Default action - open portfolio
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Message handling for service worker communication
self.addEventListener('message', event => {
  console.log('Service Worker received message:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  } else if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  } else if (event.data && event.data.type === 'CLEAR_CACHE') {
    clearAllCaches().then(() => {
      event.ports[0].postMessage({ success: true });
    });
  }
});

// Clear all caches
async function clearAllCaches() {
  try {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map(cacheName => caches.delete(cacheName))
    );
    console.log('All caches cleared');
    return true;
  } catch (error) {
    console.error('Failed to clear caches:', error);
    return false;
  }
}

// Periodic cache cleanup
self.addEventListener('periodicsync', event => {
  if (event.tag === 'cache-cleanup') {
    event.waitUntil(cleanupOldCaches());
  }
});

// Cleanup old caches
async function cleanupOldCaches() {
  try {
    const cacheNames = await caches.keys();
    const currentCaches = [STATIC_CACHE, DYNAMIC_CACHE, API_CACHE];
    
    for (const cacheName of cacheNames) {
      if (!currentCaches.includes(cacheName)) {
        await caches.delete(cacheName);
        console.log('Cleaned up old cache:', cacheName);
      }
    }
    
    console.log('Cache cleanup completed');
  } catch (error) {
    console.error('Cache cleanup failed:', error);
  }
}

// Handle offline/online events
self.addEventListener('online', event => {
  console.log('Service Worker: Online');
  // Trigger background sync when coming back online
  self.registration.sync.register('background-sync');
});

self.addEventListener('offline', event => {
  console.log('Service Worker: Offline');
});

// Error handling
self.addEventListener('error', event => {
  console.error('Service Worker error:', event.error);
});

self.addEventListener('unhandledrejection', event => {
  console.error('Service Worker unhandled rejection:', event.reason);
});

console.log('Enhanced Service Worker loaded successfully! 🚀');
