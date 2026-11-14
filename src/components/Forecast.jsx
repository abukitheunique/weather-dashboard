import { t } from '../utils/units'

export default function Forecast({ daily, unit }) {
  return (
    <section className="card md:col-span-3">
      <h2 className="mb-3 text-sm opacity-60">5-Day Forecast</h2>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
        {daily.map((d, i) => (
          <div key={i} className="rounded-xl bg-white/5 p-3 text-center">
            <p className="text-sm opacity-70">{d.day}</p>
            <img
              src={`https://openweathermap.org/img/wn/${d.icon.replace('n', 'd')}.png`}
              alt=""
              className="mx-auto h-12 w-12"
            />
            <p className="text-sm font-semibold">{t(d.max, unit)}°</p>
            <p className="text-xs opacity-60">{t(d.min, unit)}°</p>
          </div>
        ))}
      </div>
    </section>
  )
}
