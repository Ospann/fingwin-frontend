import { clientsClaim } from 'workbox-core'
import { precacheAndRoute } from 'workbox-precaching'

clientsClaim()
precacheAndRoute(self.__WB_MANIFEST)

self.addEventListener('push', (event) => {
    if (event.data) {
        try {
            const pushData = event.data.json()
            const notificationOptions = {
                body: pushData.body,
                icon: '/android-chrome-192x192.png',
                badge: '/badge.png',
                data: { url: pushData.url || '/' },
                vibrate: [200, 100, 200],
            }

            event.waitUntil(
                self.registration.showNotification(
                    pushData.title || 'Fingwin',
                    notificationOptions,
                ),
            )
        } catch (error) {
            console.error('Push notification error:', error)
        }
    }
})

self.addEventListener('notificationclick', (event) => {
    event.notification.close()
    const target = event.notification.data?.url || '/'
    event.waitUntil(self.clients.openWindow(target))
})
