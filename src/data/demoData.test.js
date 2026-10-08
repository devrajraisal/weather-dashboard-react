import { describe, expect, it } from 'vitest'
import { getDemoWeather } from './demoData'
import { groupDaily } from '../utils/weather'

const NOW = Date.UTC(2026, 9, 8, 12, 0, 0)

describe('getDemoWeather', () => {
  it('matches city names without caring about case', () => {
    expect(getDemoWeather('karachi', NOW).current.name).toBe('Karachi')
    expect(getDemoWeather('  LONDON ', NOW).current.sys.country).toBe('GB')
  })
  it('falls back for unknown cities and keeps the typed name', () => {
    const { current } = getDemoWeather('Gilgit', NOW)
    expect(current.name).toBe('Gilgit')
    expect(current.sys.country).toBe('--')
  })
  it('is deterministic for the same moment', () => {
    expect(getDemoWeather('Tokyo', NOW)).toEqual(getDemoWeather('Tokyo', NOW))
  })
  it('returns 40 forecast entries that group into five days', () => {
    const { current, forecast } = getDemoWeather('Dubai', NOW)
    expect(forecast.list).toHaveLength(40)
    expect(groupDaily(forecast.list, current.timezone).length).toBeGreaterThanOrEqual(5)
  })
  it('puts sunrise before sunset', () => {
    const { sys } = getDemoWeather('New York', NOW).current
    expect(sys.sunrise).toBeLessThan(sys.sunset)
  })
})
