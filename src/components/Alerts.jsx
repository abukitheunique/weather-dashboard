import { TriangleAlert } from 'lucide-react'

export default function Alerts({ alerts }) {
  if (!alerts.length) return null
  return (
    <div className="mb-4 space-y-2">
      {alerts.map((a, i) => (
        <div
          key={i}
          className={`card flex items-center gap-3 !py-3 text-sm ${
            a.level === 'danger' ? '!border-red-400/50 !bg-red-500/15' : '!border-orange-400/50 !bg-orange-500/15'
          }`}
        >
          <TriangleAlert size={18} />
          {a.text}
        </div>
      ))}
    </div>
  )
}
