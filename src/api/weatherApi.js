const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export const hasApiKey = () => Boolean(import.meta.env.VITE_OPENWEATHER_API_KEY)

export async function fetchWeather(city, { signal } = {}) {
  const key = import.meta.env.VITE_OPENWEATHER_API_KEY
  const q = encodeURIComponent(city)
  const url = (path) => `${BASE_URL}/${path}?q=${q}&appid=${key}&units=metric`

  const [currentRes, forecastRes] = await Promise.all([
    fetch(url('weather'), { signal }),
    fetch(url('forecast'), { signal }),
  ])

  if (currentRes.status === 404) throw new Error('City not found. Try another name.')
  if (currentRes.status === 401) throw new Error('The API key was rejected. Check VITE_OPENWEATHER_API_KEY.')
  if (!currentRes.ok || !forecastRes.ok) throw new Error('Could not load weather data. Please try again.')

  return { current: await currentRes.json(), forecast: await forecastRes.json() }
}
