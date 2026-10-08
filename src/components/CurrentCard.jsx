import { formatDate, getIcon, isDaytime, msToKmh, toDisplayTemp } from '../utils/weather'

function Detail({ label, value }) {
  return (
    <div className="detail-item">
      <div className="detail-label">{label}</div>
      <div className="detail-value">{value}</div>
    </div>
  )
}

export default function CurrentCard({ current, unit }) {
  const { name, sys, dt, timezone, weather, main, wind, visibility } = current
  return (
    <section className="current-card" aria-label={`Current weather in ${name}`}>
      <div>
        <div className="city-name">📍 {name}, {sys.country}</div>
        <div className="current-date">{formatDate(dt, timezone)}</div>
        <div className="weather-icon" aria-hidden="true">{getIcon(weather[0].main, isDaytime(current))}</div>
        <div className="temp-big">{toDisplayTemp(main.temp, unit)}<sup>°{unit}</sup></div>
        <div className="condition">{weather[0].description}</div>
      </div>
      <div className="current-details">
        <Detail label="Feels Like" value={`${toDisplayTemp(main.feels_like, unit)}°`} />
        <Detail label="Humidity" value={`${main.humidity}%`} />
        <Detail label="Wind" value={`${msToKmh(wind.speed)} km/h`} />
        <Detail label="Visibility" value={`${(visibility / 1000).toFixed(1)} km`} />
      </div>
    </section>
  )
}
