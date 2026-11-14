import { t } from '../utils/units'
import WeatherIcon from './WeatherIcon'

export default function CurrentWeather({ place, current, unit }) {
  return (
    <section className="card bg-gradient-to-br from-orange-400 to-orange-600 md:col-span-1">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold">
          {place.name}, {place.country}
        </span>
        <span className="opacity-80">Updated {current.updated}</span>
      </div>
      <WeatherIcon code={current.icon} size={64} className="my-3" />
      <p className="text-5xl font-bold">
        {t(current.temp, unit)}°{unit}
      </p>
      <p className="mt-1 capitalize opacity-90">{current.description}</p>
      <p className="mt-3 text-sm opacity-80">
        Feels like {t(current.feels, unit)}°{unit}
      </p>
    </section>
  )
}
