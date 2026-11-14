export default function CurrentWeather({ place, current }) {
  return (
    <section className="card bg-gradient-to-br from-orange-400 to-orange-600 md:col-span-1">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold">
          {place.name}, {place.country}
        </span>
        <span className="opacity-80">Updated {current.updated}</span>
      </div>
      <img
        src={`https://openweathermap.org/img/wn/${current.icon}@2x.png`}
        alt={current.description}
        className="-ml-3 h-20 w-20"
      />
      <p className="text-5xl font-bold">{current.temp}°C</p>
      <p className="mt-1 capitalize opacity-90">{current.description}</p>
      <p className="mt-3 text-sm opacity-80">Feels like {current.feels}°C</p>
    </section>
  )
}
