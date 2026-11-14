import { t } from '../utils/units'
import WeatherIcon from './WeatherIcon'

export default function Forecast({ daily, unit }) {
  return (
    <section className="card md:col-span-3">
      <h2 className="mb-3 text-sm opacity-60">5-Day Forecast</h2>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
        {daily.map((d, i) => (
          <div key={i} className="rounded-xl bg-white/5 p-3 text-center">
            <p className="text-sm opacity-70">{d.day}</p>
            <WeatherIcon code={d.icon.replace('n', 'd')} size={36} className="mx-auto my-2 text-orange-300" />
            <p className="text-sm font-semibold">{t(d.max, unit)}°</p>
            <p className="text-xs opacity-60">{t(d.min, unit)}°</p>
          </div>
        ))}
      </div>
    </section>
  )
}
