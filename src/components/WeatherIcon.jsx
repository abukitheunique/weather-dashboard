import { Sun, Moon, CloudSun, CloudMoon, Cloud, CloudDrizzle, CloudRain, CloudLightning, CloudSnow, CloudFog } from 'lucide-react'

export default function WeatherIcon({ code, size = 48, className = '' }) {
  const night = code.endsWith('n')
  const map = {
    '01': night ? Moon : Sun,
    '02': night ? CloudMoon : CloudSun,
    '03': Cloud,
    '04': Cloud,
    '09': CloudDrizzle,
    '10': CloudRain,
    '11': CloudLightning,
    '13': CloudSnow,
    '50': CloudFog,
  }
  const Icon = map[code.slice(0, 2)] || Cloud
  return <Icon size={size} className={className} />
}
