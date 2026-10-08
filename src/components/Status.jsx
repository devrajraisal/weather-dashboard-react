export function Loading() {
  return (
    <div className="loading">
      <div className="spinner" />
      <p>Fetching weather data...</p>
    </div>
  )
}

export function ErrorMessage({ message }) {
  return <div className="error" role="alert">❌ {message}</div>
}

export function DemoBanner() {
  return (
    <div className="demo-banner">
      ℹ️ <strong>Demo mode.</strong> Add your OpenWeatherMap key to a <code>.env</code> file to load live data.{' '}
      <a href="https://openweathermap.org/api" target="_blank" rel="noreferrer">Get a free key</a>
    </div>
  )
}
