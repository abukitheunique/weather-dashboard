const call = async (path, params) => {
  const qs = new URLSearchParams({ path, ...params })
  const res = await fetch(`/api/owm?${qs}`)
  if (res.status === 401) throw new Error('API key invalid or not active yet (can take up to 2 hours)')
  if (!res.ok) throw new Error('Weather request failed')
  return res.json()
}

const clock = (ts, tz) => new Date((ts + tz) * 1000).toISOString().slice(11, 16)

export async function searchCity(q) {
  const list = await call('/geo/1.0/direct', { q, limit: 5 })
  return list.map((c) => ({
    name: c.name,
    state: c.state,
    country: c.country,
    lat: c.lat,
    lon: c.lon,
  }))
}

export async function getWeather(lat, lon) {
  const base = { lat, lon, units: 'metric' }
  const [cur, fc, air] = await Promise.all([
    call('/data/2.5/weather', base),
    call('/data/2.5/forecast', base),
    call('/data/2.5/air_pollution', { lat, lon }),
  ])
  const tz = cur.timezone

  const current = {
    temp: Math.round(cur.main.temp),
    feels: Math.round(cur.main.feels_like),
    description: cur.weather[0].description,
    icon: cur.weather[0].icon,
    humidity: cur.main.humidity,
    pressure: cur.main.pressure,
    wind: Math.round(cur.wind.speed * 3.6),
    visibility: +(cur.visibility / 1000).toFixed(1),
    clouds: cur.clouds.all,
    sunrise: clock(cur.sys.sunrise, tz),
    sunset: clock(cur.sys.sunset, tz),
    updated: clock(cur.dt, tz),
  }

  const hourly = fc.list.slice(0, 8).map((i) => ({
    time: clock(i.dt, tz),
    temp: Math.round(i.main.temp),
    pop: Math.round(i.pop * 100),
  }))

  const groups = {}
  fc.list.forEach((i) => {
    const key = new Date((i.dt + tz) * 1000).toISOString().slice(0, 10)
    ;(groups[key] ||= []).push(i)
  })
  const daily = Object.entries(groups).map(([key, items]) => ({
    day: new Date(key + 'T00:00:00Z').toLocaleDateString('en', { weekday: 'short', timeZone: 'UTC' }),
    min: Math.round(Math.min(...items.map((i) => i.main.temp_min))),
    max: Math.round(Math.max(...items.map((i) => i.main.temp_max))),
    icon: items[Math.floor(items.length / 2)].weather[0].icon,
    pop: Math.round(Math.max(...items.map((i) => i.pop)) * 100),
  }))

  const a = air.list[0]
  const airQuality = {
    aqi: a.main.aqi,
    pm25: Math.round(a.components.pm2_5),
    pm10: Math.round(a.components.pm10),
    no2: Math.round(a.components.no2),
    o3: Math.round(a.components.o3),
    so2: Math.round(a.components.so2),
    co: Math.round(a.components.co),
  }

  return { current, hourly, daily, airQuality }
}
