import { t } from './units'

export function getAlerts(data, unit) {
  const { current, hourly, airQuality } = data
  const temps = hourly.map((h) => h.temp)
  const maxT = Math.max(...temps)
  const minT = Math.min(...temps)
  const maxPop = Math.max(...hourly.map((h) => h.pop))
  const out = []

  if (current.wind >= 40)
    out.push({ level: 'warn', text: `Strong wind: ${current.wind} km/h right now` })
  if (maxT >= 35)
    out.push({ level: 'danger', text: `Extreme heat expected: up to ${t(maxT, unit)}°${unit}` })
  if (minT <= 0)
    out.push({ level: 'warn', text: `Freezing temperatures: down to ${t(minT, unit)}°${unit}` })
  if (maxPop >= 70)
    out.push({ level: 'warn', text: `Heavy rain likely: ${maxPop}% chance in the next 24 hours` })
  if (airQuality.aqi >= 4)
    out.push({ level: 'danger', text: 'Poor air quality: limit time outdoors' })

  return out
}
