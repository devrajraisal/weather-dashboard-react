import { formatHour, humidityLabel, msToKmh, pressureLabel, windDirection } from '../utils/weather'

function Metric({ title, value, unit, label, percent, color }) {
  return (
    <div className="metric-card">
      <div className="metric-title">{title}</div>
      <div className="metric-value">{value}<span className="metric-unit"> {unit}</span></div>
      <div className="metric-label">{label}</div>
      {percent !== undefined && (
        <div className="metric-bar">
          <div className="metric-fill" style={{ width: `${Math.min(percent, 100)}%`, background: color }} />
        </div>
      )}
    </div>
  )
}

export default function MetricsGrid({ current }) {
  const { wind, main, sys, timezone } = current
  const windKmh = msToKmh(wind.speed)
  return (
    <div className="metrics-grid">
      <Metric title="💨 Wind" value={windKmh} unit="km/h" label={`Direction: ${windDirection(wind.deg)}`} percent={windKmh} color="#38bdf8" />
      <Metric title="💧 Humidity" value={main.humidity} unit="%" label={humidityLabel(main.humidity)} percent={main.humidity} color="#818cf8" />
      <Metric title="🌡️ Pressure" value={main.pressure} unit="hPa" label={pressureLabel(main.pressure)} percent={(main.pressure / 1050) * 100} color="#fb923c" />
      <Metric title="🌅 Sunrise / Sunset" value={`${formatHour(sys.sunrise, timezone)} / ${formatHour(sys.sunset, timezone)}`} unit="" label="Local time" />
    </div>
  )
}
