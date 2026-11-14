import { useState } from 'react'

const same = (a, b) => a.lat === b.lat && a.lon === b.lon

export function useSaved() {
  const [saved, setSaved] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('saved')) ?? []
    } catch {
      return []
    }
  })

  const update = (list) => {
    localStorage.setItem('saved', JSON.stringify(list))
    setSaved(list)
  }

  const isSaved = (p) => saved.some((s) => same(s, p))
  const toggle = (p) =>
    update(
      isSaved(p)
        ? saved.filter((s) => !same(s, p))
        : [...saved, { name: p.name, country: p.country, lat: p.lat, lon: p.lon }]
    )

  return { saved, isSaved, toggle }
}
