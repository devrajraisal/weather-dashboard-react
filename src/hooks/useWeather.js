import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchWeather, hasApiKey } from '../api/weatherApi'
import { getDemoWeather } from '../data/demoData'

export function useWeather(initialCity) {
  const [state, setState] = useState({ status: 'loading', data: null, error: '' })
  const controllerRef = useRef(null)

  const run = useCallback(async (city) => {
    // Cancel any request still in flight so an older response cannot overwrite a newer one.
    controllerRef.current?.abort()
    const controller = new AbortController()
    controllerRef.current = controller

    try {
      const data = hasApiKey()
        ? await fetchWeather(city, { signal: controller.signal })
        : await Promise.resolve(getDemoWeather(city))
      if (controller.signal.aborted) return
      setState({ status: 'success', data, error: '' })
    } catch (err) {
      if (err.name === 'AbortError') return
      setState({ status: 'error', data: null, error: err.message })
    }
  }, [])

  // Called from user actions such as searching, so it can show the loading state right away.
  const load = useCallback(
    (city) => {
      const name = city.trim()
      if (!name) return
      setState((prev) => ({ ...prev, status: 'loading', error: '' }))
      run(name)
    },
    [run],
  )

  // Fetching on mount is a real side effect. run() only calls setState after an awaited
  // promise, never synchronously, so the lint warning here is a false positive.
  useEffect(() => {
    // oxlint-disable-next-line react/set-state-in-effect
    run(initialCity)
    return () => controllerRef.current?.abort()
  }, [initialCity, run])

  return { ...state, isDemo: !hasApiKey(), load }
}
