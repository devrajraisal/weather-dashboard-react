import { getIcon, groupDaily, toDisplayTemp } from '../utils/weather'

export default function ForecastGrid({ list, timezone, unit }) {
  const days = groupDaily(list, timezone)
  return (
    <section aria-labelledby="forecast-title">
      <h2 className="section-title" id="forecast-title">📅 5-Day Forecast</h2>
      <div className="forecast-grid">
        {days.map((d) => (
          <div className="forecast-card" key={d.day + d.high}>
            <div className="fc-day">{d.day.slice(0, 3)}</div>
            <div className="fc-icon" aria-hidden="true">{getIcon(d.main, true)}</div>
            <div className="fc-high">{toDisplayTemp(d.high, unit)}°</div>
            <div className="fc-low">{toDisplayTemp(d.low, unit)}°</div>
          </div>
        ))}
      </div>
    </section>
  )
}
