import { describe, expect, it } from 'vitest'
import {
  formatDate, formatHour, getIcon, getTheme, groupDaily, humidityLabel,
  isDaytime, msToKmh, pressureLabel, toDisplayTemp, windDirection,
} from './weather'

describe('icons and themes', () => {
  it('picks day and night icons', () => {
    expect(getIcon('Clear', true)).toBe('☀️')
    expect(getIcon('Clear', false)).toBe('🌙')
  })
  it('falls back for unknown conditions', () => {
    expect(getIcon('Unknown')).toBe('🌡️')
    expect(getTheme('Unknown')).toBe('clear')
  })
  it('maps drizzle to the rain theme', () => {
    expect(getTheme('Drizzle')).toBe('rain')
  })
})

describe('formatting', () => {
  it('formats a date using the city timezone offset', () => {
    // 2026-10-08 22:00 UTC is already 9 Oct in Karachi (UTC+5).
    const ts = Date.UTC(2026, 9, 8, 22, 0, 0) / 1000
    expect(formatDate(ts, 18000)).toBe('Friday, 9 Oct 2026')
  })
  it('formats hours in 12 hour style', () => {
    const at = (h) => Date.UTC(2026, 0, 1, h) / 1000
    expect(formatHour(at(0))).toBe('12am')
    expect(formatHour(at(9))).toBe('9am')
    expect(formatHour(at(12))).toBe('12pm')
    expect(formatHour(at(15))).toBe('3pm')
  })
  it('converts wind direction and speed', () => {
    expect(windDirection(0)).toBe('N')
    expect(windDirection(200)).toBe('S')
    expect(windDirection(350)).toBe('N')
    expect(msToKmh(10)).toBe(36)
  })
  it('converts temperature units', () => {
    expect(toDisplayTemp(30, 'C')).toBe(30)
    expect(toDisplayTemp(30, 'F')).toBe(86)
    expect(toDisplayTemp(-40, 'F')).toBe(-40)
  })
})

describe('labels and day detection', () => {
  it('labels humidity and pressure', () => {
    expect(humidityLabel(20)).toBe('Dry')
    expect(humidityLabel(55)).toBe('Comfortable')
    expect(humidityLabel(85)).toBe('Humid')
    expect(pressureLabel(990)).toBe('Low pressure')
    expect(pressureLabel(1013)).toBe('Normal')
  })
  it('detects daytime from sunrise and sunset', () => {
    const sys = { sunrise: 100, sunset: 200 }
    expect(isDaytime({ dt: 150, sys })).toBe(true)
    expect(isDaytime({ dt: 250, sys })).toBe(false)
  })
})

describe('groupDaily', () => {
  const entry = (hour, temp, main = 'Clear') => ({
    dt: Date.UTC(2026, 9, 8, hour) / 1000,
    main: { temp },
    weather: [{ main }],
  })
  it('groups entries per day and returns high and low', () => {
    const list = [entry(6, 20), entry(12, 30), entry(18, 25)]
    const [day] = groupDaily(list)
    expect(day).toMatchObject({ day: 'Thursday', high: 30, low: 20 })
  })
  it('limits the number of days', () => {
    const list = Array.from({ length: 10 }, (_, i) => ({
      dt: Date.UTC(2026, 9, 8 + i, 12) / 1000,
      main: { temp: 20 },
      weather: [{ main: 'Clear' }],
    }))
    expect(groupDaily(list, 0, 5)).toHaveLength(5)
  })
})
