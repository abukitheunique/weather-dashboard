const LEVELS = [
  { label: 'Good', color: '#4ade80' },
  { label: 'Fair', color: '#a3e635' },
  { label: 'Moderate', color: '#facc15' },
  { label: 'Poor', color: '#fb923c' },
  { label: 'Very Poor', color: '#f87171' },
]

export default function AirQuality({ air }) {
  const level = LEVELS[air.aqi - 1]
  const items = [
    ['PM2.5', air.pm25], ['PM10', air.pm10], ['NO2', air.no2],
    ['O3', air.o3], ['SO2', air.so2], ['CO', air.co],
  ]
  return (
    <section className="card md:col-span-2">
      <h2 className="mb-3 text-sm opacity-60">Air Quality Overview</h2>
      <div className="flex items-center gap-6">
        <div
          className="flex h-28 w-28 shrink-0 flex-col items-center justify-center rounded-full border-8"
          style={{ borderColor: level.color }}
        >
          <span className="text-2xl font-bold">{air.aqi}/5</span>
          <span className="text-xs">{level.label}</span>
        </div>
        <div className="grid flex-1 grid-cols-3 gap-2">
          {items.map(([name, v]) => (
            <div key={name} className="rounded-lg bg-white/5 p-2 text-center">
              <p className="font-semibold">{v}</p>
              <p className="text-xs opacity-60">{name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
