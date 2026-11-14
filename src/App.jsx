import { useWeather } from './hooks/useWeather'
import SearchBar from './components/SearchBar'
import CurrentWeather from './components/CurrentWeather'
import StatTiles from './components/StatTiles'

export default function App() {
  const { place, selectPlace, data, loading, error } = useWeather()

  return (
    <main className="mx-auto max-w-6xl p-4 md:p-6">
      <SearchBar onSelect={selectPlace} />

      {error && <p className="card mb-4 text-red-300">{error}</p>}
      {loading && !error && <p className="card mb-4 opacity-70">Loading weather...</p>}

      {data && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <CurrentWeather place={place} current={data.current} />
          <section className="card md:col-span-3">5-Day Forecast (next)</section>

          <StatTiles current={data.current} />
          <section className="card md:col-span-3">Temperature Chart (next)</section>

          <section className="card md:col-span-2">Air Quality (next)</section>
          <section className="card">Sunrise / Sunset (next)</section>
          <section className="card">Chance of Rain (next)</section>
        </div>
      )}
    </main>
  )
}
