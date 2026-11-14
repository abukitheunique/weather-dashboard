import { useEffect, useState } from 'react'
import { getWeather } from '../services/weather'

const DEFAULT_PLACE = { name: 'Addis Ababa', country: 'ET', lat: 9.0249, lon: 38.7469 }

function loadPlace() {
  try {
    return JSON.parse(localStorage.getItem('place')) ?? DEFAULT_PLACE
  } catch {
    return DEFAULT_PLACE
  }
}

export function useWeather() {
  const [place, setPlace] = useState(loadPlace)
  const [state, setState] = useState({ key: null, data: null, error: null })
  const key = `${place.lat},${place.lon}`

  useEffect(() => {
    let cancelled = false
    getWeather(place.lat, place.lon)
      .then((data) => !cancelled && setState({ key, data, error: null }))
      .catch((e) => !cancelled && setState({ key, data: null, error: e.message }))
    return () => {
      cancelled = true
    }
  }, [key, place.lat, place.lon])

  const selectPlace = (p) => {
    localStorage.setItem('place', JSON.stringify(p))
    setPlace(p)
  }

  return {
    place,
    selectPlace,
    data: state.data,
    error: state.key === key ? state.error : null,
    loading: state.key !== key,
  }
}
