import { Star, X } from 'lucide-react'

export default function SavedCities({ place, saved, isSaved, onToggle, onSelect }) {
  const current = isSaved(place)
  return (
    <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
      <button
        onClick={() => onToggle(place)}
        className="card flex items-center gap-2 !px-3 !py-1.5"
        title={current ? 'Remove from saved' : 'Save this city'}
      >
        <Star size={14} className={current ? 'fill-orange-400 text-orange-400' : 'opacity-60'} />
        {current ? 'Saved' : `Save ${place.name}`}
      </button>
      {saved.map((c) => (
        <span key={`${c.lat},${c.lon}`} className="card flex items-center gap-2 !px-3 !py-1.5">
          <button onClick={() => onSelect(c)} className="hover:text-orange-300">
            {c.name}
          </button>
          <button onClick={() => onToggle(c)} title="Remove" className="opacity-50 hover:opacity-100">
            <X size={14} />
          </button>
        </span>
      ))}
    </div>
  )
}
