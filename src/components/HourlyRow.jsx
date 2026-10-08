import { formatHour, getIcon, toDisplayTemp } from '../utils/weather'

export default function HourlyRow({ list, timezone, unit }) {
  return (
    <section aria-labelledby="hourly-title">
      <h2 className="section-title" id="hourly-title">🕐 Hourly Forecast</h2>
      <div className="hourly-row">
        {list.slice(0, 8).map((h) => (
          <div className="hourly-card" key={h.dt}>
            <div className="hc-time">{formatHour(h.dt, timezone)}</div>
            <div className="hc-icon" aria-hidden="true">{getIcon(h.weather[0].main, true)}</div>
            <div className="hc-temp">{toDisplayTemp(h.main.temp, unit)}°</div>
          </div>
        ))}
      </div>
    </section>
  )
}
