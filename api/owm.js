const ALLOWED = new Set([
  '/data/2.5/weather',
  '/data/2.5/forecast',
  '/data/2.5/air_pollution',
  '/geo/1.0/direct',
])

export default async function handler(req, res) {
  const { path, ...params } = req.query
  if (!ALLOWED.has(path)) return res.status(400).json({ error: 'Bad path' })

  const qs = new URLSearchParams({ ...params, appid: process.env.OWM_KEY })
  const r = await fetch(`https://api.openweathermap.org${path}?${qs}`)
  const data = await r.json()

  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=300')
  res.status(r.status).json(data)
}
