import { useState } from 'react'
import { Search } from 'lucide-react'
import { searchCity } from '../services/weather'

export default function SearchBar({ onSelect }) {
  const [q, setQ] = useState('')
  const [results, setResults] = useState([])
  const [msg, setMsg] = useState('')

  async function submit(e) {
    e.preventDefault()
    if (!q.trim()) return
    try {
      const r = await searchCity(q.trim())
      setResults(r)
      setMsg(r.length ? '' : 'No city found')
    } catch (err) {
      setMsg(err.message)
    }
  }

  function pick(c) {
    onSelect(c)
    setResults([])
    setQ('')
    setMsg('')
  }

  return (
    <form onSubmit={submit} className="relative mb-4">
      <div className="card flex items-center gap-3 !py-3">
        <Search size={18} className="opacity-60" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search city and press Enter..."
          className="w-full bg-transparent outline-none"
        />
      </div>
      {msg && <p className="mt-2 text-sm text-red-300">{msg}</p>}
      {results.length > 0 && (
        <ul className="absolute z-10 mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-[#141926]">
          {results.map((c) => (
            <li key={`${c.lat},${c.lon}`}>
              <button
                type="button"
                onClick={() => pick(c)}
                className="w-full px-4 py-2 text-left hover:bg-white/10"
              >
                {c.name}
                {c.state ? `, ${c.state}` : ''}, {c.country}
              </button>
            </li>
          ))}
        </ul>
      )}
    </form>
  )
}
