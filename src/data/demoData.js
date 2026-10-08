// Demo mode returns data in the same shape as the OpenWeatherMap API,
// so every component renders the same way with or without an API key.
const CITIES = {
  Karachi: { temp: 33, feelsLike: 37, humidity: 72, windKmh: 18, visibilityKm: 8, pressure: 1008, main: 'Clear', description: 'clear sky', country: 'PK', tz: 18000, windDeg: 200 },
  Lahore: { temp: 31, feelsLike: 34, humidity: 55, windKmh: 10, visibilityKm: 6, pressure: 1010, main: 'Clouds', description: 'scattered clouds', country: 'PK', tz: 18000, windDeg: 310 },
  London: { temp: 14, feelsLike: 12, humidity: 80, windKmh: 25, visibilityKm: 10, pressure: 1012, main: 'Clouds', description: 'overcast clouds', country: 'GB', tz: 3600, windDeg: 270 },
  Tokyo: { temp: 22, feelsLike: 21, humidity: 65, windKmh: 12, visibilityKm: 10, pressure: 1018, main: 'Clear', description: 'clear sky', country: 'JP', tz: 32400, windDeg: 90 },
  'New York': { temp: 17, feelsLike: 15, humidity: 58, windKmh: 20, visibilityKm: 10, pressure: 1016, main: 'Rain', description: 'light rain', country: 'US', tz: -14400, windDeg: 330 },
  Dubai: { temp: 38, feelsLike: 42, humidity: 50, windKmh: 15, visibilityKm: 9, pressure: 1005, main: 'Clear', description: 'sunny', country: 'AE', tz: 14400, windDeg: 180 },
}

const FALLBACK = { temp: 24, feelsLike: 23, humidity: 60, windKmh: 14, visibilityKm: 10, pressure: 1013, main: 'Clear', description: 'clear sky', country: '--', tz: 0, windDeg: 90 }

export function getDemoWeather(city, nowMs = Date.now()) {
  const requested = city.trim()
  const known = Object.keys(CITIES).find((name) => name.toLowerCase() === requested.toLowerCase())
  const base = known ? CITIES[known] : FALLBACK
  const dt = Math.floor(nowMs / 1000)
  const dayStart = Math.floor((dt + base.tz) / 86400) * 86400 - base.tz

  const current = {
    name: known ?? requested,
    dt,
    timezone: base.tz,
    sys: { country: base.country, sunrise: dayStart + 6 * 3600, sunset: dayStart + 18 * 3600 },
    weather: [{ main: base.main, description: base.description }],
    main: { temp: base.temp, feels_like: base.feelsLike, humidity: base.humidity, pressure: base.pressure },
    wind: { speed: base.windKmh / 3.6, deg: base.windDeg },
    visibility: base.visibilityKm * 1000,
  }

  // 40 entries, one every 3 hours, like the real 5-day forecast endpoint.
  const list = Array.from({ length: 40 }, (_, i) => {
    const t = dt + i * 3 * 3600
    const localHour = ((t + base.tz) % 86400) / 3600
    const dayIndex = Math.floor((t - dt) / 86400)
    const dailySwing = 4 * Math.sin(((localHour - 9) / 24) * 2 * Math.PI)
    const dayShift = ((dayIndex * 7) % 5) - 2
    return {
      dt: t,
      main: { temp: base.temp + dailySwing + dayShift },
      weather: [{ main: dayIndex % 3 === 2 ? 'Clouds' : base.main }],
    }
  })

  return { current, forecast: { list } }
}
