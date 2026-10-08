import { useEffect, useState } from 'react'
import CityChips from './components/CityChips'
import CurrentCard from './components/CurrentCard'
import ForecastGrid from './components/ForecastGrid'
import HourlyRow from './components/HourlyRow'
import MetricsGrid from './components/MetricsGrid'
import SearchBar from './components/SearchBar'
import { DemoBanner, ErrorMessage, Loading } from './components/Status'
import UnitToggle from './components/UnitToggle'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useWeather } from './hooks/useWeather'
import { getTheme } from './utils/weather'

const DEFAULT_CITY = 'Karachi'
const POPULAR_CITIES = [
  { name: 'Karachi', flag: '🇵🇰' },
  { name: 'Lahore', flag: '🇵🇰' },
  { name: 'London', flag: '🇬🇧' },
  { name: 'Tokyo', flag: '🇯🇵' },
  { name: 'New York', flag: '🇺🇸' },
  { name: 'Dubai', flag: '🇦🇪' },
]

export default function App() {
  const [query, setQuery] = useState(DEFAULT_CITY)
  const [unit, setUnit] = useLocalStorage('weathernow:unit', 'C')
  const { status, data, error, isDemo, load } = useWeather(DEFAULT_CITY)

  const theme = data ? getTheme(data.current.weather[0].main) : 'clear'
  useEffect(() => {
    document.body.className = `theme-${theme}`
  }, [theme])

  const search = (city) => {
    setQuery(city)
    load(city)
  }

  return (
    <div className="app">
      <header className="search-section">
        <h1><span aria-hidden="true">☁️</span> WeatherNow</h1>
        <p>Real-time weather for any city in the world</p>
        <SearchBar value={query} onChange={setQuery} onSubmit={() => search(query)} />
        <CityChips cities={POPULAR_CITIES} onSelect={search} />
        <UnitToggle unit={unit} onChange={setUnit} />
      </header>

      <main aria-live="polite">
        {status === 'loading' && <Loading />}
        {status === 'error' && <ErrorMessage message={error} />}
        {status === 'success' && (
          <>
            {isDemo && <DemoBanner />}
            <CurrentCard current={data.current} unit={unit} />
            <ForecastGrid list={data.forecast.list} timezone={data.current.timezone} unit={unit} />
            <HourlyRow list={data.forecast.list} timezone={data.current.timezone} unit={unit} />
            <MetricsGrid current={data.current} />
          </>
        )}
      </main>
    </div>
  )
}
