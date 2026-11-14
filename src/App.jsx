import { useWeather } from './hooks/useWeather'
import SearchBar from './components/SearchBar'
import CurrentWeather from './components/CurrentWeather'
import StatTiles from './components/StatTiles'
import Forecast from './components/Forecast'
import TempChart from './components/TempChart'
import AirQuality from './components/AirQuality'
import SunCard from './components/SunCard'
import RainChance from './components/RainChance'

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
          <Forecast daily={data.daily} />

          <StatTiles current={data.current} />
          <TempChart hourly={data.hourly} />

          <AirQuality air={data.airQuality} />
          <SunCard current={data.current} />
          <RainChance daily={data.daily} />
        </div>
      )}
    </main>
  )
}
