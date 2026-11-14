const CACHE = 'weather-v3'
const SHELL = ['/manifest.webmanifest', '/icon-192.png', '/icon-512.png']

self.addEventListener('install', (e) => {
  e.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE)
      const res = await fetch('/', { cache: 'reload' })
      const html = await res.clone().text()
      const assets = [...html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)].map((m) => m[1])
      await cache.put('/', res)
      await cache.addAll([...SHELL, ...assets])
    })()
  )
  self.skipWaiting()
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  )
  self.clients.claim()
})

async function networkFirst(req, key) {
  const cache = await caches.open(CACHE)
  try {
    const res = await fetch(req)
    if (res.ok) cache.put(key || req, res.clone())
    return res
  } catch {
    const hit = await cache.match(key || req)
    if (hit) return hit
    return Response.error()
  }
}

self.addEventListener('fetch', (e) => {
  const req = e.request
  const url = new URL(req.url)
  if (req.method !== 'GET') return

  // weather icons from OpenWeather
  if (url.hostname === 'openweathermap.org' && url.pathname.startsWith('/img/')) {
    return e.respondWith(
      caches.open(CACHE).then(async (cache) => {
        const hit = await cache.match(req)
        const net = fetch(req)
          .then((res) => {
            cache.put(req, res.clone())
            return res
          })
          .catch(() => hit || Response.error())
        return hit || net
      })
    )
  }

  if (url.origin !== self.location.origin) return

  if (url.pathname.startsWith('/api/')) return e.respondWith(networkFirst(req))
  if (req.mode === 'navigate') return e.respondWith(networkFirst(req, '/'))

  e.respondWith(
    caches.match(req).then(
      (hit) =>
        hit ||
        fetch(req).then((res) => {
          if (res.ok) {
            const copy = res.clone()
            caches.open(CACHE).then((c) => c.put(req, copy))
          }
          return res
        })
    )
  )
})

