// Service Worker for Preet English PWA - Enhanced Security & Performance
const CACHE_VERSION = 'v2.0.0';
const CACHE_NAME = `preet-english-${CACHE_VERSION}`;
const MAX_CACHE_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days
const IMMEDIATE_CACHE_AGE = 24 * 60 * 60 * 1000; // 1 day for dynamic content

// Essential files to cache immediately
const ESSENTIAL_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/sw-register.js',
  '/privacy-policy.html',
  '/icon-192.png',
  '/icon-512.png',
  '/favicon.png'
];

// Install event - cache essential files with integrity check
self.addEventListener('install', (event) => {
  console.log(`SW v${CACHE_VERSION} installing...`);
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching essential files...');
        return cache.addAll(ESSENTIAL_CACHE);
      })
      .then(() => {
        console.log(`SW v${CACHE_VERSION} installed successfully`);
        // Don't use skipWaiting() for graceful updates
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('SW installation failed:', error);
      })
  );
});

// Enhanced fetch event with security and performance optimizations
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests and external requests
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        
        // Check if cached response is still fresh
        if (cachedResponse) {
          const cachedTime = cachedResponse.headers.get('sw-cache-time');
          const maxAge = event.request.url.includes('/api/') ? IMMEDIATE_CACHE_AGE : MAX_CACHE_AGE;
          
          if (cachedTime && (Date.now() - parseInt(cachedTime)) < maxAge) {
            console.log('Serving from cache:', event.request.url);
            return cachedResponse;
          }
        }

        // Fetch fresh content with timeout and error handling
        return fetchWithTimeout(event.request, 10000)
          .then((networkResponse) => {
            // Validate response before caching
            if (!networkResponse || 
                networkResponse.status !== 200 || 
                networkResponse.type !== 'basic' ||
                networkResponse.headers.get('content-type')?.includes('text/html') === false && 
                event.request.url.includes('/api/')) {
              return networkResponse;
            }

            // Clone and enhance response for caching
            const responseToCache = networkResponse.clone();
            const enhancedResponse = new Response(responseToCache.body, {
              status: responseToCache.status,
              statusText: responseToCache.statusText,
              headers: new Headers({
                ...Object.fromEntries(responseToCache.headers.entries()),
                'sw-cache-time': Date.now().toString(),
                'sw-cache-version': CACHE_VERSION
              })
            });

            // Cache the enhanced response
            cache.put(event.request, enhancedResponse);
            console.log('Cached fresh content:', event.request.url);
            
            return networkResponse;
          })
          .catch((error) => {
            console.warn('Network fetch failed:', event.request.url, error);
            
            // Return stale cache if available, otherwise show offline page
            if (cachedResponse) {
              console.log('Serving stale cache due to network error:', event.request.url);
              return cachedResponse;
            }
            
            // Return offline fallback for navigation requests
            if (event.request.mode === 'navigate') {
              return cache.match('/') || new Response('Offline - Please check your connection', {
                status: 503,
                statusText: 'Service Unavailable'
              });
            }
            
            throw error;
          });
      });
    })
  );
});

// Fetch with timeout utility
function fetchWithTimeout(request, timeout = 10000) {
  return Promise.race([
    fetch(request),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Fetch timeout')), timeout)
    )
  ]);
}

// Enhanced activate event - clean up old caches and claim clients
self.addEventListener('activate', (event) => {
  console.log(`SW v${CACHE_VERSION} activating...`);
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName.startsWith('preet-english-')) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      
      // Claim all clients immediately
      self.clients.claim()
    ]).then(() => {
      console.log(`SW v${CACHE_VERSION} activated successfully`);
      
      // Notify all clients about the update
      return self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.postMessage({
            type: 'SW_UPDATED',
            version: CACHE_VERSION
          });
        });
      });
    })
  );
});

// Background sync for offline actions (enhanced)
self.addEventListener('sync', (event) => {
  console.log('Background sync triggered:', event.tag);
  
  switch (event.tag) {
    case 'sync-progress':
      event.waitUntil(syncProgress());
      break;
    case 'sync-lessons':
      event.waitUntil(syncLessons());
      break;
    default:
      console.log('Unknown sync tag:', event.tag);
  }
});

async function syncProgress() {
  try {
    console.log('Syncing user progress...');
    // Implementation for syncing progress when back online
    const progressData = await getStoredProgress();
    if (progressData) {
      await uploadProgress(progressData);
      console.log('Progress synced successfully');
    }
  } catch (error) {
    console.error('Progress sync failed:', error);
  }
}

async function syncLessons() {
  try {
    console.log('Syncing lesson data...');
    // Implementation for syncing lesson completions
  } catch (error) {
    console.error('Lesson sync failed:', error);
  }
}

// Enhanced push notifications with security
self.addEventListener('push', (event) => {
  if (!event.data) {
    console.warn('Push event without data');
    return;
  }

  try {
    const data = event.data.json();
    
    // Validate notification data
    if (!data.title || !data.body) {
      console.warn('Invalid notification data');
      return;
    }

    const options = {
      body: data.body,
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      vibrate: [200, 100, 200],
      tag: data.tag || 'preet-english-notification',
      requireInteraction: data.requireInteraction || false,
      data: {
        url: data.url || '/',
        timestamp: Date.now()
      },
      actions: data.actions || []
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  } catch (error) {
    console.error('Push notification error:', error);
  }
});

// Enhanced notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event.notification.tag);
  
  event.notification.close();

  const urlToOpen = event.notification.data?.url || '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Check if app is already open
        for (const client of clientList) {
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }
        
        // Open new window if app is not open
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
      .catch((error) => {
        console.error('Notification click handling failed:', error);
      })
  );
});

// Message handling for communication with main app
self.addEventListener('message', (event) => {
  console.log('SW received message:', event.data);
  
  switch (event.data?.type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
    case 'GET_VERSION':
      event.ports[0]?.postMessage({ version: CACHE_VERSION });
      break;
    case 'CLEAR_CACHE':
      event.waitUntil(clearAllCaches());
      break;
    default:
      console.log('Unknown message type:', event.data?.type);
  }
});

async function clearAllCaches() {
  try {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map(cacheName => caches.delete(cacheName))
    );
    console.log('All caches cleared');
  } catch (error) {
    console.error('Cache clearing failed:', error);
  }
}

// Utility functions for offline storage
async function getStoredProgress() {
  // Implementation to get stored progress from IndexedDB
  return null;
}

async function uploadProgress(progressData) {
  // Implementation to upload progress to server
  return fetch('/api/progress', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(progressData)
  });
}
