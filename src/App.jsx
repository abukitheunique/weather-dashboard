export default function App() {
  return (
    <main className="mx-auto max-w-6xl p-4 md:p-6">
      <input
        placeholder="Search city..."
        className="card mb-4 w-full outline-none"
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <section className="card md:col-span-1 bg-gradient-to-br from-orange-400 to-orange-600">
          Current Weather
        </section>

        <section className="card md:col-span-3">5-Day Forecast</section>

        <section className="card md:col-span-1">
          <div className="grid grid-cols-2 gap-3">
            {['Humidity', 'Wind', 'Visibility', 'Pressure', 'Feels Like', 'Clouds'].map(
              (label) => (
                <div key={label} className="rounded-xl bg-white/5 p-3 text-sm">
                  {label}
                </div>
              )
            )}
          </div>
        </section>

        <section className="card md:col-span-3">Temperature Chart</section>

        <section className="card md:col-span-2">Air Quality</section>
        <section className="card">Sunrise / Sunset</section>
        <section className="card">Chance of Rain</section>
      </div>
    </main>
  )
}
