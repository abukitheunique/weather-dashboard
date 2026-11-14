import { Droplets, Wind, Eye, Gauge, Thermometer, Cloud } from 'lucide-react'

export default function StatTiles({ current }) {
  const tiles = [
    { label: 'Humidity', value: `${current.humidity} %`, Icon: Droplets },
    { label: 'Wind Speed', value: `${current.wind} km/h`, Icon: Wind },
    { label: 'Visibility', value: `${current.visibility} km`, Icon: Eye },
    { label: 'Pressure', value: `${current.pressure} hPa`, Icon: Gauge },
    { label: 'Feels Like', value: `${current.feels}°C`, Icon: Thermometer },
    { label: 'Clouds', value: `${current.clouds} %`, Icon: Cloud },
  ]
  return (
    <section className="card md:col-span-1">
      <div className="grid grid-cols-2 gap-3">
        {tiles.map(({ label, value, Icon }) => (
          <div key={label} className="rounded-xl bg-white/5 p-3">
            <div className="flex items-center gap-1 text-xs opacity-60">
              <Icon size={12} /> {label}
            </div>
            <p className="mt-1 font-semibold">{value}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
