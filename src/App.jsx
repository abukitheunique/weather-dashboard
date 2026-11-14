import { useEffect } from 'react'
import { WifiOff } from 'lucide-react'
import { useWeather } from './hooks/useWeather'
import { useUnit } from './hooks/useUnit'
import { useSaved } from './hooks/useSaved'
import { useOnline } from './hooks/useOnline'
import { getAlerts } from './utils/alerts'
import { bgFor } from './utils/theme'
import SearchBar from './components/SearchBar'
import SavedCities from './components/SavedCities'
import Alerts from './components/Alerts'
import CurrentWeather from './components/CurrentWeather'
import StatTiles from './components/StatTiles'
import Forecast from './components/Forecast'
import TempChart from './components/TempChart'
import AirQuality from './components/AirQuality'
import SunCard from './components/SunCard'
import RainChance from './components/RainChance'

export default function App() {
  const { place, selectPlace, data, loading, error } = useWeather()
  const [unit, toggleUnit] = useUnit()
  const { saved, isSaved, toggle } = useSaved()
  const online = useOnline()
  const icon = data?.current.icon

  useEffect(() => {
    document.body.style.background = bgFor(icon)
  }, [icon])

  return (
    <main className="mx-auto max-w-6xl p-4 md:p-6">
      <div className="mb-4 flex items-start gap-3">
        <SearchBar onSelect={selectPlace} />
        <button onClick={toggleUnit} className="card !py-3 font-semibold" title="Switch unit">
          <span className={unit === 'C' ? 'text-orange-400' : 'opacity-50'}>°C</span>
          <span className="opacity-30"> | </span>
          <span className={unit === 'F' ? 'text-orange-400' : 'opacity-50'}>°F</span>
        </button>
      </div>

      <SavedCities place={place} saved={saved} isSaved={isSaved} onToggle={toggle} onSelect={selectPlace} />

      {!online && (
        <div className="card mb-4 flex items-center gap-3 !py-3 text-sm text-orange-300">
          <WifiOff size={18} /> You are offline. Showing the last saved data.
        </div>
      )}

      {error && <p className="card mb-4 text-red-300">{error}</p>}
      {loading && !error && <p className="card mb-4 opacity-70">Loading weather...</p>}

      {data && (
        <>
          <Alerts alerts={getAlerts(data, unit)} />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <CurrentWeather place={place} current={data.current} unit={unit} />
            <Forecast daily={data.daily} unit={unit} />

            <StatTiles current={data.current} unit={unit} />
            <TempChart hourly={data.hourly} unit={unit} />

            <AirQuality air={data.airQuality} />
            <SunCard current={data.current} />
            <RainChance daily={data.daily} />
          </div>
        </>
      )}
    </main>
  )
}
