import { useState } from 'react'

export function useUnit() {
  const [unit, setUnit] = useState(() => localStorage.getItem('unit') || 'C')
  const toggle = () =>
    setUnit((u) => {
      const next = u === 'C' ? 'F' : 'C'
      localStorage.setItem('unit', next)
      return next
    })
  return [unit, toggle]
}
