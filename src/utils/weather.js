const ICONS = {
  Clear: ['☀️', '🌙'],
  Clouds: ['⛅', '🌥️'],
  Rain: ['🌧️', '🌧️'],
  Drizzle: ['🌦️', '🌦️'],
  Thunderstorm: ['⛈️', '⛈️'],
  Snow: ['❄️', '🌨️'],
  Mist: ['🌫️', '🌫️'],
  Fog: ['🌫️', '🌫️'],
  Haze: ['🌫️', '🌫️'],
  Smoke: ['🌫️', '🌫️'],
  Dust: ['💨', '💨'],
  Tornado: ['🌪️', '🌪️'],
}

const THEMES = {
  Clear: 'clear',
  Clouds: 'cloudy',
  Rain: 'rain',
  Drizzle: 'rain',
  Snow: 'snow',
  Thunderstorm: 'thunder',
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const COMPASS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']

export function getIcon(main, isDay = true) {
  return (ICONS[main] ?? ['🌡️', '🌡️'])[isDay ? 0 : 1]
}

export function getTheme(main) {
  return THEMES[main] ?? 'clear'
}

// OpenWeatherMap gives UTC timestamps plus a timezone offset in seconds.
// Shifting by the offset and reading the UTC fields gives the city's local time.
export function formatDate(ts, tz = 0) {
  const d = new Date((ts + tz) * 1000)
  return `${DAYS[d.getUTCDay()]}, ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`
}

export function formatHour(ts, tz = 0) {
  const h = new Date((ts + tz) * 1000).getUTCHours()
  if (h === 0) return '12am'
  if (h < 12) return `${h}am`
  if (h === 12) return '12pm'
  return `${h - 12}pm`
}

export function windDirection(deg) {
  return COMPASS[Math.round(deg / 45) % 8]
}

export function msToKmh(ms) {
  return Math.round(ms * 3.6)
}

export function toDisplayTemp(celsius, unit = 'C') {
  return Math.round(unit === 'F' ? (celsius * 9) / 5 + 32 : celsius)
}

export function isDaytime(current) {
  return current.dt > current.sys.sunrise && current.dt < current.sys.sunset
}

export function groupDaily(list, tz = 0, maxDays = 5) {
  const days = new Map()
  for (const item of list) {
    const d = new Date((item.dt + tz) * 1000)
    const key = `${d.getUTCFullYear()}-${d.getUTCMonth()}-${d.getUTCDate()}`
    if (!days.has(key)) {
      days.set(key, { day: DAYS[d.getUTCDay()], main: item.weather[0].main, temps: [] })
    }
    days.get(key).temps.push(item.main.temp)
  }
  return [...days.values()].slice(0, maxDays).map(({ day, main, temps }) => ({
    day,
    main,
    high: Math.max(...temps),
    low: Math.min(...temps),
  }))
}

export function humidityLabel(humidity) {
  if (humidity < 40) return 'Dry'
  if (humidity < 70) return 'Comfortable'
  return 'Humid'
}

export function pressureLabel(pressure) {
  return pressure < 1000 ? 'Low pressure' : 'Normal'
}
